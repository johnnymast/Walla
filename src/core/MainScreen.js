define(['pixi', 'core/Scene', 'core/GameEngine'], function (pixi, Scene, GameEngine) {
  var MainScreen = function (options) {
    Scene.call(this, options)

    this.bunny = null
  }

  extend(MainScreen, Scene)

  MainScreen.prototype.onStart = function () {
    this.resources = this.ge.get('StateManager').get('resources')
    this.bunny = new pixi.Sprite(PIXI.Texture.fromFrame('paddleBlu.png'))

    // center the sprite's anchor point
    this.bunny.anchor.set(0.5)

    // move the bunny sprite to the center of the screen
    this.bunny.x = this.app.screen.width / 2
    this.bunny.y = this.app.screen.height / 2

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

    var richText = new pixi.Text('Your all ready to go .. May the source be with you developer', style)
    richText.x = (this.app.screen.width / 2) - richText.width / 2
    richText.y = this.bunny.y - richText.height - 40 /* 40 is padding spade */

 //   this.resources.wave.play()

    this.addChild(richText)
    this.addChild(this.bunny)
  }

  MainScreen.prototype.update = function (delta) {
    if (this.bunny) {
      this.bunny.rotation += 0.1 * delta
    }
  }

  return MainScreen
})
