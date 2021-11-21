import { html, createCustomElement } from '../util/component.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'

createCustomElement(
  'mock-app-with-i18n',
  {
    render () {
      return html`<div>
        <publish-button></publish-button>
        <subscribe-button></subscribe-button>
      </div>`
    }
  }
)
