const Menus = require('gui/menus')
const Dialogs = require('gui/dialogs')

/**
 * @namespace Screens
 */
define(['pixi', 'core/Scene', 'core/GameEngine', 'gui/Statistics', 'tweenjs', 'core/transitions/Transition'],
  function (pixi, Scene, GameEngine, Statistics, TweenJS, Transition) {

    /**
     * @classdesc MainScreen
     * @exports  screens/MainScreen
     *
     * @param {object} options - Options for PIXI.Container in GameObject
     * @class
     */
    let MainMenu = function (options) {
      Scene.call(this, options)
      this.backgrounds = []
      this.statistics = new Statistics()
    }

    extend(MainMenu, Scene)

    /**
     * This function is called by the SceneManager after preloading has finished.
     * If your Scene does not have the preload function it will call this function
     * instantly.
     */
    MainMenu.prototype.onInit = function () {

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

      let menu = new Menus.Menu()

      let dialog = new Dialogs.CloseableDialog({
        width: 300,
        height: 250,
        x: this.app.screen.width / 2 - 400 / 2,
        y: this.app.screen.height / 2,
      })

      dialog.onClose = function () {
        alert('Dialog onclose called')
      }

      let item1 = new Menus.MenuItemImageButton('Breakout', this.breakoutClicked)
      let item2 = new Menus.MenuItemImageButton('PixelShooter', this.pixelShooterClicked)
      let item3 = new Menus.MenuItemImageButton('RoundedRects', this.roundedRectsClicked)
      let item4 = new Menus.MenuItemImageButton('Gamepad', this.gamePadClicked)
      let item5 = new Menus.MenuItemImageButton('Lerp', this.lerpClicked)

      item1.setPosition(menu.x, menu.y)
      item2.setPosition(menu.x, item1.y + item1.height + 5)
      item3.setPosition(menu.x, item2.y + item2.height + 5)
      item4.setPosition(menu.x, item3.y + item3.height + 5)
      item5.setPosition(menu.x, item4.y + item4.height + 5)

      menu.addMenuItem(item1)
      menu.addMenuItem(item2)
      menu.addMenuItem(item3)
      menu.addMenuItem(item4)
      menu.addMenuItem(item5)

      if (this.isFullScreenAvailable() === true) {
        let fullscreen = new Menus.MenuItemImageButton('Toggle Fullscreen', this.fullscreenClicked.bind(this))
        let menuItems = menu.getMenuItems()
        let lastItem = menuItems[menuItems.length - 1]

        fullscreen.setPosition(menu.x, lastItem.y + lastItem.height + 5)
        menu.addMenuItem(fullscreen)
      }

      /**
       * Position the Menu on the Dialog
       */
      menu.x = dialog.width / 2 - menu.width / 2
      menu.y = 40

      dialog.addContent(menu)

      this.addChild(dialog)
      this.addChild(this.statistics)

      let coords = { x: dialog.x, y: 0, useTicks: false }
      this.tween = new TweenJS.Tween(coords)
        .to({ y: this.app.screen.height / 2 - dialog.height / 2 }, 500)
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
    MainMenu.prototype.breakoutClicked = function () {
      this.SceneManager.switchToUsingTransaction('Breakout/Level1', Transition.named('ScrollFrom', { direction: 'bottom' }))
    }

    /**
     * PixelShooter menu option callback
     */
    MainMenu.prototype.pixelShooterClicked = function () {
      this.SceneManager.switchToUsingTransaction('PixelShooter/Level1', Transition.named('ScrollFrom', { direction: 'right' }))
    }

    /**
     * RoundedRects menu option callback
     */
    MainMenu.prototype.roundedRectsClicked = function () {
      this.SceneManager.switchToUsingTransaction('RoundedRects/Level1', Transition.named('ScrollFrom', { direction: 'bottom' }))
    }

    /**
     * Gamepad menu option callback
     */
    MainMenu.prototype.gamePadClicked = function () {
      this.SceneManager.switchTo('Gamepad/Level1')
    }

    /**
     * Lerp menu option callback
     */
    MainMenu.prototype.lerpClicked = function () {
      this.SceneManager.switchTo('Lerp/Level1')
    }

    /**
     * RoundedRects menu option callback
     */
    MainMenu.prototype.fullscreenClicked = function () {
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
    MainMenu.prototype.onSwitchedAway = function () {
      // console.log('SceneManager switched away from MainMenu')
    }

    /**
     * Animate the background scrolling/
     *
     * @param {number} delta
     */
    MainMenu.prototype.update = function (delta) {
      for (let i = 5; i > 0; i--) {
        let texture = 'main_bg_0' + i
        this.backgrounds[texture].tilePosition.x -= 1 / (i * 1.5)
      }
      TweenJS.update()
      this.statistics.update(delta)

    }

    return MainMenu
  })
