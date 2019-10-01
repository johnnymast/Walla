/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

let config = {
  width: 800,
  height: 600,
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
  let movable_width = 1920
  let movable_height = 1920
  // let camera_width = 300
  // let camera_height = 300

  /**
   * Set the movable area of the game.
   */
  game.world.setBounds(0, 0, movable_width, movable_height)

  let tilingSprite = game.add.tilingSprite(PIXI.Texture.fromFrame('debug_bg_grid'), movable_width, movable_height)
  let dude = game.add.sprite(PIXI.Texture.fromFrame('phaser_dude'))

  dude.x = 800 /2 - dude.width / 2
  dude.y = 600 /2 - dude.height / 2

  //dude.anchor.set(0.5)

  game.world.camera.follow(dude, Prophecy.Camera.FOLLOW_LOCKON)


  // this.camera = camera
  this.dude = dude

  this.addChild(tilingSprite)
  this.addChild(dude)
  this.addChild(game.world.camera)
  // this.addChild(camera)

  game.input.enableKeyboardInput()
  game.input.mapInput([game.input.keys.ArrowLeft, 'a'], ['left'])
  game.input.mapInput([game.input.keys.ArrowRight, 'd'], ['right'])
  game.input.mapInput([game.input.keys.ArrowUp, 'w'], ['up'])
  game.input.mapInput([game.input.keys.ArrowDown, 's'], ['down'])
}

function validate(x, y, width, height) {

  if (x < 1 || x > game.world.bounds.width - width) {
    return false
  }

  if (y < 1 || y > game.world.bounds.height - height) {
    return false
  }
  return true
}
function update (delta) {
  // this.camera.update(delta)
  game.world.camera.update(delta)

  let speed = 30
  let amt = 0.5

  let pos = {
    x: this.dude.x,
    y: this.dude.y
  }

  if (game.input.isDown('up')) {
    pos.y = lerp(this.dude.y, this.dude.y - speed, amt)

    if (validate(pos.x, pos.y, this.dude.width, this.dude.height)) {
      this.dude.y = pos.y
    }
  } else if (game.input.isDown('down')) {
    pos.y = lerp(this.dude.y, this.dude.y + speed, amt)

    if (validate(pos.x, pos.y, this.dude.width, this.dude.height)) {
      this.dude.y = pos.y
    }
  }

  if (game.input.isDown('left')) {
    pos.x = lerp(this.dude.x, this.dude.x - speed, amt)
    if (validate(pos.x, pos.y, this.dude.width, this.dude.height)) {
      this.dude.x = pos.x
    }
  } else if (game.input.isDown('right')) {
    pos.x = lerp(this.dude.x, this.dude.x + speed, amt)
    if (validate(pos.x, pos.y, this.dude.width, this.dude.height)) {
      this.dude.x = pos.x
    }
  }
}