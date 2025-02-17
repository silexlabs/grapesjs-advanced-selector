import { Component, CssRule, Editor } from 'grapesjs'
import { html, render } from 'lit'
import { editStyle, getComponentSelector, getSelectors, renameSelector, setComponentSelector } from './model/GrapesJs'
import { ComplexSelector, EMPTY_SELECTOR, same, toString } from './model/ComplexSelector'
import { IdSelector, SimpleSelectorType, TAGS } from './model/SimpleSelector'

////////////////
// Types
export type AdvancedSelectorOptions = {
  classSelector: {
    label: string
  }
}

type CustomSelectorEventProps = {
  container: HTMLElement
}

////////////////
// Globals
const container = document.createElement('div')
container.id = 'asm-container'

////////////////
// Plugin functions
export function initListeners(editor: Editor) {
  return
  //editor.on('component:selected', (component: Component) => {
  //  updateUi(editor, [component])
  //})
  // When a class changes
  editor.on('selector', (...args) => {
    console.log('============> component:classes', args)
  })
  editor.on('component:update:classes', (...args) => {
    console.log('============', ...args)
    // console.log("========== Component class list updated:", component, component.getC);
    // // Get the class that changed
    // const changedClass = component
    //   .getClasses()
    //   .filter((cls) => component.previous('classes') !== component.get(cls))[0];
    // const classNames = component.getClasses()
    // console.log("============ Updated class names:", classNames);
  })

}

export function initASM(editor: Editor, options: AdvancedSelectorOptions, props?: CustomSelectorEventProps) {
  if (props && props.container) {
    props.container.appendChild(container)
    editor.on('selector:custom', ({ selected }: {selected: CssRule[]}) => updateUi(editor, selected))
  } else {
    // Keep listening
    editor.once('selector:custom', (props) => initASM(editor, options, props))
  }
}

function updateUi(editor: Editor, selected: CssRule[]) {
  console.log('TODO', selected)
  //const selectors = getSelectors(editor)
  //const selector = selectors[0]
  const components: Component[] = editor.getSelectedAll()
  const selectors: ComplexSelector[] = components
    .map((component) => getComponentSelector(component) || EMPTY_SELECTOR)
  const selector: ComplexSelector | false = same(selectors)
  if(selector) {
    requestAnimationFrame(() => editStyle(editor, toString(getSelector(components))))
    render(html`
      <complex-selector
        .value=${selector}
        .suggestions=${TAGS.map((tag) => ({ value: tag, type: SimpleSelectorType.TAG, active: true }))}
        .relations=${TAGS.map((tag) => ({ value: tag, type: SimpleSelectorType.TAG, active: true }))}
        @change=${(event: CustomEvent) => chagedSelector(event.detail as ComplexSelector, editor, components)}
        @rename=${(event: CustomEvent) => renameSelector(editor, event.detail.oldValue, event.detail.value) }
      ></complex-selector>

      <current-selector-display
        .value=${getSelector(components)}
      ></current-selector-display>
      <p>
        OTHER SELECTORS: <ul>
        ${selected.map((rule) => html`<li>${ (rule.selectorsToString ? rule.getAtRule() + rule.selectorsToString() : JSON.stringify(rule.attributes))}</li>`)}
        </ul>
        <hr>
        OTHER SELECTORS: <ul>
          ${getSelectors(editor).map((selector) => html`<li>${ toString(selector) }</li>`) }
        </ul>
      </p>
    `, container)
  } else {
    render(html`
      <p>Select a component to edit its selector</p>
    `, container)
  }
}

function getSelector(components: Component[]): ComplexSelector {
  if(components.length === 0) return EMPTY_SELECTOR
  const selector = getComponentSelector(components[0]) || EMPTY_SELECTOR
  if(selector.mainSelector.selectors.length === 0) {
    return {
      ...selector,
      mainSelector: {
        ...selector.mainSelector,
        selectors: [
          {
            type: SimpleSelectorType.ID,
            value: components[0].getId(),
            active: true,
          } as IdSelector,
        ],
      },
    }
  }
  return {
    ...selector,
  }
}

function chagedSelector(selector: ComplexSelector, editor: Editor, components: Component[]) {
  components.forEach((component) => {
    setComponentSelector(component, selector)
  })
  editStyle(editor, toString(selector))
}
