class I18n {
  constructor () {
    if (globalThis.__ficusjs__ && globalThis.__ficusjs__.i18n) {
      return globalThis.__ficusjs__.i18n
    }
    this.registry = {}
    this.currentLocale = 'en'
    this.interpolateRE = /{{\s*(\w+)\s*}}/g
    this.localeDetectionRule = () =>
      new URLSearchParams(globalThis?.window?.location?.search).get('lang')
    this.pluralizationRules = {
      en: {
        pluralizeTo: 'count',
        getVariationIndex (count) {
          return (count === 1) ? 0 : 1
        }
      }
    }
    this.detectLocale()
    globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
    globalThis.__ficusjs__.i18n = globalThis.__ficusjs__.i18n || this
  }

  _translatePlural (key, variations, data, locale, pluralizeTo) {
    const rule = this.pluralizationRules[locale]
    const dataKeys = Object.keys(data)
    const pluralizeKey = dataKeys.length === 1
      ? dataKeys[0]
      : (pluralizeTo || rule.pluralizeTo)
    const count = parseFloat(data[pluralizeKey])
    if (isNaN(count)) {
      throw new Error(`Translation pluralization missing parameters on key '${key}'`)
    } else {
      return this._interpolate(variations[rule.getVariationIndex(count)], data)
    }
  }

  _interpolate (translationString, data) {
    return data
      ? translationString.replace(this.interpolateRE, function (match, param) {
          return data[param] != null ? data[param] : match
        })
      : translationString
  }

  t (key, templateData, options) {
    options = options || {}
    const locale = options.locale || this.currentLocale
    const registry = options.registry || this.registry
    const translation = registry[locale] && registry[locale][key]
    if (typeof translation === 'undefined') {
      return this.whenUndefined(key, locale)
    } else if (Array.isArray(translation)) {
      return this._translatePlural(key, translation, templateData, locale, options.pluralizeTo)
    } else {
      return this._interpolate(translation, templateData)
    }
  }

  add (items, locale, prefix) {
    locale = locale || this.currentLocale
    this.registry[locale] = this.registry[locale] || {}
    Object.keys(items).forEach(key => {
      const value = items[key]
      const registryKey = prefix ? prefix + '.' + key : key
      const valueType = typeof value
      if (Array.isArray(value) || valueType === 'string' || valueType === 'number') {
        this.registry[locale][registryKey] = value
      } else {
        this.add(value, locale, registryKey)
      }
    })
    return this
  }

  setLocale (locale) {
    // Allow validation and re-writing of the local string
    const newLocale = this.whenChangingLocale(locale)

    // Do not update locale if new value is null or undefined
    if (newLocale != null) {
      this.currentLocale = newLocale
    }

    return this
  }

  getLocale () {
    return this.currentLocale
  }

  detectLocale (callback = () => {}) {
    // Rely in fallback detection methods if new locale is null or undefined
    const setLocale = locale => {
      const oldLocale = this.currentLocale
      this.setLocale(locale !== undefined && locale !== null
        ? locale
        : globalThis?.document?.documentElement?.lang ||
          globalThis?.navigator?.language
      )
      callback(this.currentLocale, oldLocale)
    }

    // Execute the user-defined locale detection rule
    const detected = this.localeDetectionRule()
    if (detected instanceof Promise) {
      detected.then(setLocale)
    } else {
      setLocale(detected)
    }

    return this
  }

  setLocaleDetectionRule (rule) {
    this.localeDetectionRule = typeof rule === 'function'
      ? rule
      : () => rule
    return this
  }

  interpolateWith (userRE) {
    this.interpolateRE = userRE
    return this
  }

  setPluralizationRule (locale, rule, options) {
    this.pluralizationRules[locale] = {
      pluralizeTo: options && (options.pluralizeTo || 'count'),
      getVariationIndex: rule
    }
    return this
  }

  whenChangingLocale (locale) {
    return locale
  }

  whenUndefined (key, locale) {
    return key
  }

  clear () {
    this.registry = {}
    return this
  }
}

/**
 * Function to create an I18n instance
 * @returns {I18n}
 */
export function createI18n () {
  return new I18n()
}

/**
 * Function to get the running I18n instance
 * @returns {I18n}
 */
export function getI18n () {
  return createI18n()
}
