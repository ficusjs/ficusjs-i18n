import test from 'ava'
import { createI18nInstance } from './helpers/create-i18n.mjs'

let i18n

test.beforeEach(t => {
  i18n = createI18nInstance()
})

test('create an i18n instance', t => {
  t.truthy(i18n)
})

test('english as the default locale', t => {
  t.is(i18n.getLocale(), 'en')
})

test('add messages using default locale', t => {
  const value1 = i18n.t('title')
  t.is(value1, 'test')
  const value2 = i18n.t('nested.title')
  t.is(value2, 'test2')
})

test('set locale (sync)', t => {
  i18n.setLocale('aa')
  t.is(i18n.getLocale(), 'aa')
})

/* This test will fail when immediately followed by the next test, but pass when
 * executed on its own. It demonstrates a race condition, where the call to
 * `I18n.setLocale('cc')` from the next test ends up happening before the call
 * to `I18n.getLocale()` in this test, thereby making it fail. */
// test('set locale (async)', async t => {
//   await i18n.setLocale('bb').promise
//     .then(() => t.is(i18n.getLocale(), 'bb'))
// })

/* This test, however, is immune to race conditions because callbacks and
 * notifications to subscribers are now garanteed to fire immediately
 * (atomically) after the locale is updated. */
test('set locale (callback)', async t => {
  await i18n.setLocale('cc', ({ newLocale, oldLocale }) => {
    t.not(oldLocale, 'cc')
    t.is(newLocale, 'cc')
  }).promise
})

