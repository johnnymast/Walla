import 'core/helpers'
import 'core/geometry'
import 'babel-polyfill'
import 'core/Transform'
import 'core/math'

const EngineInfo = {
  name: 'Stage Engine',
  version: 1.0,
  url: 'https://github.com/johnnymast/Walla'
}

let sayHello = function () {
  if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    const args = [
      `\n %c %c %c ${EngineInfo.name} ${EngineInfo.version.toFixed(2)} - ✰ ✰  %c  %c  ${EngineInfo.url}  %c %c ♥%c♥%c♥ \n\n`,
      'background: #ff66a5; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;',
      'color: #ff66a5; background: #030307; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;',
      'background: #ffc3dc; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;',
      'color: #ff2424; background: #fff; padding:5px 0;',
      'color: #ff2424; background: #fff; padding:5px 0;',
      'color: #ff2424; background: #fff; padding:5px 0;'
    ]

    window.console.log.apply(console, args)
  } else if (window.console) {
    window.console.log(`${EngineInfo.name} ${EngineInfo.version.toFixed(2)}`)
  }
}

const Gameloop = require('core/gameloop')
const GameEngine = require('core/GameEngine')
const SceneManager = require('core/managers/SceneManager')
const AssetManager = require('core/managers/AssetManager')
const StateManager = require('core/managers/StateManager')
const InputManager = require('core/managers/InputManager')
const ResizeManager = require('core/managers/ResizeManager')
const PluginManager = require('core/managers/PluginManager')
import Pixi from 'pixi.js' //= require('pixi')

let init = function () {
  PIXI.utils.skipHello()
  sayHello()

  var canvas = document.getElementById('game')
  var resolution = window.devicePixelRatio

  let ge = GameEngine.get()

  let app = new PIXI.Application(canvas.width, canvas.height, {
    width: canvas.width,
    height: canvas.height,
    view: canvas,
    resolution: resolution,
    antialias: 1,
    autoresize: true
  })

  let resizeManager = new ResizeManager(app, {
    autoFullScreen: true
  })

  app.gameloop = new Gameloop()
  app.gameloop.maxFPS = 60
  app.gameloop.start()

  LocalStorage.set('App', app)
  LocalStorage.set('ResizeManager', resizeManager)
  LocalStorage.set('AssetManager', new AssetManager())
  LocalStorage.set('SceneManager', new SceneManager())
  LocalStorage.set('StateManager', new StateManager())
  LocalStorage.set('InputManager', new InputManager())
  LocalStorage.set('PluginManager', new PluginManager(ge))

  if (PLUGIN_MATTERJS) {
    const Matter = LocalStorage.get('PluginManager').loadPlugin('matterjs', 'Matter')
    LocalStorage.set('Matter', Matter)
  }

  if (PLUGIN_DEBUG) {
    const Debug = LocalStorage.get('PluginManager').loadPlugin('debug', 'Debug')
    let DebugManager = new Debug.DebugManager
    LocalStorage.set('DebugManager', DebugManager)
  }

  LocalStorage.get('SceneManager')
    .add('SplashScene')
    .switchTo('SplashScene')
}

window.onload = function () {
  init()
}