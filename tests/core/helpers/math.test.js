require('../../../src/core/helpers')

describe('Math Helpers - constrain', function () {
  it('constrain() should return 0 if no arguments was passed', () => {
    let expected = constrain()
    expect(expected).toEqual(0)
  })

  it('constrain() should return 5 if number passed was 4 and min was 5 and max was 10', () => {
    let expected = constrain(4, 5 , 10)
    expect(expected).toEqual(5)
  })

  it('constrain() should return 10 if number passed was 11 and min was 5 and max was 10', () => {
    let expected = constrain(11, 5 , 10)
    expect(expected).toEqual(10)
  })

  it('constrain() should return its own number if it is in the range', () => {
    let expected = constrain(11, 10 , 20)
    expect(expected).toEqual(11)
  })

  it('lerp() Should calculate its values correctly', () => {
    let expected = lerp(0, 100 , 0.5)
    expect(expected).toEqual(50)
  })
})


