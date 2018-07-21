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
    this.container = []
  }

  /**
   * Return a state by key.
   *
   * @param {string} key - State key
   * @returns {*}
   */
  StateManager.prototype.get = function (key) {
    return this.container[key]
  }

  /**
   *
   * @param {string} key - State key
   * @param {string} val = The value for this state
   */
  StateManager.prototype.set = function (key, val) {
    this.container[key] = val
  }

  /**
   * Delete state with a given key from the StateManager.
   *
   * @param {string} key - Delete the value of this key
   */
  StateManager.prototype.unset = function (key) {
    delete this.container[key]
  }

  return StateManager
})
