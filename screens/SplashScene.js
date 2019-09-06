const PIXI = require('pixi')
const Scene = require('core/Scene')
const Transition = require('core/transitions/Transition')
require('pixi-tiledmap')

class SplashScene extends Scene {
  /**
   * @classdesc SplashScene
   * @exports  screens/SplashScene
   *
   * @param {object} options - Options for PIXI.Container in GameObject
   * @class
   */
  constructor (options) {
    super(options)

    this.loaderBackground = new PIXI.Graphics()
    this.loaderHolder = new PIXI.Graphics()
    this.loaderFill = new PIXI.Graphics()

    this.loaderWidth = 200
    this.loaderHeight = 30
    this.loaderPadding = 10
    this.loaderOffsetDown = 150
    this.loaderRadius = 10

    this.percentageStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 8,
      fill: '#ffffff'
    })
  }

  /**
   * This function is called by the SceneManager after preloading has finished.
   * If your Scene does not have the preload function it will call this function
   * instantly.
   */
  onStart () {

    let backgroundTexture = PIXI.Texture.fromImage('/assets/splashscreen/background.jpg')
    let background = new PIXI.Sprite(backgroundTexture)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    background.alpha = 1

    this.addChild(background)

    let logoTexture = PIXI.Texture.fromImage('/assets/main/images/engine.png')
    logoTexture.on('update', () => {



      // this.loaderBackground.lineStyle(2, 0x4a4841, 0.5)
      // this.loaderBackground.lineStyle(2, 0x4a4841, 0.5)
      this.loaderBackground.beginFill(0x000000, 0.3)
      this.loaderBackground.drawRoundedRect((this.app.screen.width / 2) - this.loaderWidth / 2,
        ((this.app.screen.width / 2) - this.loaderHeight / 2) + this.loaderOffsetDown,
        this.loaderWidth, this.loaderHeight, this.loaderRadius)

      this.loaderBackground.blendMode = PIXI.BLEND_MODES.OVERLAY

      this.loaderHolder.lineStyle(2, 0x4a4841, 0.5)
      this.loaderHolder.beginFill(0x000000, 0.3)
      this.loaderHolder.drawRoundedRect(
        ((this.app.screen.width / 2) - this.loaderWidth / 2) + this.loaderPadding / 2,
        (((this.app.screen.width / 2) - this.loaderHeight / 2) + this.loaderOffsetDown) + (this.loaderPadding / 2),
        this.loaderWidth - this.loaderPadding,
        this.loaderHeight - this.loaderPadding,
        this.loaderRadius / 2)

      // this.loaderFill.lineStyle(2, 0x000000, 0)
      // this.loaderFill.beginFill(0x457a14, 1)
      // this.loaderFill.drawRoundedRect(
      //   ((this.app.screen.width / 2) - this.loaderWidth / 2) + this.loaderPadding / 2 ,
      //   (((this.app.screen.width / 2) - this.loaderHeight / 2) + this.loaderOffsetDown) + (this.loaderPadding / 2),
      //   0,
      //   this.loaderHeight - this.loaderPadding,
      //   this.loaderRadius / 2)

      this.precentageText = new PIXI.Text('0%', this.percentageStyle)
      this.precentageText.x = this.app.screen.width / 2 - this.precentageText.width / 2
      this.precentageText.y = (((this.app.screen.width / 2) - this.loaderHeight / 2) + this.loaderOffsetDown) + (this.loaderHeight / 2) - this.precentageText.height / 2

      this.addChild(this.loaderBackground)
      this.addChild(this.loaderHolder)
      this.addChild(this.loaderFill)
      this.addChild(this.precentageText)
      //   this.addChild(this.logo)
      this.preload()
    })
  }

  /**
   * This function is called by the SceneManager so you can preload
   * your game assets.
   */
  preload () {
    this.ge.get('AssetManager').loadManifest([

      // Core
      { name: 'core_ui', type: 'spritesheet', src: '/assets/core/ui/core_ui.json' },

      // Breakout
      { name: 'level1_music', src: '/assets/breakout/sounds/music/level1.mp3' },
      { name: 'level2_music', src: '/assets/breakout/sounds/music/level2.mp3' },
      { name: 'level3_music', src: '/assets/breakout/sounds/music/level3.mp3' },
      { name: 'game_over', src: '/assets/breakout/sounds/game_over.mp3' },
      { name: 'concrete_break', src: '/assets/breakout/sounds/concrete_break.mp3' },
      { name: 'mission_completed', src: '/assets/breakout/sounds/mission_completed.mp3' },
      { name: 'spritesheet-0', type: 'spritesheet', src: '/assets/breakout/spritesheets/spritesheet-1.json' },

      // Main
      { name: 'main_menu_music', src: '/assets/main/sounds/music/menu_music.wav' },
      { name: 'main_bg_01', src: '/assets/main/images/background/layer_01.png' },
      { name: 'main_bg_02', src: '/assets/main/images/background/layer_02.png' },
      { name: 'main_bg_03', src: '/assets/main/images/background/layer_03.png' },
      { name: 'main_bg_04', src: '/assets/main/images/background/layer_04.png' },
      { name: 'main_bg_05', src: '/assets/main/images/background/layer_05.png' },

      // Camera
      { name: 'camera_scene_background', src: '/assets/camera/background.jpg' },

      // // PixelShooter
      { name: 'pixelshooter_map', src: '/assets/Pixelshooter/map/map.tmx' },
      { name: 'pixelshooter_game_sprites', type: 'spritesheet', src: '/assets/Pixelshooter/spritesheets/game-0.json' },
      {
        name: 'pixelshooter_character_animations',
        type: 'json',
        src: '/assets/Pixelshooter/data/character_animations.json'
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
  _preloadProgress (loader, resource) {
    this.loaderFill.lineStyle(1, 0x3a4a33, 0.5)
    this.loaderFill.beginFill(0x457a14, 1)
    this.loaderFill.drawRoundedRect(
      ((this.app.screen.width / 2) - this.loaderWidth / 2) + this.loaderPadding / 2 ,
      (((this.app.screen.width / 2) - this.loaderHeight / 2) + this.loaderOffsetDown) + (this.loaderPadding / 2),
      this.loaderHolder.width / (100 / loader.progress),
      this.loaderHeight - this.loaderPadding,
      this.loaderRadius / 2)

    this.precentageText.text = Math.round(loader.progress) + '%'
  }

  /**
   *
   * @param {Loader} loader - The loader instance
   * @param {array} resources - The loaded resources
   * @private
   */
  _preloadready (loader, resources) {
      this.SceneManager.switchToUsingTransaction('PixelShooter/Level1', Transition.named('ScrollFrom', { direction: 'top' }))
  }

  /**
   * This update function is called every tick
   *
   * @param {number} delta - Tick delta
   */
  update (delta) {
    // required to add
  }
}

module.exports = SplashScene
