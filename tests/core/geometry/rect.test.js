const Rect = require('../../../src/core/geometry/rect')

describe('Geometry - Rect', function () {

  it('Constructing values parameters should set the values.', () => {
    let r = new Rect(10, 20, 200, 300)
    expect(r.x).toEqual(10)
    expect(r.y).toEqual(20)
    expect(r.width).toEqual(200)
    expect(r.height).toEqual(300)
  })

  it('clone() should return a new cloned version of an existing Rect.', () => {
    let r = new Rect(5, 4, 100, 200)
    let theclone = r.clone()
    expect(theclone).toEqual({
      x: 5,
      y: 4,
      width: 100,
      height: 200,
    })
  })

  it('set() without y should make y equal to passed x.', () => {
    let r = new Rect()
    r.set(5,  10, 200)
    expect(r.x).toEqual(5)
    expect(r.y).toEqual(10)
    expect(r.width).toEqual(200)
    expect(r.height).toEqual(200)
  })
})

describe('Geometry - Rect Element-wise', function () {

  it('equals() should return true if 2 points are equal.', () => {
    let r1 = new Rect(20, 20, 204, 208)
    let r2 = new Rect(20, 20, 204, 208)
    expect(r1.equals(r2)).toBeTruthy()
  })

  it('equals() should not return false if 2 points are not equal.', () => {
    let r1 = new Rect(20, 20, 204, 208)
    let r2 = new Rect(20, 20, 204, 204)
    expect(r1.equals(r2)).toBeFalsy()
  })

  it('copy() should copy the values from one point to an other.', () => {
    let r1 = new Rect(20, 20, 204, 208)
    let r2 = new Rect(20, 20, 204, 204)

    r2.copy(r1)
    expect(r2).toEqual({
      x: 20,
      y: 20,
      width: 204,
      height: 208
    })
  })
})