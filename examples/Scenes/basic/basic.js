/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */


let config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  transparent: true
}

let game = new Prophecy.Game(config)

game.createScene('Main', {
  create () {
    console.log('created')
  },
  update () {
    console.log('update')
  }
})

game.start('Main')