define(['pixi', 'core/GameEngine'], function (pixi, GameEngine) {
  var SceneManager = function (scene = '') {
    this.scenes = []
    this.currentScene = null
    this.app = GameEngine.get().get('App')

    if (scene.length > 0) {
      this.add(scene)
      this.switchTo(scene)
    }
  }

  SceneManager.prototype.add = function (scene, options) {
    if (!this.scenes[scene]) {
      var _scene = require('core/' + scene)
      this.scenes[scene] = new _scene(options)
    }
    return this
  }

  SceneManager.prototype.preloadScene = function (scene) {
    var thatScene = this.getScene(scene)

    if (thatScene) {
      thatScene.preload()
    }
    return this
  }

  SceneManager.prototype.getScene = function (scene) {
    return this.scenes[scene]
  }

  SceneManager.prototype.switchTo = function (scene) {
    // switch to next scene
    if (!this.getScene(scene)) {
      if (typeof scene === 'string') {
        this.add(scene)
      }
    }
    
    let nextScene = this.getScene(scene)

    if (nextScene) {
      if (this.currentScene) {
        this.app.stage.removeChild(this.currentScene)
      }

      nextScene.start()

      this.currentScene = nextScene
      this.app.stage.addChild(this.currentScene)
    }
  }

  return SceneManager
})
