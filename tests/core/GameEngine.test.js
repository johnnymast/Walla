const GameEngine = require('../../src/core/GameEngine')

describe('Core - GameEngine',  () => {

  it('It should be constructable by using keyword new.', () => {
    let expected = new GameEngine()
    expect(expected).toBeInstanceOf(GameEngine)
  })

  it('It should be to create a singleton.', () => {
    let expected = GameEngine.get()
    expect(expected).toBeInstanceOf(GameEngine)
  })

  it('Two singleton instances should contain the same values.', () => {
    let v1 = GameEngine.get()
    let v2 = GameEngine.get()

    v1.set('test1', 'value')
    expect(v1).toEqual(v2)
  })

  it('Set and Get should work together', () => {
    let engine = GameEngine.get()
    let testValue = 'value'

    engine.set('test1', testValue)

    let expected = engine.get('test1')

    expect(expected).toEqual(testValue)
  })

});