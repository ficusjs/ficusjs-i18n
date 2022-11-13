import { html, createCustomElement, withI18nReactive, withLocalState, withEventBus } from '../util/component.mjs'
import { i18n } from './i18n.mjs'
import { eventBus } from './event-bus.mjs'

createCustomElement('subscribe-button',
  withEventBus(eventBus,
    withI18nReactive(i18n,
      withLocalState({
        state () {
          return { count: 0 }
        },
        mounted () {
          this.eventBus.subscribe('increment', () => {
            this.state.count = this.state.count + 1
          })
        },
        render () {
          return html`<div>${this.i18n.t('counter', { count: this.state.count || 0 })}</div>`
        }
      })
    )
  )
)
