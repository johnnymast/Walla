require('../../../src/core/helpers')

describe('Helpers - extend', function () {
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