const Rect = require('core/geometry/Rect')

class Camera extends PIXI.Container {
  constructor (frame) {
    super({ backgroundColor: 0x1099bb })

    if (!frame instanceof Rect) {
      throw new Error('Argument error: Did not pass a Rect')
    }

    console.log(frame)
    this._mask = new PIXI.Graphics()
    this._mask.beginFill()
    this._mask.drawRect(0, 0, frame.width, frame.height)
    this._mask.endFill()



    this.x = frame.x
    this.y = frame.y

    // this.mask = maskG


    console.log('test', frame instanceof Rect)
  }

  zoom (level = 0) {

  }
}

module.exports = Camera