/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

require('prophecyjs')

describe('Number Helpers - rand', function () {
  it('rand() should return a number in a given range', () => {
    let number = rand(1, 10)
    expect((number >= 1 && number <= 10)).toBeTruthy()
  })
})