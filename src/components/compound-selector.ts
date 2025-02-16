import { property } from 'lit/decorators.js'
import StylableElement from '../StylableElement'
import { CompoundSelector, toString } from '../model/CompoundSelector'
import { SimpleSelector, SimpleSelectorType } from '../model/SimpleSelector'
import { css, html, TemplateResult } from 'lit'
import SimpleSelectorComponent from './simple-selector'
import { PSEUDO_CLASSES } from '../model/PseudoClass'


export default class CompoundSelectorComponent extends StylableElement {

  // /////////////////
  // Attributes
  /**
   * The selector to display
   */
  @property({ type: Object, attribute: true, reflect: false })
  public get value(): CompoundSelector | undefined {
    return this._value
  }
  public set value(value: CompoundSelector | string | undefined) {
    try {
      this._value = typeof value === 'string' ? JSON.parse(value) : value
    } catch (error) {
      console.error('Error parsing value for selector', { value, error })
    }
    this.requestUpdate()
  }
  private _value: CompoundSelector | undefined

  /**
   * A list of all the classes, IDs, tags, custom tags, attributes, custom attributes
   * that are available in the document, applicable to the current selection
   */
  @property({ type: Object, attribute: true, reflect: false })
  public suggestions: SimpleSelector[] = []

  @property({ type: Boolean, attribute: 'disable-pseudo-class' })
  public disablePseudoClass: boolean = false

  // /////////////////
  // Properties

  // /////////////////
  // Element overrides
  static override styles = css`
    select:focus-visible,
    input:focus-visible,
    button:focus-visible,
    a:focus-visible {
      outline: initial !important;
      box-shadow: revert !important;
      border: 1px solid !important;
    }
    button:hover, a:hover {
      transform: translateY(1px);
      color: var(--gjs-primary-color, #333);
    }
    .asm-compound__selectors {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
      margin: 0.5rem 0;
      /* material design card style */
      padding: 0.5rem;
      background-color: var(--gjs-secondary-color, white);
      border-radius: 0.5rem;
    }
    button.asm-compound__add {
      font-size: 1.5rem;
      margin: 0 0.5rem;
      /* text inside button vertical align */
      line-height: 1.5rem;
      padding: 0px 0px 0.15rem;
    }
    button.asm__add-inline {
      padding: 0 0.5rem;
      font-size: 0.8rem;
    }
  `

  override dispatchEvent(event: Event): boolean {
    console.info('[COMPOUND] Dispatching event', event)
    return super.dispatchEvent(event)
  }

  override toString(): string {
    return toString(this.value!)
  }
  override render(): TemplateResult {
    return html`
      <section>
        <div
          class="asm-compound__selectors"
        >
          ${ this.value?.selectors.map((selector, idx) => html`
            <simple-selector
              .value=${ selector }
              .suggestions=${ this.suggestions }
              @change=${ (event: CustomEvent<SimpleSelector>) => this.changeSelector(event, idx) }
              @delete=${ (event: CustomEvent) => this.deleteSelector(event, idx) }
            ></simple-selector>
          `) }
          <button
            title="Add a new selector"
            class="gjs-btn-prim asm-compound__add"
            @click=${ this.addSelector }
            >+</button>
        </div>
        ${ this.disablePseudoClass ? '' : html`
          ${ this.value?.pseudoClass ? html`
            <div>
              <inline-select
                .value=${ this.value?.pseudoClass }
                .options=${ PSEUDO_CLASSES }
                @change=${ this.changePseudoClass }
                placeholder=""
              ></inline-select>
            <div>
          ` : html`
            <button
              class="gjs-btn-prim asm__add-inline"
              @click=${ this.addPseudoClass }
              >\u2192 Pseudo Class</button>
          ` }
        `}
      </section>
    `
  }

  // /////////////////
  // Methods
  private changeSelector(event: CustomEvent<SimpleSelector>, idx: number) {
    this.value = {
      ...this.value!,
      selectors: this.value!.selectors.map((selector, i) => i === idx ? event.detail : selector)
    }
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
    event.stopPropagation()
    this.requestUpdate()
  }
  private addSelector(event: MouseEvent) {
    this.value = this.value ?? { selectors: [] }
    this.value.selectors.push({ type: SimpleSelectorType.UNKNOWN, active: true })
    event.stopPropagation()
    this.requestUpdate()
    // Make the last selector editable
    requestAnimationFrame(() => this.focusLastSelector())
  }
  private focusLastSelector() {
    if (!this.value) {
      return
    }
    const selector = this.shadowRoot!.querySelectorAll('simple-selector')[this.value!.selectors.length - 1] as SimpleSelectorComponent
    selector.editing = true
    requestAnimationFrame(() => {
      selector.focus()
    })
  }
  private deleteSelector(event: CustomEvent, idx: number) {
    this.value?.selectors.splice(idx, 1)
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
    event.stopPropagation()
    this.requestUpdate()
  }
  private addPseudoClass(event: MouseEvent) {
    this.value = { ...this.value!, pseudoClass: PSEUDO_CLASSES[0] }
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
    event.stopPropagation()
  }
  private changePseudoClass(event: CustomEvent) {
    this.value = { ...this.value!, pseudoClass: event.detail }
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
    event.stopPropagation()
  }
}

if (!customElements.get('compound-selector')) {
  customElements.define('compound-selector', CompoundSelectorComponent)
}
