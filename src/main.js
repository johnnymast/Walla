import 'core/polyfill'
import 'core/geometry'
import 'babel-polyfill'

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

require([
  'pixi',
  'core/GameEngine',
  'core/managers/SceneManager',
  'core/managers/AssetManager',
  'core/managers/StateManager',
  'core/managers/PhysicsManager',
  'core/Scene'
], function (PIXI, GameEngine, SceneManager, AssetManager, StateManager, PhysicsManager, Scene) {
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
