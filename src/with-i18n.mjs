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
          // Function that returns an array of all ancestor elements
          const getAncestorElements = elem => elem.parentElement
            ? [elem.parentElement].concat(getAncestorElements(elem.parentElement))
            : []

          // Find the context's locale, i.e. that of the nearest ancestor with a
          // 'lang' attribute, or 'undefined' if none exists
          const contextLocale = getAncestorElements(this)
            .find(elem => elem.hasAttribute('lang'))?.getAttribute('lang')

          // Set the 'lang' attribute on this element if not already set and if
          // different than the context's
          const currentLocale = this.i18n.getLocale()
          if (currentLocale === contextLocale) {
            this.removeAttribute('lang')
          } else {
            this.setAttribute('lang', currentLocale)
          }

          this.key = locale
        })
      }

      if (options.created) options.created.call(this)
    }
  })
}
