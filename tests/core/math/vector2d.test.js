const Vector2d = require('../../../src/core/math/vector2d')

describe('Math - Vector2d', function () {

  it('Constructing should create a Vector2d the correct values.', () => {
    let v = new Vector2d(2, 2)
    expect(v).toEqual({
      x: 2,
      y: 2,
    })
  })

  it('clone() should return a new cloned version of an existing Vector2d.', () => {
    let v = new Vector2d(2, 2, 2)
    let theclone = v.clone()
    expect(theclone).toEqual({
      x: 2,
      y: 2,
    })
  })

  it('add() should add a value to every value in the Vector2d.', () => {
    let v = new Vector2d(4, 6)
    v.add(2)
    expect(v).toEqual(
      {
        x: 6,
        y: 8,
      }
    )
  })

  it('clone() should return a new cloned version of an existing Vector2d. And add() would not change the original', () => {
    let v = new Vector2d(2, 2)
    let theclone = v.clone()
    v.add(1)
    theclone.add(2)
    expect(v).toEqual({
      x: 3,
      y: 3
    })
    expect(theclone).toEqual({
      x: 4,
      y: 4
    })
  })

  it('subtract() should add a value to every value in the Vector2d.', () => {
    let v = new Vector2d(4, 4)
    v.subtract(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })

  it('multiply () should multiply a value to every value in the Vector2d.', () => {
    let v = new Vector2d(4, 4)
    v.multiply(2)
    expect(v).toEqual(
      {
        x: 8,
        y: 8
      }
    )
  })

  it('devide () should devide the value of the Vector2d.', () => {
    let v = new Vector2d(4, 4)
    v.devide(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })

  it('mangitude() should calculate the correct magnitude from', () => {
    let v = new Vector2d(6, 3)
    let expected = v.magnitude()
    expect(expected).toBe(6.708203932499369)
  })

  it('getX() should return the x value of the Vector2d.', () => {
    let v = new Vector2d(4, 6)
    let x = v.getX()
    expect(x).toBe(4)
  })

  it('getY() should return the y value of the Vector2d.', () => {
    let v = new Vector2d(4, 6)
    let y = v.getY()
    expect(y).toBe(6)
  })

  it('add() should return an instance of the Vector2d it self', () => {
    let v = new Vector2d(2, 2, 4)
    let add = v.add(2)
    expect(add).toBeInstanceOf(Vector2d)
  })

  it('subtract () should return an instance of the Vector2d it self', () => {
    let v = new Vector2d(2, 2, 4)
    let subtract = v.subtract(2)
    expect(subtract).toBeInstanceOf(Vector2d)
  })

  it('multiply () should return an instance of the Vector2d it self', () => {
    let v = new Vector2d(2, 2, 4)
    let multiply = v.multiply(2)
    expect(multiply).toBeInstanceOf(Vector2d)
  })

  it('devide () should return an instance of the Vector2d it self', () => {
    let v = new Vector2d(2, 2, 4)
    let devide = v.devide(2)
    expect(devide).toBeInstanceOf(Vector2d)
  })

  it('toObject() returns the values as an object', () => {
    let v = new Vector2d(2, 2, 4)
    let object = v.toObject()
    expect(object).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })
})
 
describe('Math - Vector2d Element-wise', function () {

  it('add() should take an other matrix as argument and add that Matrix to the existing Matrix.', () => {
    let v1 = new Vector2d(2, 4)
    let v2 = new Vector2d(2, 2)
    v1 = v1.add(v2)
    expect(v1).toEqual({
      x: 4,
      y: 6,
    })
  })

  it('subtract() should take an other matrix as argument and subtract that Vector2d from the existing Vector2d.', () => {
    let v1 = new Vector2d(2, 4)
    let v2 = new Vector2d(2, 2)
    v1 = v1.subtract(v2)
    expect(v1).toEqual({
      x: 0,
      y: 2,
    })
  })

  it('multiply() should take an other Vector2d as argument and multiply that Vector2d with the existing Vector2d.', () => {
    let v1 = new Vector2d(2, 2)
    let v2 = new Vector2d(2, 6)
    v1 = v1.multiply(v2)
    expect(v1).toEqual({
      x: 4,
      y: 12,
    })
  })

  it('devide() should take an other Vector2d as argument and devide that Vector2d with the existing Vector2d.', () => {
    let v1 = new Vector2d(12, 12)
    let v2 = new Vector2d(6, 6)
    v1 = v1.devide(v2)
    expect(v1).toEqual({
      x: 2,
      y: 2,
    })
  })
})