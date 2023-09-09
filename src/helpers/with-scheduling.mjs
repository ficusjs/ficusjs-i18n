export const withScheduling = subclass =>
  class extends (subclass) {

    #promise = Promise.resolve()

    get promise () {
      return this.#promise
    }

    schedule (fn, ...args) {
      this.#promise = this.#promise.then(() => fn(...args))
      return this
    }
  }
