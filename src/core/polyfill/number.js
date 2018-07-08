Number.prototype.normalize = function (min, max) {
  return (max - min)/this
}

Number.prototype.denormalize = function (min, max) {
  return this * (this - min) / (max - min)
}