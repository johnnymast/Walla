const Prophecy = require('prophecyjs')

// const Prophecy.Geometry.Point = require('../../../src/core/geometry/Prophecy.Geometry.Point')

describe('Geometry - Prophecy.Geometry.Point', function () {

  it('Constructing values parameters should set the values.', () => {
    let p = new Prophecy.Geometry.Point(10, 20)
    expect(p.x).toEqual(10)
    expect(p.y).toEqual(20)
  })

  it('clone() should return a new cloned version of an existing Prophecy.Geometry.Point.', () => {
    let p = new Prophecy.Geometry.Point(10, 20)
    let theclone = p.clone()
    expect(theclone).toEqual({
      x: 10,
      y: 20,
    })
  })

  it('set() without y should make y equal to passed x.', () => {
    let p = new Prophecy.Geometry.Point()
    p.set(300)
    expect(p.x).toEqual(300)
    expect(p.y).toEqual(300)

  })
})

describe('Geometry - Prophecy.Geometry.Point Element-wise', function () {

  it('equals() should return true if 2 Prophecy.Geometry.Points are equal.', () => {
    let p1 = new Prophecy.Geometry.Point(20, 20)
    let p2 = new Prophecy.Geometry.Point(20, 20)
    expect(p1.equals(p2)).toBeTruthy()
  })

  it('equals() should not return false if 2 Prophecy.Geometry.Points are not equal.', () => {
    let p1 = new Prophecy.Geometry.Point(20, 20)
    let p2 = new Prophecy.Geometry.Point(20, 40)
    expect(p1.equals(p2)).toBeFalsy()
  })

  it('copy() should copy the values from one Prophecy.Geometry.Point to an other.', () => {
    let p1 = new Prophecy.Geometry.Point(20, 20)
    let p2 = new Prophecy.Geometry.Point(20, 40)

    p2.copy(p1)
    expect(p2).toEqual({
      x: 20,
      y: 20,
    })
  })
})