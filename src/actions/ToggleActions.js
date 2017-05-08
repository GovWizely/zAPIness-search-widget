import * as actionTypes from '../constants/ActionTypes';

export default function toggleResult(key) {
  return {
    type: actionTypes.TOGGLE_WHICH,
    key
  };
}
