const Transform = require('../../src/core/Transform')


describe('Core - Transform',  () => {

  it('It should be constructable by using coordinates and scale factor.', () => {
    let expected = new Transform(2, 3, 4)
    expect(expected.k).toEqual(2)
    expect(expected.x).toEqual(3)
    expect(expected.y).toEqual(4)
  })

  it('Scaling with factor 1 should return the same values.', () => {
    let transform = new Transform(1, 3, 4)
    let expected = transform.scale(1)

    expect(expected.k).toEqual(1)
    expect(expected.x).toEqual(3)
    expect(expected.y).toEqual(4)
  })

  it('Scaling should work correctly.', () => {
    let transform = new Transform(1, 3, 4)
    let expected = transform.scale(2)

    expect(expected.k).toEqual(2)
    expect(expected.x).toEqual(3)
    expect(expected.y).toEqual(4)
  })

  it('Translate should work correctly.', () => {
    let transform = new Transform(2, 3, 4)
    let expected = transform.translate(3, 4)

    expect(expected.k).toEqual(2) // 2
    expect(expected.x).toEqual(9) // 2 * 3 + 3
    expect(expected.y).toEqual(12) // 2 * 4 + 4
  })
});