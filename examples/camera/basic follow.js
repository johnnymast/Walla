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
  let tilingSprite = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame('debug_bg_grid'), this.app.screen.width, this.app.screen.height)
  let camera = new Prophecy.Camera(new Prophecy.Geometry.Rect(20, 20, 20, 20))
  let dude = new PIXI.Sprite(PIXI.Texture.fromFrame('phaser_dude'))

  dude.x = this.app.screen.width / 2
  dude.y = this.app.screen.height / 2
  dude.anchor.set(0.5)

  camera.follow(dude, camera.FOLLOW_LOCKON)

  this.camera = camera
  this.dude = dude

  this.addChild(tilingSprite)
  this.addChild(dude)
  this.addChild(camera)
  this.interactive = true

  this.onKeyDown = (event) => {
    let speed = 30
    let amt = 0.5
    if (this.InputManager.isDown('up')) {
      this.dude.y = lerp(this.dude.y, this.dude.y - speed, amt)
    } else if (this.InputManager.isDown('down')) {
      this.dude.y = lerp(this.dude.y, this.dude.y + speed, amt)
    }

    if (this.InputManager.isDown('left')) {
      this.dude.x = lerp(this.dude.x, this.dude.x - speed, amt)
    } else if (this.InputManager.isDown('right')) {
      this.dude.x = lerp(this.dude.x, this.dude.x + speed, amt)
    }
  }

  this.InputManager.on('InputManager.keyDown', this.onKeyDown.bind(this))

  this.InputManager.mapInput([this.InputManager.keys.ArrowLeft, 'a'], ['left'])
  this.InputManager.mapInput([this.InputManager.keys.ArrowRight, 'd'], ['right'])
  this.InputManager.mapInput([this.InputManager.keys.ArrowUp, 'w'], ['up'])
  this.InputManager.mapInput([this.InputManager.keys.ArrowDown, 's'], ['down'])
}

function update (delta) {
  this.camera.update(delta)
  // console.log('update')
}