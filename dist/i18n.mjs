class t{constructor(){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.i18n)return globalThis.__ficusjs__.i18n;this.registry={},this.currentLocale="en",this.interpolateRE=/{{\s*(\w+)\s*}}/g,this.pluralizationRules={en:{pluralizeTo:"count",getVariationIndex:t=>1===t?0:1}},this._init(),globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.i18n=globalThis.__ficusjs__.i18n||this}_init(){if("undefined"!=typeof window&&"undefined"!=typeof document){const t=new URLSearchParams(window.location.search).get("lang"),e=t||(document.documentElement.lang?document.documentElement.lang:navigator.language);e&&this.setLocale(e)}}_translatePlural(t,e,i,r,n){const s=this.pluralizationRules[r],a=Object.keys(i),l=1===a.length?a[0]:n||s.pluralizeTo,o=parseFloat(i[l]);if(isNaN(o))throw new Error(`Translation pluralization missing parameters on key '${t}'`);return this._interpolate(e[s.getVariationIndex(o)],i)}_interpolate(t,e){return e?t.replace(this.interpolateRE,(function(t,i){return null!=e[i]?e[i]:t})):t}t(t,e,i){const r=(i=i||{}).locale||this.currentLocale,n=i.registry||this.registry,s=n[r]&&n[r][t];return void 0===s?this.whenUndefined(t,r):Array.isArray(s)?this._translatePlural(t,s,e,r,i.pluralizeTo):this._interpolate(s,e)}add(t,e,i){return e=e||this.currentLocale,this.registry[e]=this.registry[e]||{},Object.keys(t).forEach((r=>{const n=t[r],s=i?i+"."+r:r,a=typeof n;Array.isArray(n)||"string"===a||"number"===a?this.registry[e][s]=n:this.add(n,e,s)})),this}setLocale(t){return this.currentLocale=t,this}getLocale(){return this.currentLocale}interpolateWith(t){return this.interpolateRE=t,this}setPluralizationRule(t,e,i){return this.pluralizationRules[t]={pluralizeTo:i&&(i.pluralizeTo||"count"),getVariationIndex:e},this}whenUndefined(t,e){return t}clear(){return this.registry={},this}}function createI18n(){return new t}function getI18n(){return createI18n()}export{createI18n,getI18n};
