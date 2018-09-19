import 'core/helpers'
import 'core/polyfill'
import 'core/prototypes'
import 'core/geometry'
import 'babel-polyfill'
import 'core/Transform'
// import 'core/math'

const Vector2d = require('core/math/vector2d')
const Vector3d = require('core/math/vector3d')

const EngineInfo = {
  name: 'Stage Engine',
  version: 1.0,
  url: 'https://github.com/johnnymast/Walla',
}

let v1 = new Vector2d(2, 3)
let v2 = new Vector2d(4, 12)
let dot = v1.dot(v2)

// 8 + 36 = 44
console.log('dot', dot)
//distance 9.848857801796104
// window.onerror = function (msg, url, lineNo, columnNo, error) {
//   var string = msg.toLowerCase();
//   var substring = "script error";
//   if (string.indexOf(substring) > -1){
//     alert('Script Error: See Browser Console for Detail');
//   } else {
//     var message = [
//       'Message: ' + msg,
//       'URL: ' + url,
//       'Line: ' + lineNo,
//       'Column: ' + columnNo,
//       'Error object: ' + JSON.stringify(error)
//     ].join(' - ');
//
//     alert(message);
//   }
//
//   return false;
// };

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
    window.console.log(`${EngineInfo.name} ${EngineInfo.version.toFixed(2)}`);
  }

}


require([
  'pixi',
  'core/GameEngine',
  'core/managers/SceneManager',
  'core/managers/AssetManager',
  'core/managers/StateManager',
  'core/managers/PhysicsManager',
  'core/managers/InputManager',
  'core/managers/ResizeManager',
], function (PIXI, GameEngine, SceneManager, AssetManager, StateManager, PhysicsManager, InputManager, ResizeManager) {
  PIXI.utils.skipHello()
  sayHello()

  let width = 800
  let height = 600

  let ge = GameEngine.get()
  let app = new PIXI.Application(width, height, {
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio,
  })


  let resizeManager = new ResizeManager(app, {
    autoFullScreen: true,

  });
  document.body.appendChild(app.view)

  app.renderer.resize(width, height)
  app.renderer.antialias = true;
  app.renderer.forceFXAA = true;

  ge.set('App', app)
  ge.set('ResizeManager', resizeManager)
  ge.set('AssetManager', new AssetManager())
  ge.set('SceneManager', new SceneManager())
  ge.set('StateManager', new StateManager())
  ge.set('PhysicsManager', new PhysicsManager())
  ge.set('InputManager', new InputManager())

  ge.get('SceneManager')
    .add('SplashScene')
    .switchTo('SplashScene')
})
