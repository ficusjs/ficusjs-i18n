import { createI18n } from '../../../src/index.mjs'

export function createI18nInstance () {
  const i18n = createI18n()
  i18n.add({
    title: 'test',
    nested: {
      title: 'test2'
    }
  })
  return i18n
}
