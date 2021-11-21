import test from 'ava'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withI18n } from '../../src/index.mjs'
import { createI18nInstance } from './helpers/create-i18n.mjs'

test.beforeEach(t => {
  t.context = createWrapper(
    withI18n(createI18nInstance(), {})
  )
})

test('translate', t => {
  const value = t.context.i18n.t('test2')
  t.is(value, 'test2')
})
