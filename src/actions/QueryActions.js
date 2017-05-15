import map from 'lodash/map';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

import * as actionTypes from '../constants/ActionTypes';

import { requestData, receiveData } from './LoadingActions';
import { buildParams } from './elasticsearch';
import { getData } from './api';

function loadResult(data) {
  return {
    type: actionTypes.LOAD_RESULT,
    data
  };
}

function loadError(error) {
  return {
    type: actionTypes.LOAD_ERROR,
    error
  };
}

export function clearError() {
  return {
    type: actionTypes.CLEAR_ERROR
  };
}

export function updateKeyword(keyword) {
  return {
    type: actionTypes.UPDATE_KEYWORD,
    keyword
  };
}

export function updatePageNum(pageNum) {
  return {
    type: actionTypes.UPDATE_PAGE_NUM,
    pageNum
  };
}

export function filterResult(data, fields) {
  if(isEmpty(fields)) { return data; }

  return map(data, d => pick(d, fields));
}

export function updateFields(fields) {
  return {
    type: actionTypes.UPDATE_FIELDS,
    fields
  };
}

export function requestApi() {
  return (dispatch, getState) => {
    dispatch(requestData());

    const error = getState().form.form ? getState().form.form.syncErrors : false;

    if (error) {
      dispatch(receiveData());
      return dispatch(loadError(error));
    }

    const data = buildParams(getState().query, getState().filters);

    return getData(data)
      .then((response) => {
        dispatch(receiveData());
        dispatch(clearError());
        dispatch(loadResult(response));
      },
      (error) => {
        dispatch(receiveData());
        dispatch(loadError(error));
      });
  };
}
