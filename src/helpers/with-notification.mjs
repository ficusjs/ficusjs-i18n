export const withNotification = subclass =>
  class extends (subclass) {

    #subscribers = []

    get subscribers () { return this.#subscribers }

    notifySubscribers (data, subscribers) {
      (subscribers || this.#subscribers).forEach(fn => fn(data))
    }

    notifySubscribersAsync (data, subscribers) {
      return (subscribers || this.#subscribers).map(fn =>
        Promise.resolve(data).then(fn)
      )
    }

    subscribe (callback) {
      if (!this.#subscribers.includes(callback)) {
        this.#subscribers.push(callback)
      }
      return () => { unsubscribe(callback) }
    }

    unsubscribe (callback) {
      this.#subscribers = this.#subscribers.filter(c => c !== callback)
    }

    unsubscribeAll () {
      this.#subscribers = []
    }
  }
