import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

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

export function updateSelectedFilter(selectedFilter, index) {
  return {
    type: actionTypes.UPDATE_SELECTED_FILTER,
    index,
    selectedFilter
  };
}

export function updateSelectedValue(selectedValue, index) {
  return {
    type: actionTypes.UPDATE_SELECTED_FILTER_VALUE,
    index,
    selectedValue
  };
}

export function addFilter() {
  return {
    type: actionTypes.ADD_FILTER
  };
}

export function removeSelectedFilter(index) {
  return {
    type: actionTypes.REMOVE_SELECTED_FILTER,
    index
  };
}

export function removeAllFilters() {
  return {
    type: actionTypes.REMOVE_ALL_FILTERS
  };
}

export function getCategories() {
  return dispatch => getStats().then(
      response => dispatch(updateCategories(response))
    );
}
