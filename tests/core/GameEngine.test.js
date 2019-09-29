const Prophecy = require('prophecyjs')

describe('Core - Prophecy.GameEngine',  () => {

  it('It should be constructable by using keyword new.', () => {
    let expected = new Prophecy.GameEngine()
    expect(expected).toBeInstanceOf(Prophecy.GameEngine)
  })

  it('It should be to create a singleton.', () => {
    let expected = Prophecy.GameEngine.get()
    expect(expected).toBeInstanceOf(Prophecy.GameEngine)
  })

  it('Two singleton instances should contain the same values.', () => {
    let v1 = Prophecy.GameEngine.get()
    let v2 = Prophecy.GameEngine.get()

    v1.set('test1', 'value')
    expect(v1).toEqual(v2)
  })

  it('Set and Get should work together', () => {
    let engine = Prophecy.GameEngine.get()
    let testValue = 'value'

    engine.set('test1', testValue)

    let expected = engine.get('test1')

    expect(expected).toEqual(testValue)
  })

});