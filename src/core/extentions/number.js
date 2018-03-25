
Number.prototype.normalize = function(min, max) {
  return (this - min) / (max - min)
}