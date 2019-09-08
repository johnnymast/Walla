const PIXI = require('pixi')
const Plugin = require('../scene/Plugin')

class DebugManager extends PIXI.utils.EventEmitter {
  constructor () {
    super()
    this.init()
  }

  /**
   * Initialize the DebugManager
   */
  init () {

    this.commands = []
    this.debugScene = new Plugin()
  }

  /**
   * Add a new command.
   *
   * @param {string} command - The command name.
   * @param {callback} callback - The callback to execute.
   */
  addCommand (command, callback) {
    this.commands[command] = callback
  }

  /**
   * Check if a given command exists.
   *
   * @deprecated
   * @param {string} command - The command to check on.
   */
  haveCommand (command) {
    for (let name in Object.keys(this.commands)) {
      console.log(name)
    }
  }

  /**
   * Add a new command to handle.
   *
   * @param {[]} commands - The list of commands.
   */
  addCommands (commands) {
    if (!commands instanceof Array) {
      throw new Error('addCommand: parameter commands is no Array')
    }

    if (commands.length > 0) {
      commands.forEach((command, callback) => {
        this.addCommand(command, callback)
      })
    }
  }

  /**
   * Return a list of all commands.
   *
   * @returns {[]|Array}
   */
  getCommands () {
    return this.commands
  }
}

if (typeof module !== 'undefined') {
  module.exports = DebugManager
}