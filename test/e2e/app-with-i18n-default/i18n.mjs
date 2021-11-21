import { createI18n } from '../util/component.mjs'

const i18n = createI18n()
i18n.add({
  counter: [
    'You have clicked {{ count }} time!',
    'You have clicked {{ count }} times!'
  ],
  buttons: {
    increment: 'Increment'
  },
  subscribers: 'Get subscribers'
})

export { i18n }