/* test('translation without messages for a locale', t => {
  i18n.setLocale('es')
  const value2 = i18n.t('nested.title')
  t.is(value2, 'nested.title')
})

test('setting messages for a different locale', t => {
  i18n.add({
    title: 'test3',
    nested: {
      title: 'test4'
    }
  }, 'es')
  i18n.setLocale('es')
  const value2 = i18n.t('nested.title')
  t.is(value2, 'test4')
})

test('will pluralize english translations', t => {
  i18n.setLocale('en')
  i18n.add({
    items: [
      '{{ itemCount }} item',
      '{{ itemCount }} items'
    ],
    basketItems: [
      '{{ count }} item in {{ size }} basket',
      '{{ count }} items in {{ size }} basket'
    ],
    accountCoins: [
      '{{ coinCount }} coin in {{ account }} account',
      '{{ coinCount }} coins in {{ account }} account'
    ]
  })

  t.is(i18n.t('items', { itemCount: 1 }), '1 item')
  t.is(i18n.t('items', { itemCount: 2 }), '2 items')
  t.is(i18n.t('items', { itemCount: '1' }), '1 item')
  t.is(i18n.t('items', { itemCount: '2' }), '2 items')
  t.is(i18n.t('items', { itemCount: '15.5' }), '15.5 items')

  t.is(i18n.t('basketItems', { count: 1, size: 'big' }), '1 item in big basket')
  t.is(i18n.t('basketItems', { count: 2, size: 'small' }), '2 items in small basket')

  t.is(
    i18n.t('accountCoins', { coinCount: 1, account: 'domestic' }, { pluralizeTo: 'coinCount' }),
    '1 coin in domestic account'
  )
  t.is(
    i18n.t('accountCoins', { coinCount: 2, account: 'foreign' }, { pluralizeTo: 'coinCount' }),
    '2 coins in foreign account'
  )

  t.throws(() => i18n.t('accountCoins', { coinCount: 2, account: 'foreign' }))
  t.throws(() => i18n.t('items'))
  t.throws(() => i18n.t('basketItems'))
})

test('allows extending pluralization rules', t => {
  i18n.setPluralizationRule('hr', $number => {
    // https://github.com/symfony/translation/blob/master/PluralizationRules.php#L156
    return (($number % 10 === 1) && ($number % 100 !== 11)) ? 0 : ((($number % 10 >= 2) && ($number % 10 <= 4) && (($number % 100 < 10) || ($number % 100 >= 20))) ? 1 : 2)
  }, { pluralizeTo: 'count' })

  i18n.setLocale('hr').add({
    balls: [
      '{{ count }} lopta',
      '{{ count }} lopte',
      '{{ count }} lopti'
    ],
    minutes: [
      '{{ count }} minuta',
      '{{ count }} minute',
      '{{ count }} minuta'
    ]
  })

  t.is(i18n.t('balls', { count: 1 }), '1 lopta')
  t.is(i18n.t('balls', { count: 2 }), '2 lopte')
  t.is(i18n.t('balls', { count: 5 }), '5 lopti')

  t.is(i18n.t('minutes', { count: 1 }), '1 minuta')
  t.is(i18n.t('minutes', { count: 2 }), '2 minute')
  t.is(i18n.t('minutes', { count: 5 }), '5 minuta')
  t.is(i18n.t('minutes', { count: 6 }), '6 minuta')
  t.is(i18n.t('minutes', { count: 12 }), '12 minuta')
  t.is(i18n.t('minutes', { count: 18 }), '18 minuta')
  t.is(i18n.t('minutes', { count: 22 }), '22 minute')
  t.is(i18n.t('minutes', { count: 28 }), '28 minuta')
  t.is(i18n.t('minutes', { count: 1328 }), '1328 minuta')
})

test('will parse template with custom user interpolate RE', t => {
  i18n.add({ welcomeMessage: 'Hello $userName' })
  i18n.interpolateWith(/\$(\w+)/g)

  t.is(i18n.t('welcomeMessage', { userName: 'George' }), 'Hello George')
})

test('will empty registry when clear is called', t => {
  i18n.add({ title: 'Test title' })
  i18n.clear()
  t.is(i18n.t('title'), 'title')
})

test('re-writing the locale string to a string', t => {
  i18n.setLocale('en')
  i18n.whenChangingLocale = locale => locale.split('-')[0]
  i18n.setLocale('pt-BR')
  t.is(i18n.getLocale(), 'pt')
  // Must revert to the default hook, because all tests operate on the same i18n object
  i18n.whenChangingLocale = locale => locale
})

test('re-writing the locale string to null', t => {
  i18n.setLocale('en')
  i18n.whenChangingLocale = locale => null
  i18n.setLocale('de')
  t.is(i18n.getLocale(), 'en')
  // Must revert to the default hook, because all tests operate on the same i18n object
  i18n.whenChangingLocale = locale => locale
})

test('re-writing the locale string to undefined', t => {
  i18n.setLocale('en')
  i18n.whenChangingLocale = locale => undefined
  i18n.setLocale('de')
  t.is(i18n.getLocale(), 'en')
  // Must revert to the default hook, because all tests operate on the same i18n object
  i18n.whenChangingLocale = locale => locale
})

test('setting the locale detection rule to a tring', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule('es')
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'es')
    })
})

test('setting the locale detection rule to null', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule(null)
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test('setting the locale detection rule to undefined', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule(undefined)
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test('setting the locale detection rule to a function returning a string', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule(() => 'es')
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'es')
    })
})

test('setting the locale detection rule to a function returning null', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule(() => null)
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test('setting the locale detection rule to a function returning undefined', t => {
  i18n.setLocale('en')
    .setLocaleDetectionRule(() => undefined)
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test.serial('setting the locale detection rule to a promise resolving to a string', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(new Promise(resolve => resolve('es')))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'es')
    })
})

test.serial('setting the locale detection rule to a promise resolving to null', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(new Promise(resolve => resolve(null)))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test.serial('setting the locale detection rule to a promise resolving to undefined', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(new Promise(resolve => resolve(undefined)))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test.serial('setting the locale detection rule to a function returning a promise resolving to a string', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(() => new Promise(resolve => resolve('es')))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'es')
    })
})

test.serial('setting the locale detection rule to a function returning a promise resolving to null', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(done => new Promise(resolve => resolve(null)))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
})

test.serial('setting the locale detection rule to a function returning a promise resolving to undefined', async t => {
  await i18n.setLocale('en')
    .setLocaleDetectionRule(done => new Promise(resolve => resolve(undefined)))
    .detectLocale((newLocale, oldLocale) => {
      t.is(oldLocale, 'en')
      t.is(newLocale, 'en')
    })
}) */
