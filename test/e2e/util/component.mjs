import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { createCustomElement as customElementCreator } from 'https://cdn.skypack.dev/@ficusjs/core'
import { withLocalState } from 'https://cdn.skypack.dev/@ficusjs/state'
import { createEventBus, getEventBus, withEventBus } from 'https://cdn.skypack.dev/@ficusjs/event-bus'
import { createI18n, getI18n, withI18n, withI18nReactive } from '../../../src/index.mjs'

function createCustomElement (tagName, options) {
  customElementCreator(tagName, { ...options, renderer })
}

const nothing = ''

export {
  createCustomElement,
  createI18n,
  createEventBus,
  getEventBus,
  getI18n,
  withEventBus,
  withI18n,
  withI18nReactive,
  withLocalState,
  html,
  nothing
}
