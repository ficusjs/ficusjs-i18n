export const withConcurrency = subclass =>
  class extends (subclass) {

    #lock = new Int32Array(new SharedArrayBuffer(4))

    constructor() {
      super()
      // Start off with an available lock
      Atomics.store(this.#lock, 0, 0)
    }

    /**
     * Execute a function with an exclusivity lock, returning its result to
     * the caller. This function effectively implements busy-waiting, thefore
     * implementers should aim at keeping critical regions to a minimum. Calls
     * to this function cannot be nested at runtime and will otherwise lead to
     * deadlocks.
     * NOTE: Alternative implementations that avoid busy-waiting could leverage
     * the `Atomics.waitAsync()` function (which is not yet available in Firefox
     * as of v116) or `Atomics.wait()` with workers (since `Atomics.wait()` is
     * disallowed on the main thread).
     * @param {function} fn
     * @param {array} args
     * @returns {any}
     * @private
     */
    withLock(fn, ...args) {
      // Test if lock is available and, if so, acquire it (atomic)
      if (!Atomics.exchange(this.#lock, 0, 1)) {
        // Execute the callback (critical region) and save its result
        const result = fn(...args)
        // Release the lock
        Atomics.store(this.#lock, 0, 0)
        // Return to the caller the result of the callback
        return result
      }
      // If lock was not available, then try again (tail-recursive)
      return this.withLock(...arguments)
    }
  }
