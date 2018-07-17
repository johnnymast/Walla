const Menus = require('gui/menus')
const Dialogs = require('gui/dialogs')

define(['pixi', 'core/Scene', 'core/GameEngine', 'gui/Statistics'], function (pixi, Scene, GameEngine, Statistics) {
  let MainScreen = function (options) {
    Scene.call(this, options)
    this.backgrounds = []

    this.statistics = new Statistics()
  }

  extend(MainScreen, Scene)

  MainScreen.prototype.onStart = function () {
    //

    for (var i = 5; i > 0; i--) {
      var textureName = 'main_bg_0' + i
      var tilingSprite = new pixi.extras.TilingSprite(pixi.Texture.fromFrame(textureName), this.app.screen.width, this.app.screen.height)
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
      x: this.app.screen.width /2 - 200,
      y: this.app.screen.height / 2 - 200
    })

    dialog.onClose = function() {
      alert('Dialog onclose called')
    }

    console.log(dialog.width, dialog.height)



    var item1 = new Menus.MenuItemImageButton('Breakout', this.breakoutClicked)
    var item2 = new Menus.MenuItemImageButton('PixelShooter', this.pixelShooterClicked)
    var item3 = new Menus.MenuItemImageButton('Circles')

    item1.setPosition(menu.x, menu.y)
    item2.setPosition(menu.x, item1.y + item1.height + 5)
    item3.setPosition(menu.x, item2.y + item2.height + 5)

    menu.addMenuItem(item1)
    menu.addMenuItem(item2)
    menu.addMenuItem(item3)

    menu.x = dialog.width / 2 - menu.width / 2
    menu.y =  40
    //   this.resources.wave.play()

    this.addChild(this.statistics)

    dialog.addContent(menu)
    this.addChild(dialog)
  }

  MainScreen.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
  }

  MainScreen.prototype.pixelShooterClicked = function (event) {
    this.SceneManager.switchTo('PixelShooter/Level1')
  }

  MainScreen.prototype.breakoutClicked = function (event) {
    this.SceneManager.switchTo('Breakout/Level1')
  }

  MainScreen.prototype.update = function (delta) {
    for (var i = 5; i > 0; i--) {
      var textureName = 'main_bg_0' + i
      this.backgrounds[textureName].tilePosition.x -= 1 / (i * 1.5)
    }
    this.statistics.update(delta)
  }

  return MainScreen
})
