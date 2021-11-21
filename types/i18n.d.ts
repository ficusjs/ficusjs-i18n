export declare class I18n {
  t (key: string, templateData: Object, options: Object): string
  add (items: Object, locale: string, prefix: string): I18n
  setLocale (locale: string): I18n
  getLocale (): string
  interpolateWith (userRE: RegExp): I18n
  setPluralizationRule (locale: string, rule: Function, options: Object): I18n
  whenUndefined (key: string, locale: string): string
  clear (): I18n
}

export interface CustomElementI18n {
  t (key: string, templateData: Object, options: Object): string
  getLocale (): string
}

export declare function createI18n (): I18n

export declare function getI18n (): I18n
