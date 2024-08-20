import { Selector } from 'grapesjs'
import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

@customElement('as-tag')
export class AsTag extends LitElement {
  @property({ type: String })
  public selector: Selector | null = null
  constructor() {
    super()
  }
  private _contentEditable = false
  @property({ type: String })
  override get contentEditable(): string {
    return this._contentEditable ? 'true' : 'false'
  }
  override set contentEditable(value: string) {
    super.contentEditable = 'false'
    const oldValue = this._contentEditable
    this._contentEditable = value === 'true'
    this.requestUpdate('contentEditable', oldValue)
    setTimeout(() => {
      this.makeEditable()
    })
  }

  static override styles = css`
    * {
      box-sizing: border-box;
      font-family: var(--gjs-main-font);
    }
    .as-tag {
      background-color: var(--gjs-tertiary-color);
      border-radius: 5px;
      display: inline-flex;
      justify-content: space-between;
      margin: 5px;
      min-width: 50px;
    }
    .as-tag span {
      padding: 5px;
      cursor: pointer;
      flex-grow: 1;
    }
    .as-tag:hover {
      background-color: var(--gjs-quaternary-color);
    }
    .as-tag span[contenteditable="true"] {
      background-color: var(--gjs-secondary-dark-color);
      color: var(--gjs-secondary-light-color);
      cursor: text;
    }
    .as-tag__remove {
      cursor: pointer;
      border: none;
      background-color: transparent;
      color: var(--gjs-font-color);
      &:hover {
        background-color: var(--gjs-color-warn);
        color: var(--gjs-color-red);
      }
    }
  `

  private inputRef = createRef<HTMLSpanElement>()

  override render() {
    return html`
      <div class="as-tag">
        <span
          ${ref(this.inputRef)}
          @dblclick=${() => this.makeEditable()}
        >${this.selector?.getLabel()}</span>
        <button
          class="as-tag__remove"
          @click=${() => this.dispatchEvent(new CustomEvent('remove', { detail: { selector: this.selector } }))}
        >x</button>
      </div>
    `
  }

  makeEditable() {
    if (this.inputRef.value) {
      const input = this.inputRef.value
      input.contentEditable = 'true'
      input.focus()
      input.addEventListener('blur', () => {
        input.contentEditable = 'false'
        this.dispatchEvent(new CustomEvent('change', { detail: { selector: input.innerText } }))
      })
      input.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          input.contentEditable = 'false'
          this.dispatchEvent(new CustomEvent('change', { detail: { selector: input.innerText } }))
        } else if (event.key === 'Escape') {
          input.contentEditable = 'false'
        }
      })
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'as-tag': AsTag
  }
}