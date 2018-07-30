require('../../../src/core/helpers')

describe('Helpers - map2', function () {
  it('map2() should remap a given value in a range to an other value in an other range', () => {
    let number = map2([0, 100], [0, 10], 50);
    expect(number).toBe(5)
  });

  it('map2() should throw an error if the from parameter is no array', function() {
    expect(() => {
      let number = map2(1, 10, 5);
    }).toThrow('map2: Type error, parameter from should be an array with 2 values.')
  });

  it('map2() should throw an error if the from only has one value', function() {
    expect(() => {
      let number = map2([1], 2, 10);
    }).toThrow('map2: Type error, parameter from should be an array with 2 values.')
  });

  it('map2() should throw an error if the to parameter is no array', function() {
    expect(() => {
      let number = map2([0, 1], 10, 5);
    }).toThrow('map2: Type error, parameter to should be an array with 2 values.')
  });

  it('map2() should throw an error if the to only has one value', function() {
    expect(() => {
      let number = map2([1,2], [2], 10);
    }).toThrow('map2: Type error, parameter to should be an array with 2 values.')
  });
})