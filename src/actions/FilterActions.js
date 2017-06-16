import map from 'lodash/map';
import each from 'lodash/each';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import filter from 'lodash/filter';

import * as actionTypes from '../constants/ActionTypes';
import {
  getStats,
  getSelectableFields
} from './api';

function generateCategories(data) {
  return mapValues(data, val => map(val, 'key'));
}

function updateCategories(data) {
  let categories = data.data ? generateCategories(data.data.aggregations) : [];
  const fields = getSelectableFields();

  if (!isEmpty(fields)) {
    categories = pick(categories, fields);
  }

  return {
    type: actionTypes.UPDATE_CATEGORIES,
    categories
  };
}

export function addFilter(filterType, value) {
  return {
    type: actionTypes.ADD_FILTER,
    filterType,
    value
  };
}

export function removeAllFilters() {
  return {
    type: actionTypes.REMOVE_ALL_FILTERS
  };
}

export function addFilters(formFilters) {
  return (dispatch) => {
    dispatch(removeAllFilters());

    const validFilters = filter(formFilters, el => el.type && el.value);

    each(validFilters, (f) => {
      dispatch(addFilter(f.type.value, f.value.value));
    });
  };
}

export function removeSelectedFilter(index) {
  return {
    type: actionTypes.REMOVE_SELECTED_FILTER,
    index
  };
}

export function getCategories() {
  return dispatch => getStats().then(
      response => dispatch(updateCategories(response))
    );
}
