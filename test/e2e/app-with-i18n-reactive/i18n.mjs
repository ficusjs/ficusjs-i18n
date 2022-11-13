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
    chinese: 'Chinese',
  },
  subscribers: 'Get subscribers'
}, 'en')

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
    chinese: 'Chinese',
  },
  subscribers: 'Get subscribers'
}, 'it')

export { i18n }
