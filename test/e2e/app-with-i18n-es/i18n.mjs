import { createI18n } from '../util/component.mjs'

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

export { i18n }
