require('../../../src/core/extensions')

describe('Extensions - numbers', function () {

  it('normalize() should normalize a number to a given range', () => {
    let number = 50
    let result = number.normalize(0, 10)

    expect(result).toBe(5)
  })

  it('denormalize() should return a normalized value to its real value', () => {
    let number = 50
    let normalized = number.normalize(0, 10)
    let result = normalized.denormalize(0, 10)

    expect(result).toBe(50)
  })
})