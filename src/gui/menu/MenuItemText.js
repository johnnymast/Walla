define(['pixi', 'core/GameObject', 'gui/menu/MenuItem'], function (pixi, GameObject, MenuItem) {
  var MenuItemText = function (text, callback) {
    MenuItem.call(this)

    var style = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff00'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    })

    var richText = new pixi.Text(text, style)
    // richText.x = (this.app.screen.width / 2) - richText.width / 2
    // richText.y = 120 /* 180 is padding spade */

    this.addChild(richText);
  }

  extend(MenuItemText, MenuItem)

  MenuItemText.prototype.selected = function(event) {
    console.log('clicked')
    this.SceneManager.switchTo('Breakout/Level1')
  }


  return MenuItemText
});