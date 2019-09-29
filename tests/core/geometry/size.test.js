const Prophecy = require('prophecyjs')

describe('Geometry - Prophecy.Geometry.Size', function () {

  it('Constructing values parameters should set the values.', () => {
    let r = new Prophecy.Geometry.Size(100, 200)
    expect(r.width).toEqual(100)
    expect(r.height).toEqual(200)
  })

  it('clone() should return a new cloned version of an existing Prophecy.Geometry.Size.', () => {
    let r = new Prophecy.Geometry.Size(100, 200)
    let theclone = r.clone()
    expect(theclone).toEqual({
      width: 100,
      height: 200,
    })
  })

  it('halfwidth() should return the half width of the size', () => {
    let size = new Prophecy.Geometry.Size(100, 200)
    let expected = 50

    expect(size.halfwidth).toEqual(expected)
  })

  it('halfheight() should return the half width of the size', () => {
    let size = new Prophecy.Geometry.Size(100, 200)
    let expected = 100

    expect(size.halfheight).toEqual(expected)
  })
})

describe('Geometry - Prophecy.Geometry.Size Element-wise', function () {

  it('equals() should return true if 2 sizes are equal.', () => {
    let r1 = new Prophecy.Geometry.Size(100, 200)
    let r2 = new Prophecy.Geometry.Size(100, 200)
    expect(r1.equals(r2)).toBeTruthy()
  })

  it('equals() should return false if 2 sizes are not equal.', () => {
    let r1 = new Prophecy.Geometry.Size(100, 200)
    let r2 = new Prophecy.Geometry.Size(200, 300)
    expect(r1.equals(r2)).toBeFalsy()
  })


  it('copy() should copy the values from one point to an other.', () => {
    let r1 = new Prophecy.Geometry.Size(204, 208)
    let r2 = new Prophecy.Geometry.Size(100, 200)

    r2.copy(r1)
    expect(r2).toEqual({
      width: 204,
      height: 208
    })
  })
})