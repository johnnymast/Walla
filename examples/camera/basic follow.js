/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

let config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  transparent: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

//https://phaser.io/examples/v2/camera/basic-follow#download
//https://github.com/photonstorm/phaser-ce/blob/master/src/core/Camera.js

// TODO: Aan input
//

let game = new Prophecy.Game(config)
game.start()

/**
 * Preload game asset.
 */
function preload () {
  game.loader.loadManifest([
    { name: 'debug_bg_grid', src: '/assets/examples/backgrounds/debug-grid-1920x1920.png' },
    { name: 'phaser_dude', src: '/assets/examples/sprites/phaser-dude.png' },
  ])
}

/**
 * Setup the scene
 */
function create () {
  let tilingSprite = game.add.tilingSprite(PIXI.Texture.fromFrame('debug_bg_grid'), this.app.screen.width, this.app.screen.height)
  let camera = new Prophecy.Camera(new Prophecy.Geometry.Rect(20, 20, 20, 20))
  let dude = game.add.sprite(PIXI.Texture.fromFrame('phaser_dude'))

  dude.x = game.world.size.halfwidth - dude.width / 2
  dude.y = game.world.size.halfheight - dude.height / 2

  dude.anchor.set(0.5)

  camera.follow(dude, camera.FOLLOW_LOCKON)

  this.camera = camera
  this.dude = dude

  this.addChild(tilingSprite)
  this.addChild(dude)
  this.addChild(camera)

  game.input.enableKeyboardInput()
  game.input.mapInput([game.input.keys.ArrowLeft, 'a'], ['left'])
  game.input.mapInput([game.input.keys.ArrowRight, 'd'], ['right'])
  game.input.mapInput([game.input.keys.ArrowUp, 'w'], ['up'])
  game.input.mapInput([game.input.keys.ArrowDown, 's'], ['down'])
}

function update (delta) {
  this.camera.update(delta)

  let speed = 30
  let amt = 0.5

  if (game.input.isDown('up')) {
    this.dude.y = lerp(this.dude.y, this.dude.y - speed, amt)
  } else if (game.input.isDown('down')) {
    this.dude.y = lerp(this.dude.y, this.dude.y + speed, amt)
  }

  if (game.input.isDown('left')) {
    this.dude.x = lerp(this.dude.x, this.dude.x - speed, amt)
  } else if (game.input.isDown('right')) {
    this.dude.x = lerp(this.dude.x, this.dude.x + speed, amt)
  }
}