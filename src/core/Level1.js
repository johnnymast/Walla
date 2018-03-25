define(['pixi', 'core/Scene', 'core/Level', 'core/GameEngine', 'core/objects/Brick', 'core/objects/Pad', 'core/objects/Ball'], function (pixi, Scene, Level,  GameEngine,Brick, Pad, Ball) {
  var Level1 = function (options) {
    Level.call(this, options)

    this.startY = 50;
    this.num_bricks = 11
    this.started = false

    this.objects = [];
    this.boxes = [];
  }

  extend(Level1, Level)

  Level1.prototype.onKeyPress = function(event) {
    console.log('key press')
  }

  Level1.prototype.onKeyUp = function(event) {
    console.log('key up')
  }

  Level1.prototype.onStart = function () {
    Level.prototype.onStart.call(this)

    this.listenForKeyboardInputs(37, 39)

    this.listenSingleForKeyboardInput(13, function() {
        console.log('A down')
      },
      function() {
        console.log('A up')
    })

    this.textures = {
      'red':  PIXI.Texture.fromFrame('element_red_rectangle.png'),
      'yellow': PIXI.Texture.fromFrame('element_yellow_rectangle.png'),
      'green': PIXI.Texture.fromFrame('element_green_rectangle.png'),
      'blue': PIXI.Texture.fromFrame('element_blue_rectangle.png'),
    };

    var y = this.startY

    for (let key of Object.keys(this.textures)) {
      var texture = this.textures[key];
      for (var x = 45; x < (this.num_bricks * texture.width); x+= texture.width) {
        var brick = new Brick(texture);
        brick.setPosition(x, y)

        this.objects.push(brick)
        this.addChild(brick.sprite)
      }
      y+=texture.height + 1;
    }

    this.interactive = true;


    // PIXI.sound.play('level1_music');
    // PIXI.sound.play('game_over');

    this.resources = this.ge.get('StateManager').get('resources')
    this.pad = new Pad(PIXI.Texture.fromFrame('paddleBlu.png'))
    this.pad.setPosition(this.app.screen.width / 2, this.app.screen.height - 100)

    var tx =  PIXI.Texture.fromFrame('ballBlue.png')
    this.ball = new Ball(tx);
    this.ball.setPosition(this.pad.sprite.x,  this.pad.sprite.y - tx.height- 300)

    this.objects.push(this.ball);
    this.objects.push(this.pad)

    this.addChild(this.ball.sprite)
    this.addChild(this.pad.sprite)

    this.PhysicsManager.run();
  }

  Level1.prototype.onMouseMove = function(event) {
    let coords = event.data.global;
    if (coords.x + this.pad._width > this.app.screen.width) {
      coords.x = this.app.screen.width - this.pad._width
    } else if (coords.x <= 0) {
      coords.x = 0
    }
    this.pad.setPosition(coords.x, this.pad.sprite.y);
  }

  Level1.prototype.onPointerDown = function(event) {
    this.PhysicsManager.applyForce(this.ball.body, this.ball.texture.width, this.ball.texture.height, 0 ,-0.05);
    if (this.started == false) {
      for (var object of this.objects) {
        if (object instanceof Ball) {
          object.isStatic = false
        }
      }
      this.started = true
    }
  }

  Level1.prototype.update = function (delta) {
    // this.PhysicsManager.update(delta);

    for (var object of this.objects) {
      if (object instanceof Ball) {
        if (object.isStatic == true) {
          object.x = this.pad.x;
        }
      }
      object.update(delta)
    }
  }

  return Level1
})
