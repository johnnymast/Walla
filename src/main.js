import 'core/polyfill'
import 'core/geometry'
import 'core/helpers'
import 'babel-polyfill'

const EngineInfo = {
  name: 'Stage Engine',
  version: 1.0,
  url: 'https://github.com/johnnymast/Walla',
}


let sayHello = function() {
  if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
  {
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
      'color: #ff2424; background: #fff; padding:5px 0;',
    ];

    window.console.log.apply(console, args);
  }
  else if (window.console)
  {
    window.console.log(`${EngineInfo.name} ${EngineInfo.version}`);
  }

}


require([
  'pixi',
  'core/GameEngine',
  'core/managers/SceneManager',
  'core/managers/AssetManager',
  'core/managers/StateManager',
  'core/managers/PhysicsManager',
  'core/Scene'
], function (PIXI, GameEngine, SceneManager, AssetManager, StateManager, PhysicsManager, Scene) {
  PIXI.utils.skipHello()
  sayHello()

  var ge = GameEngine.get()

  var app = new PIXI.Application(1920, 1080, {
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio
  })
  document.body.appendChild(app.view)

  app.renderer.resize(800, 600)


  ge.set('App', app)
  ge.set('AssetManager', new AssetManager())
  ge.set('SceneManager', new SceneManager())
  ge.set('StateManager', new StateManager())
  ge.set('PhysicsManager', new PhysicsManager())

  ge.get('SceneManager')
    .add('SplashScene')
    .switchTo('SplashScene')
})
