define(['pixi','core/GameObject'], function (pixi, GameObject) {
  var Statistics = function (options) {
    GameObject.call(this, options)
    this.paddingX = 10
    this.paddingY = 10

    this.setup()
  }

  extend(Statistics, GameObject)

  Statistics.prototype.setup = function () {

    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: ['#ffffff'], // gradient
    });
    this.fps = new pixi.Text('FPS: ' + this.app.ticker.FPS.toFixed(2), style)

    this.addChild(this.fps)
    this.x = this.paddingX
    this.y = this.app.screen.height - this.height - this.paddingY
  }

  Statistics.prototype.update = function (delta) {
    this.fps.text  ='FPS: ' + this.app.ticker.FPS.toFixed(2)
  }

  return Statistics
})
