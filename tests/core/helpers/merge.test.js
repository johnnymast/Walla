require('../../../src/core/helpers')

describe('Helpers - merge', function () {
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