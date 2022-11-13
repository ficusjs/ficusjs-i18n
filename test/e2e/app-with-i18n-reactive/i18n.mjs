import { createI18n } from '../util/component.mjs'

const i18n = createI18n()

i18n.add({
  counter: [
    'You have clicked {{ count }} time!',
    'You have clicked {{ count }} times!'
  ],
  buttons: {
    increment: 'Increment',
    english: 'English',
    italian: 'Italian',
    russian: 'Russian',
    taiwanese: 'Taiwanese',
    chinese: 'Chinese'
  },
  subscribers: 'Get subscribers'
}, 'en')

i18n.setPluralizationRule('it', function (count) {
  return (count === 1) ? 0 : 1
}, { pluralizeTo: 'count' })

i18n.add({
  counter: [
    'Hai cliccato {{ count }} volta!',
    'Hai cliccato {{ count }} volte!'
  ],
  buttons: {
    increment: 'Aumenta',
    english: 'Inglese',
    italian: 'Italiano',
    russian: 'Russo',
    taiwanese: 'Taiwanese',
    chinese: 'Cinese'
  },
  subscribers: 'Mostra Gli Ascoltatori'
}, 'it')

export { i18n }
