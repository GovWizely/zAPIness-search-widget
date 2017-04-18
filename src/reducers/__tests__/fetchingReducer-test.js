import fetchingReducer from '../fetchingReducer'
import * as actionTypes from '../../constants/ActionTypes'

describe('reducers/fetchingReducer', () => {
  it('returns initialState as false', () => {
    expect(
     fetchingReducer(undefined, {})
   ).toBe(false)
  })

  it('returns true when requesting data', () => {
    expect(
      fetchingReducer(false, { type: actionTypes.REQUEST_DATA })
    ).toBe(true)
  })

  it('returns false when data is received', () => {
    expect(
      fetchingReducer(true, { type: actionTypes.RECEIVE_DATA })
    ).toBe(false)
  })
})
