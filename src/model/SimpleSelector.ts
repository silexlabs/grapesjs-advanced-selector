/**
 * @fileoverview The model types and functions for the simple selector
 * A Simple selector is made of a list of simple selectors, e.g `div`, `.class`, `#id`, `[attr=^value]`
 */


// //////////////
// Types

/**
 * The type of the simple selector
 */
export enum SimpleSelectorType {
  TAG = 'tag',
  CUSTOM_TAG = 'custom-tag',
  CLASS = 'class',
  ID = 'id',
  ATTRIBUTE = 'attribute',
  UNIVERSAL = 'universal',
  UNKNOWN = 'unknown',
}

/**
 * The type for tag selectors
 */
export type TAG = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rb' | 'rp' | 'rt' | 'rtc' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'slot' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr'

/**
 * A simple selector interface
 * This is a virtual interface to be overridden by the specific simple selector types
 */
export interface SimpleSelector {
  type: SimpleSelectorType
  active: boolean
}

export interface SimpleSelectorSuggestion extends SimpleSelector {
  createText?: string
  createValue?: string
  keepEditing?: boolean
}

export interface TagSelector extends SimpleSelector {
  type: SimpleSelectorType.TAG
  value: TAG
}

export interface IdSelector extends SimpleSelector {
  type: SimpleSelectorType.ID
  value: string
}

export interface ClassSelector extends SimpleSelector {
  type: SimpleSelectorType.CLASS
  value: string
}

export enum AttributeOperatorType {
  EQUALS = '=',
  INCLUDES = '~=',
  DASH_MATCH = '|=',
  PREFIX_MATCH = '^=',
  SUFFIX_MATCH = '$=',
  SUBSTRING_MATCH = '*=',
}
export interface AttributeSelector extends SimpleSelector {
  type: SimpleSelectorType.ATTRIBUTE
  value: string
  operator?: AttributeOperatorType
  attributeValue?: string
}

export interface UniversalSelector extends SimpleSelector {
  type: SimpleSelectorType.UNIVERSAL
}

export interface CustomTagSelector extends SimpleSelector {
  type: SimpleSelectorType.CUSTOM_TAG
  value: string
}

// //////////////
// Constants

export const ATTRIBUTES = ['id', 'class', 'style', 'name', 'type', 'value', 'placeholder', 'href', 'src', 'alt', 'title', 'width', 'height', 'disabled', 'checked', 'selected', 'hidden', 'readonly', 'multiple', 'required', 'min', 'max', 'step', 'pattern', 'autocomplete', 'autofocus', 'spellcheck', 'contenteditable', 'dir', 'lang', 'tabindex', 'accesskey', 'role']
export const ATTRIBUTE_OPERATORS = ['=', '~=', '|=', '^=', '$=', '*=']
export const SELECTOR_PREFIXES = ['.', '#', '[', '*']
export const TAGS: TAG[] = [ 'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr' ]
export const ESCAPE_CHARS = [' ']
export const COLOR_FOR_TYPE = {
  [SimpleSelectorType.TAG]: 'var(--gjs-color-blue, #3b97e3)',
  [SimpleSelectorType.CUSTOM_TAG]: 'var(--gjs-color-blue, #3b97e3)',
  [SimpleSelectorType.CLASS]: 'var(--gjs-color-green, #62c462)',
  [SimpleSelectorType.ID]: 'var(--gjs-color-yellow, #ffca6f)',
  [SimpleSelectorType.ATTRIBUTE]: 'var(--gjs-color-yellow, #ffca6f)',
  [SimpleSelectorType.UNIVERSAL]: 'var(--gjs-color-red, #dd3636)',
  [SimpleSelectorType.UNKNOWN]: 'var(--gjs-color-red, #dd3636)',
}

const CLASS_SYMBOL = '•'
const ID_SYMBOL = '#'
const ATTRIBUTE_SYMBOL = '[ ]'
const UNIVERSAL_SYMBOL = '*'
const CUSTOM_TAG_SYMBOL = '⚛'
const TAG_SYMBOL = '⚛'
const UNKNOWN_SYMBOL = '?'

// //////////////
// Functions

/**
 * Compare two simple selectors to see if they are the same
 */
