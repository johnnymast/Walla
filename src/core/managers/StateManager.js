const LocalStorage = require('core/storage/localStorage')

/**
 * StateManager
 * @namespace Core Managers
 */
class StateManager {

  /**
   * @classdesc Save the state of a game.
   * @exports  core/managers/AssetManager
   * @class
   */
  constructor () {
    this.adapter = new LocalStorage()
    if (typeof this.adapter.set !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the set method.')
    }

    if (typeof this.adapter.get !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the get method.')
    }

    if (typeof this.adapter.unset !== 'function') {
      throw new Error('StateManager: Adapter is not supporting the unset method.')
    }
  }

  /**
   * Return a state by key.
   *
   * @param {string} key - State key
   * @returns {*}
   */
  get (key) {
    return this.adapter.get(key)
  }

  /**
   *
   * @param {string} key - State key
   * @param {string} val = The value for this state
   */
  set (key, val) {
    return this.adapter.set(key, val)
  }

  /**
   * Delete state with a given key from the StateManager.
   *
   * @param {string} key - Delete the value of this key
   */
  unset (key) {
    return this.adapter.unset(key)
  }
}

module.exports = StateManager