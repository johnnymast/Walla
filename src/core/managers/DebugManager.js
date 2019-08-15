/**
 * DebugManager
 * @namespace Core Managers
 */
define(['pixi', 'core/debug/DebugScenePlugin'], function (PIXI, DebugScenePlugin) {

  /**
   * @classdesc AssetManager
   * @exports  core/managers/DebugManager
   * @class
   */
  var DebugManager = function () {
    PIXI.utils.EventEmitter.call(this)
  }

  extend(DebugManager, PIXI.utils.EventEmitter)

  DebugManager.prototype.init = function () {

    this.commands = []
    this.debugScene = new DebugScenePlugin()
  }

  DebugManager.prototype.addCommand = function (command, callback) {
    this.commands[command] = callback
  }

  DebugManager.prototype.haveCommand = function (command) {
    for (let name in Object.keys(this.commands)) {
      console.log(name)
    }
  }

  DebugManager.prototype.addCommands = function (commands) {
    if (!commands instanceof Array) {
      throw new Error('addCommand: parameter commands is no Array')
    }

    if (commands.length > 0) {
      commands.forEach((command, callback) => {
        this.addCommand(command, callback)
      })
    }
  }

  DebugManager.prototype.getCommands = function () {
    return this.commands
  }

  return DebugManager
})