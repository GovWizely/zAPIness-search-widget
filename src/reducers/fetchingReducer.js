import * as actionTypes from '../constants/ActionTypes'

export default function fetchingReducer(state = false, action) {
  switch (action.type) {
    case actionTypes.REQUEST_DATA:
      return true
    case actionTypes.RECEIVE_DATA:
      return false
    default:
      return state
  }
}
