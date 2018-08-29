require('../../../src/core/helpers')

describe('Object Helpers - extend', function () {
  it('extend() sould work', () => {

    let base = function () {}

    base.prototype.callback = function () {
      return 'Hello world'
    }

    let child = function () {}

    /**
     * Extend the child object with functions
     * of the base object.
     */
    extend(child, base)

    let result = new child()

    expect(typeof result.callback).toBe('function')
  })
})

describe('Object Helpers - extend2', function () {
  it('extend2() sould work', () => {
    let v1 = {
      a: 'first',
      b: 'second'
    }

    let v2 = {
      c: {
        option: {
          name: 'some value',
          value: 0,
        }
      }
    }

    /**
     * Extend v1 deeply with values
     * from v2.
     *
     * @type {{}}
     */
    v1 = extend2(true, v1, v2)

    expect(v1).toEqual({
      a: 'first',
      b: 'second',
      c: {
        option: {
          name: 'some value',
          value: 0,
        }
      }
    })
  })
})

describe('Object Helpers - merge', function () {
  it('merge() sould work', () => {
    let v1 = {
      a: 'first',
      b: 'second'
    }

    let v2 = {
      a: 'new',
    }

    v1 = merge(v1, v2);

    expect(v1).toEqual({
      a: 'new',
      b: 'second'
    })
  });
})

describe('Object Helpers - map2', function () {
  it('map2() should remap a given value in a range to an other value in an other range', () => {
    let number = map2([0, 100], [0, 10], 50)
    expect(number).toBe(5)
  })

  it('map2() should throw an error if the from parameter is no array', function () {
    expect(() => {
      let number = map2(1, 10, 5)
    }).toThrow('map2: Type error, parameter from should be an array with 2 values.')
  })

  it('map2() should throw an error if the from only has one value', function () {
    expect(() => {
      let number = map2([1], 2, 10)
    }).toThrow('map2: Type error, parameter from should be an array with 2 values.')
  })

  it('map2() should throw an error if the to parameter is no array', function () {
    expect(() => {
      let number = map2([0, 1], 10, 5)
    }).toThrow('map2: Type error, parameter to should be an array with 2 values.')
  })

  it('map2() should throw an error if the to only has one value', function () {
    expect(() => {
      let number = map2([1, 2], [2], 10)
    }).toThrow('map2: Type error, parameter to should be an array with 2 values.')
  })
})