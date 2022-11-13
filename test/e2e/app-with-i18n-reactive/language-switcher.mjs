import { html, createCustomElement, withI18nReactive, withEventBus } from '../util/component.mjs'
import { i18n } from './i18n.mjs'
import { eventBus } from './event-bus.mjs'

createCustomElement(
  'language-switcher',
  withI18nReactive(i18n,
    withEventBus(eventBus, {
      buttonClicked (lang) {
        this.eventBus.publish('i18n:locale:changed', lang)
      },
      render () {
        return html`
          <button type="button" onclick=${() => this.buttonClicked('en')}>${this.i18n.t('buttons.english')}</button>
          <button type="button" onclick=${() => this.buttonClicked('it')}>${this.i18n.t('buttons.italian')}</button>
          <button type="button" onclick=${() => this.buttonClicked('ru')}>${this.i18n.t('buttons.russian')}</button>
          <button type="button" onclick=${() => this.buttonClicked('zh-CN')}>${this.i18n.t('buttons.chinese')}</button>
          <button type="button" onclick=${() => this.buttonClicked('zh-TW')}>${this.i18n.t('buttons.taiwanese')}</button>
        `
      }
    })
  )
)
