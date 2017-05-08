import * as actionTypes from '../constants/ActionTypes';

export function requestData() {
  return {
    type: actionTypes.REQUEST_DATA
  };
}

export function receiveData() {
  return {
    type: actionTypes.RECEIVE_DATA
  };
}
