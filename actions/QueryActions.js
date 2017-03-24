import axios from 'axios';
import rootReducer from '../reducers';

function loadResult(data) {
  return {
    type: "LOAD_RESULT",
    data
  }
}

function loadError(error) {
  return {
    type: "LOAD_ERROR",
    error
  }
}

export function updateKeyword(keyword) {
  return {
    type: 'UPDATE_KEYWORD',
    keyword
  }
}

export function updatePageNum(pageNum) {
  return {
    type: 'UPDATE_PAGE_NUM',
    pageNum
  }
}

function fetchApi({ keyword, offset}) {
  let dummy = ''
  return axios.get(
    dummy,
    { params:
      {
        q: keyword,
        offset: offset
      }
    }
  )
}

export function requestApi(payload) {
  return function (dispatch, getState) {
    return fetchApi(getState().query).then(
      data => dispatch(loadResult(data)),
      error => dispatch(loadError(error))
    );
  };
}
