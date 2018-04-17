// https://github.com/SonarSystems/Cocos2d-JS-v3-Tutorial-57---Adding-A-Menu-Image-Item/blob/master/src/app.js
define(['pixi', 'screens/Circles/GameLevel', 'core/GameEngine', 'core/../../objects/Breakout/Brick', 'core/../../objects/Breakout/Pad', 'core/../../objects/Breakout/Ball'], function (pixi, GameLevel, GameEngine, Brick, Pad, Ball) {
  var Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})


    this.setDisplayStats(true)

    this.historyX = [];
    this.historyY = [];
    this.ropeSize = 100;
  }

  extend(Level1, GameLevel)

  Level1.prototype.onKeyPress = function (event) {

    console.log('key press ' + event.key)
  }

  Level1.prototype.onKeyUp = function (event) {
    console.log('key up')
  }

  Level1.prototype.onStart = function () {
    GameLevel.prototype.onStart.call(this)



  }

  Level1.prototype.onMouseMove = function (event) {

  }

  Level1.prototype.onPointerDown = function (event) {

  }

  Level1.prototype.update = function (delta) {
    GameLevel.prototype.update.call(this, delta)

    //Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
    //When implemeting this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
    var mouseposition = app.renderer.plugins.interaction.mouse.global;

    //Update the mouse values to history
    this.historyX.pop();
    this.historyX.unshift(mouseposition.x);
    this.historyY.pop();
    this.historyY.unshift(mouseposition.y);

    //Update the points to correspond with history.
    for( var i = 0; i < this.ropeSize; i++)
    {
      var p = points[i];

      //Smooth the curve with cubic interpolation to prevent sharp edges.
      var ix = cubicInterpolation( historyX, i / this.ropeSize * historySize);
      var iy = cubicInterpolation( historyY, i / this.ropeSize * historySize);

      p.x = ix;
      p.y = iy;

    }
  }

  return Level1
})
