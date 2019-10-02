require('core/helpers')

// TODO: Clean up not all need to be here
const Prophecy = {
  Gameloop: require('core/Gameloop'),
  GameEngine: require('core/GameEngine'),
  Geometry: require('core/geometry'),
  Transform: require('core/Transform'),
  Transition: require('core/transitions/Transition'),
  SceneManager: require('core/managers/SceneManager'),
  AssetManager: require('core/managers/AssetManager'),
  StateManager: require('core/managers/StateManager'),
  InputManager: require('core/managers/InputManager'),
  ResizeManager: require('core/managers/ResizeManager'),
  PluginManager: require('core/managers/PluginManager'),
  ScenePlugin: require('core/ScenePlugin'),
  Storage: require('core/storage'),
  Camera: require('core/camera/Camera'),
  Plugins: {},
  Math: require('core/math'),
  Game: require('core/Game'),
  Pixi: require('pixi')
}

// FIXME: Fix this somehow
window.Prophecy = Prophecy
module.exports = Prophecy
