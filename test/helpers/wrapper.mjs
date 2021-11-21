import sinon from 'sinon'

export function createWrapper (options) {
  return new class Wrapper {
    constructor () {
      this.created = options.created || null
      this.updated = options.updated || null
      this._processRender = sinon.spy()
      const keys = Object.keys(options)
      keys.forEach(key => {
        if (!this[key] && typeof options[key] === 'function') {
          this[key] = options[key].bind(this)
        }
      })
      this.created()
    }
  }()
}
