const Prophecy = require('prophecyjs')

describe('Math - Prophecy.Math.Vector3d', function () {

  it('Constructing should create a Prophecy.Math.Vector3d the correct values.', () => {
    let v = new Prophecy.Math.Vector3d(2, 5, 2)
    expect(v).toEqual({
      x: 2,
      y: 5,
      z: 2
    })
  })

  it('clone() should return a new cloned version of an existing Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(2, 2, 4)
    let theclone = v.clone()
    expect(theclone).toEqual({
      x: 2,
      y: 2,
      z: 4,
    })
  })

  it('add() should add a value to every value in the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(2, 5, 2)
    v.add(2)
    expect(v).toEqual(
      {
        x: 4,
        y: 7,
        z: 4
      }
    )
  })

  it('multiply () should multiply a value to every value in the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 4, 4)
    v.multiply(2)
    expect(v).toEqual(
      {
        x: 8,
        y: 8,
        z: 8
      }
    )
  })

  it('divide () should divide the value of the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 4, 2)
    v.divide(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2,
        z: 1,
      }
    )
  })

  it('mangitude() should calculate the correct magnitude from', () => {
    let v = new Prophecy.Math.Vector3d(2, 3, 5)
    let expected = v.magnitude()
    expect(expected).toBe(6.164414002968976)
  })

  it('clone() should return a new cloned version of an existing Prophecy.Math.Vector3d. And add() would not change the original', () => {
    let v = new Prophecy.Math.Vector3d(2, 2, 5)
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

  it('subtract() should add a value to every value in the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 4, 9)
    v.subtract(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2,
        z: 7
      }
    )
  })

  it('getX() should return the x value of the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 6, 9)
    let x = v.getX()
    expect(x).toBe(4)
  })

  it('getY() should return the y value of the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 6, 7)
    let y = v.getY()
    expect(y).toBe(6)
  })

  it('getZ() should return the z value of the Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(4, 6, 7)
    let z = v.getZ()
    expect(z).toBe(7)
  })

  it('add() should return an instance of the Prophecy.Math.Vector3d it self', () => {
    let v = new Prophecy.Math.Vector3d(2, 5, 2)
    let add = v.add(2)
    expect(add).toBeInstanceOf(Prophecy.Math.Vector3d)
  })
  //
  it('subtract () should return an instance of the Prophecy.Math.Vector3d it self', () => {
    let v = new Prophecy.Math.Vector3d(2, 2, 4)
    let substract = v.subtract(2)
    expect(substract).toBeInstanceOf(Prophecy.Math.Vector3d)
  })

  it('multiply () should return an instance of the Prophecy.Math.Vector3d it self', () => {
    let v = new Prophecy.Math.Vector3d(2, 2, 4)
    let multiply = v.multiply(2)
    expect(multiply).toBeInstanceOf(Prophecy.Math.Vector3d)
  })

  it('divide () should return an instance of the Prophecy.Math.Vector3d it self', () => {
    let v = new Prophecy.Math.Vector3d(4, 4, 4)
    let divide = v.divide(2)
    expect(divide).toBeInstanceOf(Prophecy.Math.Vector3d)
  })

  it('toObject() returns the values as an object', () => {
    let v = new Prophecy.Math.Vector3d(2, 5, 2)
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

  it('normalize () should return the normalized value of the vector', () => {
    let v = new Prophecy.Math.Vector3d(3, 1, 2)
    let expected = v.normalize()
    expect(expected).toEqual(
      {
        x: 0.8017837257372732,
        y: 0.2672612419124244,
        z: 0.5345224838248488,
      }
    )
  })

  it('lerp () returns the minified Prophecy.Math.Vector3d.', () => {
    let v = new Prophecy.Math.Vector3d(10, 20, 20)
    let v2 = v.lerp(12, 13, 20, 0.10)
    expect(v2).toBeInstanceOf(Prophecy.Math.Vector3d)
  })

  it('lerp () returns the correct value.', () => {
    let v = new Prophecy.Math.Vector3d(0, 0, 0)
    let expected = v.lerp(100, 100, 100, 0.5)
    expect(expected).toEqual({
      x: 50,
      y: 50,
      z: 50,
    })
  })

})

describe('Math - Prophecy.Math.Vector3d Element-wise', function () {

  it('add() should take an other vector as argument and add that Prophecy.Math.Vector3d to the existing Prophecy.Math.Vector3d.', () => {
    let v1 = new Prophecy.Math.Vector3d(2, 4, 7)
    let v2 = new Prophecy.Math.Vector3d(2, 2, 9)
    v1 = v1.add(v2)
    expect(v1).toEqual({
      x: 4,
      y: 6,
      z: 16,
    })
  })

  it('subtract() should take an other vector as argument and subtract that Prophecy.Math.Vector3d from the existing Prophecy.Math.Vector3d.', () => {
    let v1 = new Prophecy.Math.Vector3d(2, 4, 2)
    let v2 = new Prophecy.Math.Vector3d(2, 2, 9)
    v1 = v1.subtract(v2)
    expect(v1).toEqual({
      x: 0,
      y: 2,
      z: -7,
    })
  })

  it('multiply() should take an other vector as argument and multiply that Prophecy.Math.Vector3d with the existing Prophecy.Math.Vector3d.', () => {
    let v1 = new Prophecy.Math.Vector3d(2, 2, 4)
    let v2 = new Prophecy.Math.Vector3d(2, 6, 33)
    v1 = v1.multiply(v2)
    expect(v1).toEqual({
      x: 4,
      y: 12,
      z: 132,
    })
  })

  it('divide() should take an other vector as argument and divide that Prophecy.Math.Vector3d with the existing Prophecy.Math.Vector3d.', () => {
    let v1 = new Prophecy.Math.Vector3d(8, 8, 8)
    let v2 = new Prophecy.Math.Vector3d(2, 2, 2)
    v1 = v1.divide(v2)
    expect(v1).toEqual({
      x: 4,
      y: 4,
      z: 4,
    })
  })

  it('distanceTo() should calculate the correct distance between 2 Prophecy.Math.Vector3d\'s', () => {
    let v1 = new Prophecy.Math.Vector3d(6, 3, 2)
    let v2 = new Prophecy.Math.Vector3d(10, 12, 9)
    let distance = v1.distanceTo(v2)
    expect(distance).toBe(12.083045973594572)
  })

  it('dot() should calculate the dot product of 2 Prophecy.Math.Vector3d\'s', () => {
    let v1 = new Prophecy.Math.Vector3d(2, 3, 4)
    let v2 = new Prophecy.Math.Vector3d(4, 12, 8)
    let result = v1.dot(v2)
    expect(result).toBe(76)
  })
})