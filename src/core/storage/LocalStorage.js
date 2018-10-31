class LocalStorage {
  constructor () {
    if (typeof (Storage) === 'undefined') {
      throw new Error('LocalStorage: localStorage is not suppored by this browser.')
    }
  }

  get (key = '') {
    return localStorage.getItem(key)
  }

  set (key = '', value = '') {
    return localStorage.setItem(key, value)
  }

  unset (key = '') {
    return localStorage.removeItem(key)
  }
}

module.exports = LocalStorage
