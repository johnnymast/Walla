import 'core/helpers'
import 'core/geometry'
import 'babel-polyfill'
import 'core/Transform'
import 'core/math'

const Prophecy = {
  Gameloop: require('core/gameloop'),
  GameEngine: require('core/GameEngine'),
  SceneManager: require('core/managers/SceneManager'),
  AssetManager: require('core/managers/AssetManager'),
  StateManager: require('core/managers/StateManager'),
  InputManager: require('core/managers/InputManager'),
  ResizeManager: require('core/managers/ResizeManager'),
  PluginManager: require('core/managers/PluginManager'),
  Plugins: {},
  Game: require('core/Game'),
  Pixi: require('pixi')
}

// FIXME: Fix this somehow
window.Prophecy = Prophecy
