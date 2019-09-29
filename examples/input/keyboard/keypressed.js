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
    create: create,
    update: update
  }
}

let game = new Prophecy.Game(config)
game.start()

function create () {

  /**
   * Enable keyboard usage.
   */
  game.input.enableKeyboardInput()

  let style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#000000'],
  })

  /**
   * This text will display the key that has been pressed.
   *
   * @type {PIXI.Text}
   */
  this.text = new PIXI.Text('Press any key on your keyboard.', style)
  this.text.x = game.world.size.halfwidth - this.text.width / 2
  this.text.y = game.world.size.halfheight - this.text.height / 2
  this.addChild(this.text)

  this.on('InputManager.keyDown', (e) => {
    console.log(e)
  })
}

function update () {
  // Empty for this example.
}
