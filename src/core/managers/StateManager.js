const LocalStorage = require('core/storage/localStorage')

/**
 * StateManager
 * @namespace Core Managers
 */
define([], function () {

  /**
   * @classdesc StateManager
   * @exports  core/managers/StateManager
   * @class
   */
  let StateManager = function () {
    this.adapter = new LocalStorage()
    if (typeof this.adapter.set != 'function') {
      throw new Error("StateManager: Adapter is not supporting the set method.")
    }

    if (typeof this.adapter.get != 'function') {
      throw new Error("StateManager: Adapter is not supporting the get method.")
    }

    if (typeof this.adapter.unset != 'function') {
      throw new Error("StateManager: Adapter is not supporting the unset method.")
    }
  }

  /**
   * Return a state by key.
   *
   * @param {string} key - State key
   * @returns {*}
   */
  StateManager.prototype.get = function (key) {
    return this.adapter.get(key)
  }

  /**
   *
   * @param {string} key - State key
   * @param {string} val = The value for this state
   */
  StateManager.prototype.set = function (key, val) {
    return this.adapter.set(key, val)
  }

  /**
   * Delete state with a given key from the StateManager.
   *
   * @param {string} key - Delete the value of this key
   */
  StateManager.prototype.unset = function (key) {
    return this.adapter.unset(key)
  }

  return StateManager
})
