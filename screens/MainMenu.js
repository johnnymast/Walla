const Menus = require('gui/menu')
define(['pixi', 'core/Scene', 'core/GameEngine', 'gui/Statistics'], function (pixi, Scene, GameEngine, Statistics) {
  var MainScreen = function (options) {
    Scene.call(this, options)
    this.backgrounds = []

    this.statistics = new Statistics()
    this.addChild(this.statistics);
  }

  extend(MainScreen, Scene)

  MainScreen.prototype.onStart = function () {

    var style = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff00'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    })

    for (var i = 5; i > 0; i--) {
      var textureName = 'main_bg_0' + i
      var tilingSprite = new pixi.extras.TilingSprite(pixi.Texture.fromFrame(textureName), this.app.screen.width, this.app.screen.height)
      tilingSprite.tileScale.x = 0.6
      tilingSprite.tileScale.y = 0.6

      tilingSprite.tilePosition.y = this.app.screen.height

      this.backgrounds[textureName] = tilingSprite
      //    this.addChild(tilingSprite)
    }

    var richText = new pixi.Text('Pick your game', style)
    richText.x = (this.app.screen.width / 2) - richText.width / 2
    richText.y = 120
    /* 180 is padding spade */

    var menu = new Menus.Menu({
      items: {
        paddingBottom: 1,
        paddingTop: 10
      }
    })
    this.addChild(menu)

    var item1 = new Menus.MenuItemText('Breakout', this.breakoutClicked)
    var item2 = new Menus.MenuItemText('Circles')

    item1.setPosition(menu.x, menu.y)
    item2.setPosition(menu.x, item1.y + item1.height + 5)

    menu.addMenuItem(item1)
//    menu.addMenuItem(item2);

    menu.x = this.app.screen.width / 2 - menu.width / 2
    menu.y = richText.y + 80
    //   this.resources.wave.play()

    this.addChild(richText)
  }

  MainScreen.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
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
