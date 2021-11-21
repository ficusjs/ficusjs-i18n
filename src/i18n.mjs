class I18n {
  constructor () {
    if (globalThis.__ficusjs__ && globalThis.__ficusjs__.i18n) {
      return globalThis.__ficusjs__.i18n
    }
    this.registry = {}
    this.currentLocale = 'en'
    this.interpolateRE = /{{\s*(\w+)\s*}}/g
    this.pluralizationRules = {
      en: {
        pluralizeTo: 'count',
        getVariationIndex (count) {
          return (count === 1) ? 0 : 1
        }
      }
    }
    this._init()
    globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
    globalThis.__ficusjs__.i18n = globalThis.__ficusjs__.i18n || this
  }

  _init () {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const paramLang = new URLSearchParams(window.location.search).get('lang')
      const lang = !paramLang ? (document.documentElement.lang ? document.documentElement.lang : navigator.language) : paramLang
      if (lang) this.setLocale(lang)
    }
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
    const store = options.registry || this.registry
    const translation = store[locale] && store[locale][key]
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
    this.currentLocale = locale
    return this
  }

  getLocale () {
    return this.currentLocale
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
