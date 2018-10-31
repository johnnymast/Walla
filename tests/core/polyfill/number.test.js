require('../../../output/build')
// require ('../../../src/main');

//const add = require('./add');
describe('normalize', () => {
  it('It should normalize 10 as 0.1 from 0 to 1', () => {
    var number = 10
    expect(number.normalize(0, 1)).toBe(0.1)
  })

  it('It should normalize 10 as 10 from 0 to 100', () => {
    var number = 10
    expect(number.normalize(0, 100)).toBe(10)
  })
})
