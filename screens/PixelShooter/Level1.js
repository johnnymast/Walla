// https://github.com/riebel/pixi-tiledmap
const DIRECTIONS = require('objects/Pixelshooter/Options').DIRECTIONS

define(['screens/PixelShooter/GameLevel', 'core/GameEngine', 'objects/Pixelshooter/Character', 'core/math/matrix'], function (GameLevel, GameEngine, Character, Matrix) {
  var Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})

    this.interactive = true
    // this.buttonMode = false

    this.listenForKeyboardInputs('w', 'a', 's', 'd')
    this.map = new PIXI.extras.TiledMap('pixelshooter_map')
    this.character = new Character(1)
    this.character.anchor = 0.5

    this.enemies = []

    this.downkey = null

  }

  extend(Level1, GameLevel)

  Level1.prototype.onMouseMove = function (event) {

    function calculateAngle (mx, my, px, py) {
      var self = this
      var dist_Y = my - py
      var dist_X = mx - px
      var angle = Math.atan2(dist_Y, dist_X)
      //var degrees = angle * 180/ Math.PI;
      // radians = Math.atan2(y2-y1,x2-x1);
      return angle
    }

    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
    let mousePos = event.data.global
    let angle = calculateAngle(mousePos.x, mousePos.y, this.character.x, this.character.y)
    let degrees = Math.floor(angle * 90 / Math.PI)
    // this.character.rotation = angle

    // for(var b=bullets.length-1;b>=0;b--){
    //   bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    //   bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
    // }

    let test = degrees.denormalize(0, 80)

    // console.log('denormalize: ', test)
    let direction_mapping = [

      {mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_LEFT},
      {mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_RIGHT},
      {mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_RIGHT},
      {mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_LEFT},
    ]

    let direction = null

    for (map of direction_mapping) {
      let mx = (mousePos.x > this.character.position.x) ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT
      let my = (mousePos.y > this.character.position.y) ? DIRECTIONS.DOWN : DIRECTIONS.UP

      /*
       * Detect diagonal directions
       */
      if (map.mouseX === mx && map.mouseY === my) {
        direction = map.direction
      }

      if (direction)
        break
    }

    // w: 87
    if (this.downkey === 87)
      direction = DIRECTIONS.UP

    // s: 83
    if (this.downkey == 83)
      direction = DIRECTIONS.DOWN

    // a: 65
    if (this.downkey === 65)
      direction = DIRECTIONS.LEFT

    // d: 68
    if (this.downkey === 68)
      direction = DIRECTIONS.RIGHT

    // console.log('Detected', direction, 'at')
    this.character.setDirection(direction)

    // console.log(degrees)

// else if (degrees > 45 && degrees <= 90) {
//   this.character.setDirection(DIRECTIONS.DIAGDOWN_RIGHT)
// }  else if (degrees > 90 && degrees <= 135) {
//   this.character.setDirection(DIRECTIONS.DOWN);
// } else if (degrees > 135 && degrees <= 180) {
//   this.character.setDirection(DIRECTIONS.DIAGDOWN_LEFT);
// }

  }

  Level1.prototype.onKeyDown = function (event) {
    this.downkey = event.key
  }

  Level1.prototype.onKeyUp = function (event) {
    this.downkey = null
  }

  Level1.prototype.onStart = function () {
    GameLevel.prototype.onStart.call(this)
    this.addCursor('attack', '1crosshair')

    /**
     * Add the map to the screen
     */
    this.addChild(this.map)

    this.character.position.set(430, 443)
    this.character.setDirection(DIRECTIONS.RIGHT)

    /**
     * Add the character to the screen
     */
    this.addChild(this.character)

    /**
     * Show the FPS counterO
     */
    this.setDisplayStats(true)

    /**
     * Set the attack cursor
     */
    this.setCursor('attack')
  }

  Level1.prototype.spawnEnamy = function () {

  }

  Level1.prototype.updateGameLogic = function (delta) {

    /**
     * Moving the character.
     */
    if (this.downkey === 'a') {
      this.character.position.x -= 5
    } else if (this.downkey === 'd') {
      this.character.position.x += 5
    } else if (this.downkey === 'w') {
      this.character.position.y -= 5
    } else if (this.downkey === 's') {
      this.character.position.y += 5
    }

    this.character.update(delta)
  }

  Level1.prototype.update = function (delta) {
    GameLevel.prototype.update.call(this, delta)
    this.updateGameLogic(delta)

  }

  return Level1
})
