const Statistics = require('gui/Statistics')
const Camera = require('core/camera/camera')
const Rect = require('core/geometry/Rect')
const Scene = require('core/Scene')
const PIXI = require('pixi')

class CameraScene extends Scene {
  
  /**
   * @classdesc CameraScene
   * @exports  screens/MainScreen
   *
   * @param {object} options - Options for PIXI.Container in GameObject
   * @class
   */
  constructor (options) {
    super(options)
    this.statistics = new Statistics()
  }

  /**
   * This function is called by the SceneManager after preloading has finished.
   * If your Scene does not have the preload function it will call this function
   * instantly.
   */
  onInit () {

    let landscapeTexture = PIXI.Texture.fromImage('camera_scene_background')
    let background = new PIXI.Sprite(landscapeTexture)

    background.anchor.x = 0
    background.anchor.y = 0

    background.position.x = 0
    background.position.y = 0

    let camera = new Camera(new Rect(20, 20, 20, 20))

    this.addChild(background)
    this.addChild(camera)

    var maskG = new PIXI.Graphics()
//maskG.lineStyle(1,0xFF0000) <- TRY TO UNCOMMENT TO SEE DIFF
    maskG.beginFill(0x555555)
    maskG.drawRect(0, 0, 100, 100)    //<- COMMENT THIS
//maskG.drawRect(300, 0, 100, 100)  <- AND TRY THIS TO SEE DIF IN Y POS
    maskG.endFill()﻿

      this.mask = maskG
  }

  /**
   * Animate the background scrolling/
   *
   * @param {number} delta
   */
  update (delta) {
    this.statistics.update(delta)
  }
}

module.exports = CameraScene