export function isSameSelector(a: SimpleSelector, b: SimpleSelector, ignoreActive = true): boolean {
  if (a.type !== b.type) return false
  if (!ignoreActive && a.active !== b.active) return false
  switch (a.type) {
  case SimpleSelectorType.TAG:
  case SimpleSelectorType.CUSTOM_TAG:
  case SimpleSelectorType.CLASS:
  case SimpleSelectorType.ID: {
    const typedA = a as AttributeSelector
    const typedB = b as AttributeSelector
    return typedA.value === typedB.value
  }
  case SimpleSelectorType.ATTRIBUTE: {
    const typedA = a as AttributeSelector
    const typedB = b as AttributeSelector
    if(typedA.operator !== typedB.operator) return false
    if(typedA.operator && typedA.attributeValue !== typedB.attributeValue) return false
    return typedA.value === typedB.value
  }
  case SimpleSelectorType.UNIVERSAL: {
    return true
  }
  default:
    return false
  }
}

export function toString(selector: SimpleSelector): string {
  switch (selector.type) {
  case SimpleSelectorType.ATTRIBUTE: {
    const typed = selector as AttributeSelector
    return `[${typed.value || ''}${typed.operator ? `${typed.operator}"${typed.attributeValue ?? ''}"` : ''}]`
  }
  case SimpleSelectorType.CLASS: {
    const typed = selector as ClassSelector
    return `.${typed.value || ''}`
  }
  case SimpleSelectorType.ID: {
    const typed = selector as IdSelector
    return `#${typed.value || ''}`
  }
  case SimpleSelectorType.TAG:
  case SimpleSelectorType.CUSTOM_TAG: {
    const typed = selector as TagSelector | CustomTagSelector
    return typed.value || ''
  }
  case SimpleSelectorType.UNIVERSAL:
    return '*'
  default:
    return ''
  }
}

export function getDisplayType(selector: SimpleSelector): string {
  switch (selector.type) {
  case SimpleSelectorType.ATTRIBUTE:
    return ATTRIBUTE_SYMBOL
  case SimpleSelectorType.CLASS:
    return CLASS_SYMBOL
  case SimpleSelectorType.ID:
    return ID_SYMBOL
  case SimpleSelectorType.TAG:
    return TAG_SYMBOL
  case SimpleSelectorType.UNIVERSAL:
    return UNIVERSAL_SYMBOL
  case SimpleSelectorType.CUSTOM_TAG:
    return CUSTOM_TAG_SYMBOL
  default:
    return UNKNOWN_SYMBOL
  }
}

export function getDisplayName(selector: SimpleSelector): string {
  switch (selector.type) {
  case SimpleSelectorType.CLASS: 
  case SimpleSelectorType.ID:
  case SimpleSelectorType.TAG:
  case SimpleSelectorType.ATTRIBUTE:
  case SimpleSelectorType.CUSTOM_TAG:
    return (selector as TagSelector).value
  case SimpleSelectorType.UNIVERSAL:
    return '*'
  default:
    return ''
  }
}

export function getEditableName(selector: SimpleSelector): string {
  if (selector.type === SimpleSelectorType.ATTRIBUTE) {
    const typed = selector as AttributeSelector
    return `[${typed.value || ''}]`
  }
  return toString(selector)
}

/**
 * Determines if the value is valid for the selector
 * If not valid, will try to suggest a valid value
 */
