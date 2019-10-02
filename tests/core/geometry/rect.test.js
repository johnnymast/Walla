/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const Prophecy = require('prophecyjs')

describe('Geometry - Prophecy.Geometry.Rect', function () {

  it('Constructing values parameters should set the values.', () => {
    let r = new Prophecy.Geometry.Rect(10, 20, 200, 300)
    expect(r.x).toEqual(10)
    expect(r.y).toEqual(20)
    expect(r.width).toEqual(200)
    expect(r.height).toEqual(300)
  })

  it('clone() should return a new cloned version of an existing Prophecy.Geometry.Rect.', () => {
    let r = new Prophecy.Geometry.Rect(5, 4, 100, 200)
    let theclone = r.clone()
    expect(theclone).toEqual({
      x: 5,
      y: 4,
      width: 100,
      height: 200,
    })
  })

  it('set() without y should make y equal to passed x.', () => {
    let r = new Prophecy.Geometry.Rect()
    r.set(5, 10, 200)
    expect(r.x).toEqual(5)
    expect(r.y).toEqual(10)
    expect(r.width).toEqual(200)
    expect(r.height).toEqual(200)
  })

  it('halfwidth() Should return the half of the rect with.', () => {
    let r = new Prophecy.Geometry.Rect(0, 0, 100, 200)
    let expected = 100 / 2
    expect(expected).toEqual(r.halfwidth)
  })

  it('halfheight() Should return the half of the rect with.', function () {
    let r = new Prophecy.Geometry.Rect(0, 0, 100, 200)
    let expected = 200 / 2
    expect(expected).toEqual(r.halfheight)
  })

  it('center() Should return a Prophecy.Geometry.Point width the center of the Rect.', function () {
    let r = new Prophecy.Geometry.Rect(10, 20, 100, 200)
    let expected = new Prophecy.Geometry.Point(10 + 100 / 2, 20 + 200 / 2)
    let actual = r.center
    expect(expected).toEqual(actual)
  })

  it('centerx() Should return the center of the rect on the x axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 20, 100, 200)
    let expected = 10 + 100 / 2
    expect(expected).toEqual(r.centerx)
  })

  it('centery() Should return the center of the rect on the y axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 20, 100, 200)
    let expected = 20 + 200 / 2
    expect(expected).toEqual(r.centery)
  })

  it('inside(x,y) should return true if inside the Prophecy.Geometry.Rect.', function () {
    let r = new Prophecy.Geometry.Rect(10, 10, 100, 100)
    expect(r.inside(15, 20)).toBeTruthy()
  })

  it('inside(x,y) should return false if outside the Prophecy.Geometry.Rect on x axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 10, 100, 100)
    expect(r.inside(500, 20)).toBeFalsy()
  })

  it('inside(x,y) should return false if outside the Prophecy.Geometry.Rect on y axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 10, 100, 100)
    expect(r.inside(15, 500)).toBeFalsy()
  })

  it('outside(x,y) should return true if outside the Prophecy.Geometry.Rect on the x axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 10, 100, 100)
    expect(r.outside(10 + 105, 10)).toBeTruthy()
  })

  it('outside(x,y) should return true if outside the Prophecy.Geometry.Rect on the y axis.', function () {
    let r = new Prophecy.Geometry.Rect(10, 10, 100, 100)
    expect(r.outside(10, 10 + 105)).toBeTruthy()
  })
})

describe('Geometry - Prophecy.Geometry.Rect Element-wise', function () {

  it('equals() should return true if 2 points are equal.', () => {
    let r1 = new Prophecy.Geometry.Rect(20, 20, 204, 208)
    let r2 = new Prophecy.Geometry.Rect(20, 20, 204, 208)
    expect(r1.equals(r2)).toBeTruthy()
  })

  it('equals() should not return false if 2 points are not equal.', () => {
    let r1 = new Prophecy.Geometry.Rect(20, 20, 204, 208)
    let r2 = new Prophecy.Geometry.Rect(20, 20, 204, 204)
    expect(r1.equals(r2)).toBeFalsy()
  })

  it('copy() should copy the values from one point to an other.', () => {
    let r1 = new Prophecy.Geometry.Rect(20, 20, 204, 208)
    let r2 = new Prophecy.Geometry.Rect(20, 20, 204, 204)

    r2.copy(r1)
    expect(r2).toEqual({
      x: 20,
      y: 20,
      width: 204,
      height: 208
    })
  })
})