import 'core/polyfill'
import 'core/geometry'
import 'babel-polyfill'

window.extend = function (a, b) {
  a.prototype = Object.create(b.prototype)
  a.prototype.constructor = a
  a.prototype.super = b.prototype
}

window.merge = function(src,dest) {
  return Object.assign(src, dest);
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

  var app = new PIXI.Application(1920, 1080, {backgroundColor: 0x0, autoResize: true, resolution: window.devicePixelRatio})
  document.body.appendChild(app.view)

  app.renderer.resize(800, 600);

  ge.set('App', app)
  ge.set('AssetManager', new AssetManager())
  ge.set('SceneManager', new SceneManager())
  ge.set('StateManager', new StateManager())
  ge.set('PhysicsManager', new PhysicsManager());

  ge.get('SceneManager')
    .add('SplashScene')
    .switchTo('SplashScene')
})
