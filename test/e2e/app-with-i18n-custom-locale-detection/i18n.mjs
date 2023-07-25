import { createI18n } from '../util/component.mjs'
import { eventBus } from './event-bus.mjs'

const i18n = createI18n()
i18n.setPluralizationRule('es', count => count === 1 ? 0 : 1)
i18n.add({
  counter: [
    '¡Has hecho clic {{ count }} vez!',
    '¡Has hecho clic {{ count }} veces!'
  ],
  buttons: {
    increment: 'Incremento'
  },
  subscribers: 'Consigue suscriptores'
}, 'es')
i18n.setLocaleDetectionRule(() =>
  new Promise(resolve => resolve('locale'))
    .then(name => new URLSearchParams(window.location.search).get(name))
).detectLocale(() => {
  eventBus.publish('i18n:locale:changed', i18n.getLocale())
})

export { i18n }
