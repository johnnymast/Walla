const Gestures = require('core/gestures')

/**
 * @namespace Screens
 */
define(['pixi', 'core/Scene'],
  function (pixi, Scene) {

    /**
     * @classdesc MainScreen
     * @exports  screens/MainScreen
     *
     * @param {object} options - Options for PIXI.Container in GameObject
     * @class
     */
    let P = function (options) {
      Scene.call(this, options)
    }

    extend(P, Scene)

    /**
     * This function is called by the SceneManager after preloading has finished.
     * If your Scene does not have the preload function it will call this function
     * instantly.
     */
    P.prototype.onStart = function () {
      let logo = new PIXI.Sprite(PIXI.Texture.fromFrame('/assets/main/images/engine.png'))
      logo.x = 0
      logo.y = this.app.screen.height - logo.height

      let gestures = new Gestures(logo)
        .pinchable(true, [1, 1.2])

      logo.on('pinchmove', function(e) {

        e.target.position = e.position

        e.target.scale.x = e.scale
        e.target.scale.y = e.scale

        console.log('pinchmove res')
      })

      logo.on('pinchend', function(e) {
        console.log('end')
      })

      this.addChild(logo)
    }

    /**
     * Animate the background scrolling/
     *
     * @param {number} delta
     */
    P.prototype.update = function (delta) {

    }

    return P
  })
