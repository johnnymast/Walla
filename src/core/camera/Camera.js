define(['pixi', 'core/geometry/rect'], function (PIXI, Rect) {
  let Camera = function (frame) {
    PIXI.Container.call(this, {backgroundColor: 0x1099bb})

    if (!(frame instanceof Rect)) {
      throw new Error('Argument error: Did not pass a Rect')
    }

    this.mask = new PIXI.Graphics();
    this.mask.beginFill();
    this.mask.drawRect(0, 0, frame.width, frame.height);
    this.mask.endFill();

    this.x = frame.x
    this.y = frame.y


    //this.mask = this.maskHolder

    //this.addChild(this.maskHolder)
    console.log('test', frame instanceof Rect)
  }

  extend(Camera, PIXI.Container)

  Camera.prototype.zoom = function(level = 0) {

  }

  return Camera
})
