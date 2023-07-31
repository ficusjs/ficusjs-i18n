export declare class I18n {
  t (key: string, templateData: Object, options: Object): string
  add (items: Object, locale: string, prefix: string): I18n
  setLocale (locale: string | null | undefined): I18n
  getLocale (): string
  detectLocale(callback: Function): I18n
  interpolateWith (userRE: RegExp): I18n
  setLocaleDetectionRule (rule: any): I18n
  setPluralizationRule (locale: string, rule: Function, options: Object): I18n
  whenChangingLocale (locale: string | null | undefined): string | null | undefined
  whenUndefined (key: string, locale: string): string
  clear (): I18n
}

export interface CustomElementI18n {
  t (key: string, templateData: Object, options: Object): string
  getLocale (): string
  setLocale (locale: string | null | undefined): void
  detectLocale (callback: Function): void
}

export declare function createI18n (): I18n

export declare function getI18n (): I18n
