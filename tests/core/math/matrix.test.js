const Matrix = require('../../../src/core/math/matrix')

describe('Math - Matrix', function () {

  it('Constructing should create a matrix the correct size and fill.', () => {
    let m = new Matrix(2, 2, 1)
    expect(m).toEqual({
      rows: 2,
      cols: 2,
      fill: 1,
      data: [
        [1, 1],
        [1, 1],
      ]
    })
  })

  it('clone() should return a new cloned version of an existing matrix.', () => {
    let m = new Matrix(2, 2, 2)
    let theclone = m.clone()
    expect(theclone).toEqual({
      rows: 2,
      cols: 2,
      fill: 2,
      data: [
        [2, 2],
        [2, 2],
      ]
    })
  })

  it('add() should add a value to every value in the matrix.', () => {
    let m = new Matrix(4, 4, 2)
    m.add(2)
    expect(m.data).toEqual(
      [
        [4, 4, 4, 4],
        [4, 4, 4, 4],
        [4, 4, 4, 4],
        [4, 4, 4, 4],
      ]
    )
  })

  it('clone() should return a new cloned version of an existing matrix. And add() would not change the original', () => {
    let m = new Matrix(2, 2, 1)
    let theclone = m.clone()
    m.add(2)
    theclone.add(1)
    expect(m).toEqual({
      rows: 2,
      cols: 2,
      fill: 1,
      data: [
        [3, 3],
        [3, 3],
      ]
    })
    expect(theclone).toEqual({
      rows: 2,
      cols: 2,
      fill: 1,
      data: [
        [2, 2],
        [2, 2],
      ]
    })
  })

  it('valueOf() should return the Matrix as an array.', () => {
    let m = new Matrix(2, 2)
    let actual = m.valueOf()
    let expected = [
      [0, 0],
      [0, 0]
    ]

    expect(actual).toEqual(expected)
  })

  it('toObject() should return the Matrix as an array.', () => {
    let m = new Matrix(2, 2)
    let actual = m.toObject()
    let expected = [
      [0, 0],
      [0, 0]
    ]

    expect(actual).toEqual(expected)
  })

  it('subtract() should add a value to every value in the matrix.', () => {
    let m = new Matrix(4, 4, 3)
    m.subtract(2)
    expect(m.data).toEqual(
      [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ]
    )
  })

  it('subtract() should return a new cloned version of an existing matrix. And subtract() would not change the original', () => {
    let m = new Matrix(2, 2, 4)
    let theclone = m.clone()
    m.subtract(2)
    theclone.subtract(1)
    expect(m).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [2, 2],
        [2, 2],
      ]
    })
    expect(theclone).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [3, 3],
        [3, 3],
      ]
    })
  })

  it('multiply() should add a value to every value in the matrix.', () => {
    let m = new Matrix(4, 4, 3)
    m.multiply(2)
    expect(m.data).toEqual(
      [
        [6, 6, 6, 6],
        [6, 6, 6, 6],
        [6, 6, 6, 6],
        [6, 6, 6, 6],
      ]
    )
  })

  it('multiply() should return a new cloned version of an existing matrix. And multiply() would not change the original', () => {
    let m = new Matrix(2, 2, 4)
    let theclone = m.clone()
    m.multiply(2)
    theclone.multiply(4)
    expect(m).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [8, 8],
        [8, 8],
      ]
    })
    expect(theclone).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [16, 16],
        [16, 16],
      ]
    })
  })

  it('setValue(row, col, 2) should make valueAt(row, col) equall 2', () => {
    let m = new Matrix(2, 2)
    let row = 1
    let col = 2
    let val = 2

    m.setValue(row, col, val)

    let expected = 2
    let result = m.valueAt(row, col)

    expect(result).toEqual(expected)
  })

  it('add() should return an instance of the matrix it self', () => {
    let m = new Matrix(2, 2, 4)
    let add = m.add(2)
    expect(add).toBeInstanceOf(Matrix)
  })

  it('subtract () should return an instance of the matrix it self', () => {
    let m = new Matrix(2, 2, 4)
    let add = m.subtract(2)
    expect(add).toBeInstanceOf(Matrix)
  })

  it('multiply () should return an instance of the matrix it self', () => {
    let m = new Matrix(2, 2, 4)
    let add = m.multiply(2)
    expect(add).toBeInstanceOf(Matrix)
  })

})

describe('Math - Matrix Element-wise', function () {

  it('add() should throw an error if a matrix object is passed as parameter but dont\'t share the same sizes with the original matrix.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 3, 2)
    expect(() => {
      m1.add(m2)
    }).toThrowError('Cannot add matrices together that don\'t share the same size.')
  })

  it('add() should take an other matrix as argument and add that Matrix to the existing Matrix.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 2, 2)
    m1 = m1.add(m2)
    expect(m1).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [6, 6],
        [6, 6],
      ]
    })
  })

  it('subtract() should throw an error if a matrix object is passed as parameter but the sizes don\'t match.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 3, 2)
    expect(() => {
      m1.subtract(m2)
    }).toThrowError('Cannot subtract matrices from each other that don\'t share the same size.')
  })

  it('subtract() should take an other matrix as argument and subtract that Matrix from the existing Matrix.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 2, 2)
    m1 = m1.subtract(m2)
    expect(m1).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [2, 2],
        [2, 2],
      ]
    })
  })

  it('multiply() should throw an error if a matrix object is passed as parameter but the sizes don\'t match.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 3, 2)
    expect(() => {
      m1.multiply(m2)
    }).toThrowError('Cannot multiply matrices with each other that don\'t share the same size.')
  })

  it('multiply() should take an other matrix as argument and multiply that Matrix with the existing Matrix.', () => {
    let m1 = new Matrix(2, 2, 4)
    let m2 = new Matrix(2, 2, 2)
    m1 = m1.multiply(m2)
    expect(m1).toEqual({
      rows: 2,
      cols: 2,
      fill: 4,
      data: [
        [8, 8],
        [8, 8],
      ]
    })
  })
})