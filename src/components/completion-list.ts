import { Selector } from 'grapesjs'
import { html, LitElement, TemplateResult } from 'lit'

/**
 * @fileoverview This component handles the completion of the selector manager, i.e the list of tags and css classes that can be added to the selected component
 */

export interface CompletionSelectEvent extends CustomEvent {
  detail: {
    selector: Selector,
  }
}

export class CompletionList extends LitElement {
  //input.addEventListener('keydown', (event: KeyboardEvent) => {
  //  if (event.key === 'Enter') {
  //    input.contentEditable = 'false'
  //    this.dispatchEvent(new CustomEvent('change', { detail: { selector: input.innerText } }))
  //  } else if (event.key === 'Escape') {
  //    input.contentEditable = 'false'
  //  }
  //})
  protected override render(): TemplateResult {
    super.render()
    return html`
      <section>
        Completion
      </section>
    `
  }
}

if (!customElements.get('as-completion')) {
  customElements.define('as-completion', CompletionList)
}
