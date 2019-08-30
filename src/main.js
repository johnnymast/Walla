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

require([
  'pixi',
  'core/GameEngine',
  'core/Gameloop',
  'core/managers/SceneManager',
  'core/managers/AssetManager',
  'core/managers/StateManager',
  'core/managers/InputManager',
  'core/managers/ResizeManager',
  'core/managers/PluginManager',
], function (PIXI, GameEngine, Gameloop, SceneManager, AssetManager, StateManager, InputManager, ResizeManager, PluginManager) {
  PIXI.utils.skipHello()
  sayHello()

  let width = 800
  let height = 600

  let ge = GameEngine.get()
  let app = new PIXI.Application(width, height, {
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio
  })

  let resizeManager = new ResizeManager(app, {
    autoFullScreen: true

  })
  document.body.appendChild(app.view)

  app.renderer.resize(width, height)
  app.renderer.antialias = true
  app.renderer.forceFXAA = true

  app.gameloop = new Gameloop()
  app.gameloop.maxFPS = 60
  app.gameloop.start()

  ge.set('App', app)
  ge.set('ResizeManager', resizeManager)
  ge.set('AssetManager', new AssetManager())
  ge.set('SceneManager', new SceneManager())
  ge.set('StateManager', new StateManager())
  ge.set('InputManager', new InputManager())
  ge.set('PluginManager', new PluginManager(ge))

  if (PLUGIN_MATTERJS) {
    const Matter = ge.get('PluginManager').loadPlugin('matterjs', 'Matter')
    ge.set('Matter', Matter)
  }

  if (PLUGIN_DEBUG) {
    const Debug = ge.get('PluginManager').loadPlugin('debug', 'Debug')
    let DebugManager = new Debug.DebugManager
    ge.set('DebugManager', DebugManager)
  }

  ge.get('SceneManager')
    .add('SplashScene')
    .switchTo('SplashScene')
})
