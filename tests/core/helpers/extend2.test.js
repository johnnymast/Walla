require('../../../src/core/helpers')

describe('Helpers - extend2', function () {
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