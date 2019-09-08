class PluginManager {
  constructor () {
    this.plugins = []
  }

  /**
   * Load a plugin into the game engine.
   *
   * @param {string} name - The folder name of the plugin
   * @param {string} alias - register the plugin under this alias.
   * @returns {object}
   */
  loadPlugin (name = '', alias = '') {
    if (!name.length) {
      throw new Error('loadPlugin: Empty plugin name.')
    }

    let plugin = require('plugins/' + name + '/index')

    if (!alias) {
      alias = name
    }

    this.plugins[alias] = plugin

    return plugin
  }

  /**
   * Load a plugin into the game engine.
   *
   * @param {string} alias - Alias of the plugin
   * @returns {object}
   */
  getPlugin (alias) {
    if (!alias.length) {
      throw new Error('getPlugin: Empty plugin alias.')
    }

    if (!this.plugins[alias]) {
      throw new Error('getPlugin: Plugin not found.')
    }

    return this.plugins[alias]
  }
}

module.exports = PluginManager
