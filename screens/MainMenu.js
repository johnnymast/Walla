const Menus = require('gui/menus')
const Dialogs = require('gui/dialogs')

/**
 * @namespace Screens
 */
define(['pixi', 'core/Scene', 'core/GameEngine', 'gui/Statistics', 'tweenjs'],
  function (pixi, Scene, GameEngine, Statistics, TweenJS) {

    /**
     * @classdesc MainScreen
     * @exports  screens/MainScreen
     *
     * @param {object} options - Options for PIXI.Container in GameObject
     * @class
     */
    let MainScreen = function (options) {
      Scene.call(this, options)
      this.backgrounds = []

      this.statistics = new Statistics()
    }

    extend(MainScreen, Scene)

    /**
     * This function is called by the SceneManager after preloading has finished.
     * If your Scene does not have the preload function it will call this function
     * instantly.
     */
    MainScreen.prototype.onStart = function () {

      /**
       * Setup the scrolling background tiles.
       */
      for (let i = 5; i > 0; i--) {
        let textureName = 'main_bg_0' + i
        let tilingSprite = new pixi.extras.TilingSprite(pixi.Texture.fromFrame(textureName), this.app.screen.width, this.app.screen.height)

        tilingSprite.tileScale.x = 0.6
        tilingSprite.tileScale.y = 0.6
        tilingSprite.tilePosition.y = this.app.screen.height

        this.backgrounds[textureName] = tilingSprite
        this.addChild(tilingSprite)
      }

      var menu = new Menus.Menu()

      let dialog = new Dialogs.CloseableDialog({
        width: 400,
        height: 500,
        x: this.app.screen.width / 2 - 400 /2,
        y: this.app.screen.height / 2 ,
      })


      dialog.onClose = function () {
        alert('Dialog onclose called')
      }

      let item1 = new Menus.MenuItemImageButton('Breakout', this.breakoutClicked)
      let item2 = new Menus.MenuItemImageButton('PixelShooter', this.pixelShooterClicked)
      let item3 = new Menus.MenuItemImageButton('RoundedRects', this.roundedRectsClicked)

      item1.setPosition(menu.x, menu.y)
      item2.setPosition(menu.x, item1.y + item1.height + 5)
      item3.setPosition(menu.x, item2.y + item2.height + 5)


      menu.addMenuItem(item1)
      menu.addMenuItem(item2)
      menu.addMenuItem(item3)

      if (this.isFullScreenAvailable() === true) {
        let item4 = new Menus.MenuItemImageButton('Toggle Fullscreen', this.fullscreenClicked.bind(this))
        item4.setPosition(menu.x, item3.y + item3.height + 5)
        menu.addMenuItem(item4)
      }


      /**
       * Position the Menu on the Dialog
       */
      menu.x = dialog.width / 2 - menu.width / 2
      menu.y = 40

      dialog.addContent(menu)

      this.addChild(dialog)
      this.addChild(this.statistics)

      let coords = {x: dialog.x, y: 0, useTicks: false}
      this.tween = new TweenJS.Tween(coords)
        .to({y: this.app.screen.height / 2 - dialog.height / 2}, 500)
        .easing(TweenJS.Easing.Circular.In)
        .onUpdate(function () {
          dialog.x = coords.x
          dialog.y = coords.y
        })
        .start()
    }

    /**
     * Breakout menu option callback
     */
    MainScreen.prototype.breakoutClicked = function () {
      this.SceneManager.switchTo('Breakout/Level1')
    }

    /**
     * PixelShooter menu option callback
     */
    MainScreen.prototype.pixelShooterClicked = function () {
      this.SceneManager.switchTo('PixelShooter/Level1')
    }

    /**
     * RoundedRects menu option callback
     */
    MainScreen.prototype.roundedRectsClicked = function () {
      this.SceneManager.switchTo('RoundedRects/Level1')
    }

    /**
     * RoundedRects menu option callback
     */
    MainScreen.prototype.fullscreenClicked = function () {
      if (this.isFullScreen() === false) {
        this.enterFullScreen()
      } else {
        this.exitFullScreen()
      }
    }

    /**
     * Callback for when the main menu was left for an other
     * scene.
     */
    MainScreen.prototype.onSwitchedAway = function() {
      // console.log('SceneManager switched away from MainMenu')
    }

    /**
     * Animate the background scrolling/
     *
     * @param {number} delta
     */
    MainScreen.prototype.update = function (delta) {
      for (let i = 5; i > 0; i--) {
        let texture = 'main_bg_0' + i
        this.backgrounds[texture].tilePosition.x -= 1 / (i * 1.5)
      }
      TweenJS.update()
      this.statistics.update(delta)
    }

    return MainScreen
  })
