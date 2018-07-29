const Menus = require('gui/menus')
const Dialogs = require('gui/dialogs')
const Checkboxes = require('gui/checkboxes')
const Sliders = require('gui/sliders')

/**
 * @namespace Screens
 */
define(['pixi', 'core/Scene', 'core/GameEngine', 'gui/Statistics'], function (pixi, Scene, GameEngine, Statistics) {

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

    var menu = new Menus.Menu({
      items: {
        // paddingBottom: 1,
        // paddingTop: 10
      }
    })

    let dialog = new Dialogs.Dialog({
      type: Dialogs.TYPE.CLOSEABLE,
      width: 400,
      height: 400,
      x: this.app.screen.width / 2 - 200,
      y: this.app.screen.height / 2 - 200
    })

    let slider = new Sliders.BasicSlider({
      width: 248,
      height: 25,
      min: 0,
      max: 1,
      x: 24,
      y: 124,
    })

    slider.setValue(0.10)
    console.log('value now', slider.getValue())
    // slider.deactivate()

    let checkbox = new Checkboxes.BasicCheckbox({
      width: 48,
      height: 48,
      x: 24,
      y: 24,
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

    /**
     * Position the Menu on the Dialog
     */
    menu.x = dialog.width / 2 - menu.width / 2
    menu.y = 40

    dialog.addContent(menu)

    this.addChild(dialog)
    this.addChild(slider)
    this.addChild(checkbox)
    this.addChild(this.statistics)
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
   * Animate the background scrolling/
   *
   * @param {number} delta
   */
  MainScreen.prototype.update = function (delta) {
    for (let i = 5; i > 0; i--) {
      let texture = 'main_bg_0' + i
      this.backgrounds[texture].tilePosition.x -= 1 / (i * 1.5)
    }
    this.statistics.update(delta)
  }

  return MainScreen
})
