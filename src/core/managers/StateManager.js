define([], function () {
  var StateManager = function () {
    this.container = []
  }

  StateManager.prototype.get = function (key) {
    return this.container[key]
  }

  StateManager.prototype.set = function (key, val) {
    this.container[key] = val
  }

  StateManager.prototype.unset = function (key) {
    delete this.container[key]
  }

  return StateManager
})
