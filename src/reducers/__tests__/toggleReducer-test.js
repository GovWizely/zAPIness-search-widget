import toggleReducer from '../toggleReducer'
import * as actionTypes from '../../constants/ActionTypes'

const { Map } = require('immutable')

describe('reducers/toggleReducer', () => {
  const initialState = Map({
    key: undefined,
    show: false
  })

  it('returns initialState if no action is passed', () => {
    expect(
     toggleReducer(initialState, {})
   ).toEqual(initialState)
  })

  describe('When different key is being toggled', () => {
    it('stores the toggled key and set the show to true', () => {
      const key = 2

      expect(
        toggleReducer(
          initialState,
          { type: actionTypes.TOGGLE_WHICH, key }
        )
      ).toEqual(Map({
        key: 2,
        show: true
      }))
    })
  })

  describe('When the same key is being toggled', () => {
    it('stores the toggled key and set the show to opposite value', () => {
      const newState = Map({
        key: 2,
        show: true
      })

      expect(
        toggleReducer(
          newState,
          { type: actionTypes.TOGGLE_WHICH, key: 2 }
        )
      ).toEqual(Map({
        key: 2,
        show: false
      }))
    })
  })
})
