import { createI18n } from '../util/component.mjs'

const i18n = createI18n()

i18n.add(
  {
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
  },
  'en'
)

i18n.setPluralizationRule(
  'it',
  function (count) {
    return count === 1 ? 0 : 1
  },
  { pluralizeTo: 'count' }
)

i18n.add(
  {
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
  },
  'it'
)

i18n.setPluralizationRule(
  'zh-CN',
  function () {
    return 0
  },
  { pluralizeTo: 'count' }
)

i18n.add({
  counter: ['您点击了 {{ count }} 次！'],
  buttons: {
    increment: '增加',
    english: '英语',
    italian: '意大利语',
    russian: '俄语',
    taiwanese: '繁体中文',
    chinese: '简体中文'
  },
  subscribers: '拿了订阅者'

}, 'zh-CN')

i18n.add({
  counter: ['您點擊了 {{ count }} 次！'],
  buttons: {
    increment: '增加',
    english: '英語',
    italian: '意大利語',
    russian: '俄語',
    taiwanese: '繁体中文',
    chinese: '简体中文'
  },
  subscribers: '拿了訂閱者'
}, 'zh-TW')

i18n.setPluralizationRule(
  'ru',
  function (count) {
    return count === 1 ? 0 : 1
  },
  { pluralizeTo: 'count' }
)

i18n.add(
  {
    counter: ['Вы нажали {{ count }} раз!', 'Вы нажали {{ count }} раза!'],
    buttons: {
      increment: 'Увеличить',
      english: 'Английский',
      italian: 'Итальянский',
      russian: 'Русский',
      taiwanese: 'Тайваньский',
      chinese: 'Китайский'
    },
    subscribers: 'получить подписчиков'
  },
  'ru'
)

export { i18n }