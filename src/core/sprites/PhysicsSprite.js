define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
    var PhysicsSprite = function (texture) {
      GameObject.call(this)
  
      this.texture = texture
      this.sprite = new pixi.Sprite(texture);
      this.body = null
  
      this._x = 0
      this._y = 0
  
      this._width = this.texture.width
      this._height = this.texture.height
  
      this.setupBody();
    }
  
    extend(PhysicsSprite, GameObject)

    PhysicsSprite.prototype.setPosition = function(x = 0, y) {

      x = x || this._x
      y = y || this._y 

      this.sprite.x =  x
      this.sprite.y =  y
    
      this.PhysicsManager.setPosition(this.body, x, y, this._width, this._height)
      return this
    }
     
    PhysicsSprite.prototype.setupBody = function() {
      /**
       * You can overwrite this function if you need to add your
       * own body shape and properties.
       */
      var options = {
          friction: 0,
          restitution: 0.95,
      }
      this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options);
      this.PhysicsManager.add(this.body)
    }

    return PhysicsSprite
})