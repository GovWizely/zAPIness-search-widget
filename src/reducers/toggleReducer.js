import * as actionTypes from '../constants/ActionTypes'

const { Map } = require('immutable')

const initialState = Map({
  key: undefined,
  show: false
})

export default function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_WHICH:
      // hide/show selection if user toggle the same key
      if (state.get('key') === action.key) {
        return state.merge({
          key: action.key,
          show: !state.get('show')
        })
      }
      return state.merge({
        key: action.key,
        show: true
      })
    default:
      return state
  }
}
