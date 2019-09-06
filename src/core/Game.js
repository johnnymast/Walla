const GameEngine = require('./GameEngine')
const Scene = require('./Scene')

class Game extends GameEngine {
  constructor (config = {}) {
    super()

    this.config = config
    this.sayhello = true
    this.scene = config.scene

    if (typeof config.sayhello !== 'undefined') {
      this.sayhello = config.sayhello
    }

    if (typeof config.scene === 'string') {
      this.scene = config.scene
    } else if (typeof config.scene == 'object') {
      this.scene = new Scene(config)
      // this.scene.preload = config.preload
    }

    this.EngineInfo = {
      name: 'ProphecyJS',
      version: 0.10,
      version_type: 'alpha',
      url: 'https://github.com/johnnymast/Walla'
    }

    this.ge = Prophecy.GameEngine.get()

    this.hello()
    this.init()
    this.initPlugins()
  }

  hello () {
    PIXI.utils.skipHello()
    if (this.sayhello === true) {
      if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        const args = [
          `\n %c %c %c ${this.EngineInfo.name} ${this.EngineInfo.version.toFixed(2)} ${this.EngineInfo.version_type} - ✰ ✰  %c  %c  ${this.EngineInfo.url}  %c %c ♥%c♥%c♥ \n\n`,
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
        window.console.log(`${this.EngineInfo.name} ${this.EngineInfo.version.toFixed(2)}`)
      }
    }
  }

  init () {

    let canvas = this.config.canvas
    let resolution = window.devicePixelRatio

    let app = new PIXI.Application(canvas.width, canvas.height, {
      width: this.config.width || canvas.width,
      height: this.config.height || canvas.height,
      view: canvas,
      resolution: resolution,
      antialias: 1,
      autoresize: true
    })

    let resizeManager = new Prophecy.ResizeManager(app, {
      autoFullScreen: true
    })

    app.gameloop = new Prophecy.Gameloop()
    app.gameloop.maxFPS = 60
    app.gameloop.start()

    this.ge.set('App', app)
    this.ge.set('ResizeManager', resizeManager)
    this.ge.set('AssetManager', new Prophecy.AssetManager())
    this.ge.set('SceneManager', new Prophecy.SceneManager())
    this.ge.set('StateManager', new Prophecy.StateManager())
    this.ge.set('InputManager', new Prophecy.InputManager())
    this.ge.set('PluginManager', new Prophecy.PluginManager(this.ge))

    this.ge.get('SceneManager')
      .add(this.scene)
      // .add('MainMenu')
      .switchTo(this.scene)
  }

  initPlugins () {
    if (PLUGIN_MATTERJS) {
      const Matter = this.ge.get('PluginManager').loadPlugin('matterjs', 'Matter')
      Prophecy.Plugins.Matter = Matter
      this.ge.set('Matter', Matter)
    }

    if (PLUGIN_DEBUG) {
      const Debug = this.ge.get('PluginManager').loadPlugin('debug', 'Debug')
      let DebugManager = new Debug.DebugManager
      Prophecy.Plugins.DebugManager = DebugManager
      this.ge.set('DebugManager', DebugManager)
    }
  }
}

module.exports = Game