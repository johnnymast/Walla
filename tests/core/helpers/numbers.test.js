require('../../../src/core/helpers')

describe('Number Helpers - rand', function () {
  it('rand() should return a number in a given range', () => {
    let number = rand(1, 10);
    expect((number >= 1 && number <= 10)).toBeTruthy()
  });
})


