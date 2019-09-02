class LocalStorage {

  /**
   * @classdesc LocalStorage
   * @exports  core/storage/LocalStorage
   * @class
   */
  constructor () {
    if (typeof (Storage) === 'undefined') {
      throw new Error('LocalStorage: localStorage is not suppored by this browser.')
    }
  }

  /**
   * Return the value stored in LocalStorage.
   *
   * @param {string} key - Return the value of a stored item with this identifier.
   * @returns {string}
   */
  get (key = '') {
    return localStorage.getItem(key)
  }

  /**
   * Set a value in LocalStorage.
   *
   * @param {string} key - The identifier for the value.
   * @param {*} value - The value to store.
   */
  set (key = '', value = '') {
    return localStorage.setItem(key, value)
  }

  /**
   * Unset a value in LocalStorage.
   *
   * @param {string} key - The identifier to unset.
   */
  unset (key = '') {
    return localStorage.removeItem(key)
  }
}

module.exports = LocalStorage
