import { CustomElementI18n, I18n } from './i18n'
import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithI18n extends HTMLElement {
  i18n: CustomElementI18n
  setI18n: (i18n: I18n) => void
}

export declare function withI18n<WT, AT> (i18n: I18n, options: CustomElementOptions<WT, AT>)

export declare function withI18nReactive<WT, AT> (i18n: I18n, options: CustomElementOptions<WT, AT>)
