require ('core/helpers')
require ('core/geometry')
// import 'babel-polyfill'
require ('core/Transform')
require ('core/math')

const Prophecy = {
  Gameloop: require('core/Gameloop'),
  GameEngine: require('core/GameEngine'),
  Transform: require('core/Transform'),
  SceneManager: require('core/managers/SceneManager'),
  AssetManager: require('core/managers/AssetManager'),
  StateManager: require('core/managers/StateManager'),
  InputManager: require('core/managers/InputManager'),
  ResizeManager: require('core/managers/ResizeManager'),
  PluginManager: require('core/managers/PluginManager'),
  Plugins: {},
  Math: require('core/math'),
  Game: require('core/Game'),
  Pixi: require('pixi')
}

// FIXME: Fix this somehow
window.Prophecy = Prophecy
module.exports = Prophecy
