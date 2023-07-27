import { html, createCustomElement, withI18nReactive, withEventBus } from '../util/component.mjs'
import { i18n } from './i18n.mjs'
import { eventBus } from './event-bus.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'
import './language-switcher.mjs'

createCustomElement(
  'mock-app-with-i18n',
  withEventBus(eventBus,
    withI18nReactive(i18n, {
      render () {
        return html`<div>
          <language-switcher></language-switcher>
          <publish-button></publish-button>
          <subscribe-button></subscribe-button>
        </div>`
      }
    })
  )
)
