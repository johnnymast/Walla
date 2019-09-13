const Prophecy = require('prophecyjs')

describe('Math - Prophecy.Math.Vector2d', function () {

  it('Constructing should create a Prophecy.Math.Vector2d the correct values.', () => {
    let v = new Prophecy.Math.Vector2d(2, 2)
    expect(v).toEqual({
      x: 2,
      y: 2,
    })
  })

  it('clone() should return a new cloned version of an existing Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 2)
    let theclone = v.clone()
    expect(theclone).toEqual({
      x: 2,
      y: 2,
    })
  })

  it('add() should add a value to every value in the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 6)
    v.add(2)
    expect(v).toEqual(
      {
        x: 6,
        y: 8,
      }
    )
  })

  it('clone() should return a new cloned version of an existing Prophecy.Math.Vector2d. And add() would not change the original', () => {
    let v = new Prophecy.Math.Vector2d(2, 2)
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

  it('subtract() should add a value to every value in the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 4)
    v.subtract(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })

  it('multiply () should multiply a value to every value in the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 4)
    v.multiply(2)
    expect(v).toEqual(
      {
        x: 8,
        y: 8
      }
    )
  })

  it('divide () should divide the value of the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 4)
    v.divide(2)
    expect(v).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })

  it('mangitude() should calculate the correct magnitude from', () => {
    let v = new Prophecy.Math.Vector2d(6, 3)
    let expected = v.magnitude()
    expect(expected).toBe(6.708203932499369)
  })

  it('getX() should return the x value of the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 6)
    let x = v.getX()
    expect(x).toBe(4)
  })

  it('getY() should return the y value of the Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(4, 6)
    let y = v.getY()
    expect(y).toBe(6)
  })

  it('add() should return an instance of the Prophecy.Math.Vector2d it self', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 4)
    let add = v.add(2)
    expect(add).toBeInstanceOf(Prophecy.Math.Vector2d)
  })

  it('subtract () should return an instance of the Prophecy.Math.Vector2d it self', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 4)
    let subtract = v.subtract(2)
    expect(subtract).toBeInstanceOf(Prophecy.Math.Vector2d)
  })

  it('multiply () should return an instance of the Prophecy.Math.Vector2d it self', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 4)
    let multiply = v.multiply(2)
    expect(multiply).toBeInstanceOf(Prophecy.Math.Vector2d)
  })

  it('divide () should return an instance of the Prophecy.Math.Vector2d it self', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 4)
    let divide = v.divide(2)
    expect(divide).toBeInstanceOf(Prophecy.Math.Vector2d)
  })

  it('toObject() returns the values as an object', () => {
    let v = new Prophecy.Math.Vector2d(2, 2, 4)
    let object = v.toObject()
    expect(object).toEqual(
      {
        x: 2,
        y: 2
      }
    )
  })

  it('normalize () should return the normalized value of the vector', () => {
    let v = new Prophecy.Math.Vector2d(3, 1)
    let expected = v.normalize()
    expect(expected).toEqual(
      {
        x: 0.9486832980505138,
        y: 0.31622776601683794,
      }
    )
  })

  it('radians () return the correct radians for a vector.', () => {
    let v = new Prophecy.Math.Vector2d(6, 3)
    let r = v.radians()
    expect(r).toEqual(0.4636476090008061)
  })

  it('degrees () return the correct radians for a vector.', () => {
    let v = new Prophecy.Math.Vector2d(6, 3)
    let r = v.degrees()
    expect(r).toEqual(26.56505117707799)
  })

  it('lerp () returns the minified Prophecy.Math.Vector2d.', () => {
    let v = new Prophecy.Math.Vector2d(10, 20)
    let v2 = v.lerp(12, 13, 0.10)
    expect(v2).toBeInstanceOf(Prophecy.Math.Vector2d)
  })

  it('lerp () returns the correct value.', () => {
    let v = new Prophecy.Math.Vector2d(0, 0)
    let expected = v.lerp(100, 100, 0.5)
    expect(expected).toEqual({
      x: 50,
      y: 50,
    })
  })

})

describe('Math - Prophecy.Math.Vector2d Element-wise', function () {

  it('add() should take an other matrix as argument and add that Matrix to the existing Matrix.', () => {
    let v1 = new Prophecy.Math.Vector2d(2, 4)
    let v2 = new Prophecy.Math.Vector2d(2, 2)
    v1 = v1.add(v2)
    expect(v1).toEqual({
      x: 4,
      y: 6,
    })
  })

  it('subtract() should take an other matrix as argument and subtract that Prophecy.Math.Vector2d from the existing Prophecy.Math.Vector2d.', () => {
    let v1 = new Prophecy.Math.Vector2d(2, 4)
    let v2 = new Prophecy.Math.Vector2d(2, 2)
    v1 = v1.subtract(v2)
    expect(v1).toEqual({
      x: 0,
      y: 2,
    })
  })

  it('multiply() should take an other Prophecy.Math.Vector2d as argument and multiply that Prophecy.Math.Vector2d with the existing Prophecy.Math.Vector2d.', () => {
    let v1 = new Prophecy.Math.Vector2d(2, 2)
    let v2 = new Prophecy.Math.Vector2d(2, 6)
    v1 = v1.multiply(v2)
    expect(v1).toEqual({
      x: 4,
      y: 12,
    })
  })

  it('divide() should take an other Prophecy.Math.Vector2d as argument and divide that Prophecy.Math.Vector2d with the existing Prophecy.Math.Vector2d.', () => {
    let v1 = new Prophecy.Math.Vector2d(12, 12)
    let v2 = new Prophecy.Math.Vector2d(6, 6)
    v1 = v1.divide(v2)
    expect(v1).toEqual({
      x: 2,
      y: 2,
    })
  })

  it('distanceTo() should calculate the correct distance between 2 Prophecy.Math.Vector2d\'s', () => {
    let v1 = new Prophecy.Math.Vector2d(6, 3)
    let v2 = new Prophecy.Math.Vector2d(10, 12)
    let distance = v1.distanceTo(v2)
    expect(distance).toBe(9.848857801796104)
  })
  
  it('dot() should calculate the dot product of 2 Prophecy.Math.Vector2d\'s', () => {
    let v1 = new Prophecy.Math.Vector2d(2, 3)
    let v2 = new Prophecy.Math.Vector2d(4, 12)
    let result = v1.dot(v2)
    expect(result).toBe(44)
  })
})