export function validate(_value: string): string | false {
  // Special cases
  if (_value === '') return _value
  if (_value === '*') return _value
  // Escape special characters for the regular expression
  const escapedOperators = ESCAPE_CHARS.map(op => `\\${op}`).join('|')
  const value = _value
    .toLowerCase()
    .replace(new RegExp(escapedOperators, 'g'), '-')
  // No starting with number or -
  if (value.match(/^[0-9-]/)) return false
  if (value.startsWith('-')) return false
  // Attributes should be from the ATTRIBUTES list
  if (value.match(/^\[[a-z-]*\]?$/) && ATTRIBUTES.includes(value.replace('[', '').replace(']', ''))) return value.replace(']', '') + ']'
  // Attribute with a value
  const attrWithVal = _value // Keep the original value, not escaped because the attr value could contain spaces
    .match(/^\[([\w-]+)\s*=\s*"([^"]*)"?\]?$/)
  if (attrWithVal) {
    const [, name, val] = attrWithVal
    if(ATTRIBUTES.includes(name)) return `[${name}="${val}"]`
  }
  // Custom attributes should start with data-
  if (value.match(/^\[data-[_a-zA-Z]+[_a-zA-Z0-9]*\]?$/)) return value.replace(']', '') + ']'
  // Custom tags should contain a - and be defined as web components
  if(value.match(/^[a-z-]*[a-z]$/) && value.includes('-') && window.customElements.get(value)) return value
  // Tags should be from the TAGS list
  if (value.match(/^[a-z]*$/) && TAGS.includes(value as TAG)) return value
  // Classes should start with . then a letter
  if (value.match(/^\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/)) return value
  // IDs should start with # then a letter
  if (value.match(/^#-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/)) return value
  // Check if it is a valid css class when adding a dot at the beginning
  if (value.match(/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*[_a-zA-Z0-9]$/)) return '.' + value
  // Not a valid selector and not fixable
  return false
}

/**
 * Get a list of suggestions, filtered and with creation suggestions
 */
export function suggest(filter: string, suggestions: SimpleSelector[]): SimpleSelectorSuggestion[] {
  if (filter === '*') {
    // The universal selector will be suggested in the creation suggestions (getCreationSuggestions)
    return []
  }

  // Make sure suggestions is an array of SimpleSelector
  // Or throw
  suggestions.forEach((suggestion) => {
    if (!suggestion.type) {
      throw new Error('Invalid suggestion')
    }
  })

  // Limit the number of suggestions by type of selector
  //const typeCount = new Map<SimpleSelectorType, number>()
  return suggestions
    // Filter by the filter
    .filter(selector => {
      const value = getEditableName(selector)
      return value.toLowerCase().includes(filter.toLowerCase())
    })
}

export function getCreationSuggestions(validated: string | false): SimpleSelectorSuggestion[] {
  // Creation suggestions
  const creationSuggestions = [] as SimpleSelectorSuggestion[]
  if (validated) {
    const active = true
    if (validated === '*') {
      creationSuggestions.push({ createText: 'Select everything: *', type: SimpleSelectorType.UNIVERSAL, active, } as UniversalSelector)
    } else if (validated.startsWith('.')) {
      creationSuggestions.push({ createText: `Select class ${ validated }`, type: SimpleSelectorType.CLASS, value: validated.slice(1), active, } as ClassSelector)
    } else if (validated.startsWith('[')) {
      const [name, val] = validated
        .substring(1, validated.length - 1) // Remove the brackets []
        .split('=') // Split the name and value
      if(val) {
        creationSuggestions.push({ createText: `Select custom attribute ${ name } with value ${ val }`, type: SimpleSelectorType.ATTRIBUTE, value: name, operator: '=', attributeValue: val.replace(/"/g, ''), active, } as AttributeSelector)
      } else {
        creationSuggestions.push({ createText: `Select custom attribute ${ validated }`, type: SimpleSelectorType.ATTRIBUTE, value: name, active, } as AttributeSelector)
      }
    } else if (validated.match(/^[a-z-]*-[a-z]*$/)) {
      creationSuggestions.push({ createText: `Select custom tag ${ validated }`, type: SimpleSelectorType.CUSTOM_TAG, value: validated, active, } as CustomTagSelector)
    }
  }
  return creationSuggestions
}

export function specificity(selector: SimpleSelector, ignoreActive = false): number {
  if (!ignoreActive && !selector.active) return 0

  switch (selector.type) {
  case SimpleSelectorType.TAG:
    return 1
  case SimpleSelectorType.CLASS:
  case SimpleSelectorType.ATTRIBUTE:
  case SimpleSelectorType.CUSTOM_TAG:
    return 10
  case SimpleSelectorType.ID:
    return 100
  case SimpleSelectorType.UNIVERSAL:
    return 0
  default:
    console.warn(`Unknown selector type: ${selector.type}`)
    return 0
  }
}

/**
 * Returns a sorting priority for selectors based on CSS specificity rules.
 */
export function getSelectorPriority(selector: SimpleSelector): number {
  switch (selector.type) {
  case SimpleSelectorType.TAG:
  case SimpleSelectorType.CUSTOM_TAG:
    return 1 // Tags come first

  case SimpleSelectorType.ID:
    return 2 // IDs come second

  case SimpleSelectorType.CLASS:
    return 3 // Classes come next

  case SimpleSelectorType.ATTRIBUTE:
    return 4 // Attributes should come after classes

  case SimpleSelectorType.UNIVERSAL:
    return 5 // Universal selector has the lowest specificity

  default:
    return 6
  }
}
