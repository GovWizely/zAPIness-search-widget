import map from 'lodash/map';
import each from 'lodash/each';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import values from 'lodash/values';

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

export function addDefaultFilter(fields) {
  return (dispatch, getState) => {
    const defaultFilter = getState().filters.get('categories');
    const defaultValue = values(defaultFilter)[0];

    return fields.push({
      type: keys(defaultFilter)[0],
      value: defaultValue ? defaultValue[0] : ''
    });
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
    each(formFilters, (filter) => {
      dispatch(addFilter(filter.type, filter.value));
    });
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
