import * as LoadingActions from '../LoadingActions'
import * as actionTypes from '../../constants/ActionTypes'

describe('actions/LoadingActions', () => {
  describe('requestData', () => {
    it('creates action to request data', () => {
      expect(LoadingActions.requestData()).toEqual(
        {
          type: actionTypes.REQUEST_DATA
        }
      )
    })
  })

  describe('receiveData', () => {
    it('creates action to receive data', () => {
      expect(LoadingActions.receiveData()).toEqual(
        {
          type: actionTypes.RECEIVE_DATA
        }
      )
    })
  })
})
