import { html, createCustomElement, withI18nReactive, withEventBus } from '../util/component.mjs'
import { i18n } from './i18n.mjs'
import { eventBus } from './event-bus.mjs'

createCustomElement(
  'publish-button',
  withEventBus(eventBus,
    withI18nReactive(i18n, {
      buttonClicked () {
        this.eventBus.publish('increment', undefined)
      },
      render () {
        return html`
          <button type="button" onclick=${this.buttonClicked}>${this.i18n.t('buttons.increment')}</button>`
      }
    })
  )
)
