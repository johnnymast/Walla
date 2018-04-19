Number.prototype.normalize = function (min, max) {
  return (max - min)/this
}

Number.prototype.denormalize = function () {
  return this * (this - min) / (max - min)
}