require('../../../src/core/prototypes')

describe('Prototypes - Number', function () {
  it('constrain() should return its own value if no arguments are passed', () => {
    let number = 10
    let expected = number.constrain()
    expect(expected).toEqual(10)
  })

  it('constrain() should return 5 if number passed was 4 and min was 5 and max was 10', () => {
    let number = 4
    let expected = number.constrain(5, 10)
    expect(expected).toEqual(5)
  })

  it('constrain() should return 12 if number passed was 11 and min was 5 and max was 12', () => {
    let number = 12
    let expected = number.constrain(5 , 12)
    expect(expected).toEqual(12)
  })

  it('constrain() should return its own number if it is in the range', () => {
    let number = 11
    let expected = number.constrain(10 , 20)
    expect(expected).toEqual(11)
  })
})