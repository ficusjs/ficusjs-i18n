export function withI18n (i18n, options) {
  return {
    ...options,
    created () {
      this.setI18n(i18n)
      if (options.created) options.created.call(this)
    },
    setI18n (i18n) {
      const self = this
      self._i18n = i18n
      self.i18n = {
        t (key, templateData, options) {
          return self._i18n.t(key, templateData, options)
        },
        getLocale () {
          return self._i18n.getLocale()
        },
        setLocale (locale) {
          self._i18n.setLocale(locale)
        },
        detectLocale (callback) {
          self._i18n.detectLocale(callback)
        }
      }
    }
  }
}

export function withI18nReactive (i18n, options) {
  return withI18n(i18n, {
    ...options,
    created () {
      if (this.eventBus) {
        this.eventBus.subscribe('i18n:locale:changed', locale => {
          this.key = locale
        })
      }
      if (options.created) options.created.call(this)
    }
  })
}
