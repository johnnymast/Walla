const Vector3d = require('../../../src/core/math/vector3d')

describe('Math - Vector3d', function () {

  it('Constructing should create a vector3d the correct values.', () => {
    let v = new Vector3d(2, 5, 2)
    expect(v).toEqual({
      x: 2,
      y: 5,
      z: 2
    })
  })

  it('clone() should return a new cloned version of an existing Vector3d.', () => {
    let v = new Vector3d(2, 2, 4)
    let theclone = v.clone()
    expect(theclone).toEqual({
      x: 2,
      y: 2,
      z: 4,
    })
  })

  it('add() should add a value to every value in the vector2d.', () => {
    let v = new Vector3d(2, 5, 2)
    v.add(2)
    expect(v).toEqual(
      {
        x: 4,
        y: 7,
        z: 4
      }
    )
  })
  //
  it('clone() should return a new cloned version of an existing Vector3d. And add() would not change the original', () => {
    let v = new Vector3d(2, 2, 5)
    let theclone = v.clone()
    v.add(1)
    theclone.add(2)
    expect(v).toEqual({
      x: 3,
      y: 3,
      z: 6
    })
    expect(theclone).toEqual({
      x: 4,
      y: 4,
      z: 7
    })
  })

  it('subtract() should add a value to every value in the Vector3d.', () => {
    let v = new Vector3d(4, 4, 9)
    v.subtract(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2,
        z: 7
      }
    )
  })

  it('getX() should return the x value of the Vector3d.', () => {
    let v = new Vector3d(4, 6, 9)
    let x = v.getX()
    expect(x).toBe(4)
  })

  it('getY() should return the y value of the Vector3d.', () => {
    let v = new Vector3d(4, 6, 7)
    let y = v.getY()
    expect(y).toBe(6)
  })

  it('getZ() should return the z value of the Vector3d.', () => {
    let v = new Vector3d(4, 6, 7)
    let z = v.getZ()
    expect(z).toBe(7)
  })

  it('add() should return an instance of the Vector3d it self', () => {
    let v = new Vector3d(2, 5, 2)
    let add = v.add(2)
    expect(add).toBeInstanceOf(Vector3d)
  })
  //
  it('subtract () should return an instance of the Vector3d it self', () => {
    let v = new Vector3d(2, 2, 4)
    let substract = v.subtract(2)
    expect(substract).toBeInstanceOf(Vector3d)
  })

  it('multiply () should return an instance of the Vector3d it self', () => {
    let v = new Vector3d(2, 2, 4)
    let multiply = v.multiply(2)
    expect(multiply).toBeInstanceOf(Vector3d)
  })

  it('toObject() returns the values as an object', () => {
    let v = new Vector3d(2, 5, 2)
    let result = v.add(2)
    let object = result.toObject()
    expect(object).toEqual(
      {
        x: 4,
        y: 7,
        z: 4,
      }
    )
  })
})


describe('Math - Vector3d Element-wise', function () {

  it('add() should take an other vector as argument and add that Vector3d to the existing Vector3d.', () => {
    let v1 = new Vector3d(2, 4, 7)
    let v2 = new Vector3d(2, 2, 9)
    v1 = v1.add(v2)
    expect(v1).toEqual({
      x: 4,
      y: 6,
      z: 16,
    })
  })

  it('subtract() should take an other vector as argument and subtract that Vector3d from the existing Vector3d.', () => {
    let v1 = new Vector3d(2, 4 ,2)
    let v2 = new Vector3d(2, 2, 9)
    v1 = v1.subtract(v2)
    expect(v1).toEqual({
      x: 0,
      y: 2,
      z: -7,
    })
  })

  it('multiply() should take an other vector as argument and multiply that Vector3d with the existing Vector3d.', () => {
    let v1 = new Vector3d(2, 2, 4)
    let v2 = new Vector3d(2, 6, 33)
    v1 = v1.multiply(v2)
    expect(v1).toEqual({
      x: 4,
      y: 12,
      z: 132,
    })
  })
})