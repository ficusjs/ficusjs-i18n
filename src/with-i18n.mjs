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
        }
      }
    }
  }
}
