define(['pixi', 'core/Scene', 'core/GameEngine'], function (pixi, Scene, GameEngine) {
  var SplashScene = function (options) {
    Scene.call(this, options)

    this.loaderHolder = new pixi.Graphics()
    this.loaderFill = new pixi.Graphics()

    this.precentageText = null
    this.logo = null

    this.percentageStyle = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18
    })
  }

  extend(SplashScene, Scene)

  SplashScene.prototype.onStart = function () {
    var logoTexture = pixi.Texture.fromImage('/assets/images/engine.png')
    logoTexture.on('update', () => {
      this.logo = new pixi.Sprite(logoTexture)
      this.logo.anchor.set(0.5)
      this.logo.x = this.app.screen.width / 2
      this.logo.y = this.app.screen.height / 2

      this.loaderHolder.lineStyle(2, 0x000000, 1)
      this.loaderHolder.beginFill(0xffffff, 1)
      this.loaderHolder.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, this.logo.width * 2, 10)

      this.loaderFill.lineStyle(2, 0x000000, 1)
      this.loaderFill.beginFill(0x000000, 1)
      this.loaderFill.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, 0, 10)

      this.precentageText = new pixi.Text('0%', this.percentageStyle)
      this.precentageText.y = (this.logo.y + this.logo.height / 2) + 15
      this.precentageText.x = (((this.app.screen.width / 2) - this.logo.width) + this.logo.width * 2) + 10

      this.addChild(this.precentageText)
      this.addChild(this.loaderHolder)
      this.addChild(this.loaderFill)
      this.addChild(this.logo)
      this.preload()
    })
  }

  SplashScene.prototype.preload = function () {
    this.ge.get('AssetManager').loadManifest([
      { name: 'floor', src: 'assets/images/floor.png'},
      { name: 'level1_music', src: 'assets/sounds/music/level1.mp3' },
      { name: 'level2_music', src: 'assets/sounds/music/level2.mp3' },
      { name: 'level3_music', src: 'assets/sounds/music/level3.mp3' },
      { name: 'game_over', src: 'assets/sounds/game_over.mp3' },
      { name: 'mission_completed', src: 'assets/sounds/mission_completed.mp3' },
      { name: 'spritesheet-0', type: 'spritesheet', src: 'assets/spritesheets/spritesheet-1.json'},
    ])

    this.AssetManager.once('complete', this._preloadready, this)
    this.AssetManager.on('progress', this._preloadProgress, this)
  }

  SplashScene.prototype._preloadProgress = function (event) {
    this.loaderFill.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, this.loaderHolder.width / (100 / event.progress), 10)
    this.precentageText.text = Math.round(event.progress) + '%'
  }

  SplashScene.prototype._preloadready = function (loader, resources) {

    this.StateManager.set('resources', this.resources)
    this.SceneManager.switchTo('Level1')
  }

  return SplashScene
})
