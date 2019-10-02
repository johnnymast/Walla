/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

let config = {
  backgroundColor: 0x1099bb,
  transparent: true,
}

//https://phaser.io/examples/v2/camera/basic-follow#download
//https://github.com/photonstorm/phaser-ce/blob/master/src/core/Camera.js

let game = new Prophecy.Game(config)

game.createScene('basic_follow', {
  init () {
    this.properties = {
      world: {
        width: 1920,
        height: 1080
      },
      lerp: {
        distance: 0.5,
        movesize: 30
      }
    }
  },
  preload () {
    game.loader.loadManifest([
      { name: 'debug_bg_grid', src: '/assets/examples/backgrounds/debug-grid-1920x1920.png' },
      { name: 'phaser_dude', src: '/assets/examples/sprites/phaser-dude.png' },
    ])
  },
  create () {

    /**
     * Set the movable area of the game.
     */
    this.game.world.setBounds(0, 0, this.properties.world.width, this.properties.world.height)

    let background = game.add.tilingSprite('debug_bg_grid', this.game.world.bounds.width, this.game.world.bounds.height)
    let dude = game.add.sprite('phaser_dude', game.world.viewport.centerx, game.world.viewport.centery)

    this.dude = dude

    this.addChild(background)
    this.addChild(dude)
    this.addChild(game.world.camera)

    this.input
      .enableKeyboard()
      .mapInput([this.input.keys.ArrowLeft, 'a'], ['left'])
      .mapInput([this.input.keys.ArrowRight, 'd'], ['right'])
      .mapInput([this.input.keys.ArrowUp, 'w'], ['up'])
      .mapInput([this.input.keys.ArrowDown, 's'], ['down'])

    this.game.world.camera.follow(this.dude, Prophecy.Camera.FOLLOW_LOCKON)
  },
  /**
   * Update the scene.
   * @param {Number} delta - The time difference since last update.
   */
  update (delta) {

    let bounds = this.game.world.bounds

    let pos = { x: this.dude.x, y: this.dude.y }

    if (this.input.isDown('up')) {
      pos.y = lerp(this.dude.y, this.dude.y - this.properties.lerp.movesize, this.properties.lerp.distance)

      if (bounds.inside(pos.x, pos.y)) {
        this.dude.y = pos.y
      }
    }

    if (this.input.isDown('down')) {
      pos.y = lerp(this.dude.y, this.dude.y + this.properties.lerp.movesize, this.properties.lerp.distance)

      if (bounds.inside(pos.x, pos.y)) {
        this.dude.y = pos.y
      }
    }

    if (this.input.isDown('left')) {
      pos.x = lerp(this.dude.x, this.dude.x - this.properties.lerp.movesize, this.properties.lerp.distance)
      if (bounds.inside(pos.x, pos.y)) {
        this.dude.x = pos.x
      }
    }

    if (this.input.isDown('right')) {
      pos.x = lerp(this.dude.x, this.dude.x + this.properties.lerp.movesize, this.properties.lerp.distance)
      if (bounds.inside(pos.x, pos.y)) {
        this.dude.x = pos.x
      }
    }
  }
})

game.start('basic_follow')
