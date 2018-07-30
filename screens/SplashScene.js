
/**
 * @namespace Screens
 */
define(['pixi', 'core/Scene'], function (PIXI, Scene) {

  /**
   * @classdesc SplashScene
   * @exports  screens/SplashScene
   *
   * @param {object} options - Options for PIXI.Container in GameObject
   * @class
   */
  let SplashScene = function (options) {
    Scene.call(this, options)

    this.loaderHolder = new PIXI.Graphics()
    this.loaderFill = new PIXI.Graphics()

    this.percentageStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18
    })
  }

  extend(SplashScene, Scene)

  /**
   * This function is called by the SceneManager after preloading has finished.
   * If your Scene does not have the preload function it will call this function
   * instantly.
   */
  SplashScene.prototype.onStart = function () {

    var background = new PIXI.Sprite(PIXI.Texture.BLACK)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    background.alpha = 1

    this.addChild(background)

    var logoTexture = PIXI.Texture.fromImage('/assets/main/images/engine.png')
    logoTexture.on('update', () => {
      this.logo = new PIXI.Sprite(logoTexture)
      this.logo.anchor.set(0.5)
      this.logo.x = this.app.screen.width / 2
      this.logo.y = this.app.screen.height / 2

      this.loaderHolder.lineStyle(2, 0x000000, 1)
      this.loaderHolder.beginFill(0xffffff, 1)
      this.loaderHolder.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, this.logo.width * 2, 10)

      this.loaderFill.lineStyle(2, 0xff6e02, 1)
      this.loaderFill.beginFill(0xff6e02, 1)
      this.loaderFill.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, 0, 10)

      this.precentageText = new PIXI.Text('0%', this.percentageStyle)
      this.precentageText.y = (this.logo.y + this.logo.height / 2) + 15
      this.precentageText.x = (((this.app.screen.width / 2) - this.logo.width) + this.logo.width * 2) + 10

      this.addChild(this.precentageText)
      this.addChild(this.loaderHolder)
      this.addChild(this.loaderFill)
      this.addChild(this.logo)
      this.preload()
    })
  }

  /**
   * This function is called by the SceneManager so you can preload
   * your game assets.
   */
  SplashScene.prototype.preload = function () {
    this.ge.get('AssetManager').loadManifest([

      // Core
      {name: 'core_ui', type: 'spritesheet', src: 'assets/core/ui/core_ui.json'},

      // Breakout
      {name: 'level1_music', src: 'assets/breakout/sounds/music/level1.mp3'},
      {name: 'level2_music', src: 'assets/breakout/sounds/music/level2.mp3'},
      {name: 'level3_music', src: 'assets/breakout/sounds/music/level3.mp3'},
      {name: 'game_over', src: 'assets/breakout/sounds/game_over.mp3'},
      {name: 'mission_completed', src: 'assets/breakout/sounds/mission_completed.mp3'},
      {name: 'spritesheet-0', type: 'spritesheet', src: 'assets/breakout/spritesheets/spritesheet-1.json'},

      // Main
      {name: 'main_menu_music', src: 'assets/main/sounds/music/menu_music.wav'},
      {name: 'main_bg_01', src: 'assets/main/images/background/layer_01.png'},
      {name: 'main_bg_02', src: 'assets/main/images/background/layer_02.png'},
      {name: 'main_bg_03', src: 'assets/main/images/background/layer_03.png'},
      {name: 'main_bg_04', src: 'assets/main/images/background/layer_04.png'},
      {name: 'main_bg_05', src: 'assets/main/images/background/layer_05.png'},

      // // PixelShooter
      {name: 'pixelshooter_map', src: 'assets/Pixelshooter/map/map.tmx'},
      {name: 'pixelshooter_game_sprites', type: 'spritesheet', src: 'assets/Pixelshooter/spritesheets/game-0.json'},
      {
        name: 'pixelshooter_character_animations',
        type: 'json',
        src: 'assets/Pixelshooter/data/character_animations.json'
      },
    ])

    this.AssetManager.once('complete', this._preloadready, this)
    this.AssetManager.on('progress', this._preloadProgress, this)
  }

  /**
   *
   * @param {Loader} loader - The loader instance
   * @param {array} resource - The loaded resource
   * @private
   */
  SplashScene.prototype._preloadProgress = function (loader, resource) {
    this.loaderFill.drawRect((this.app.screen.width / 2) - this.logo.width, (this.logo.y + this.logo.height / 2) + 20, this.loaderHolder.width / (100 / loader.progress), 10)
    this.precentageText.text = Math.round(loader.progress) + '%'
  }

  /**
   *
   * @param {Loader} loader - The loader instance
   * @param {array} resources - The loaded resources
   * @private
   */
  SplashScene.prototype._preloadready = function (loader, resources) {
    this.SceneManager.switchTo('MainMenu')
  }

  /**
   * This update function is called every tick
   *
   * @param {number} delta - Tick delta
   */
  SplashScene.prototype.update = function (delta) {
    // required to add
  }

  return SplashScene
})
