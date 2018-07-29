import 'core/polyfill'
import 'core/geometry'
import 'core/helpers'
import 'babel-polyfill'

const EngineInfo = {
  name: 'Walla',
  version: 1.0,
  url: 'https://github.com/johnnymast/Walla',
}

window.extend = function (a, b) {
  a.prototype = Object.create(b.prototype)
  a.prototype.constructor = a
  a.prototype.super = b.prototype
}

// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
window.extend2 = function () {

  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend2( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;

};

window.merge = function (src, dest) {
  return Object.assign(src, dest)
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
