import { map, mapValues } from 'lodash'

import * as actionTypes from '../constants/ActionTypes'
import { buildParams } from './elasticsearch'
import { getData } from './api'

function generateCategories(data) {
  return mapValues(data, val => map(val, 'key'))
}

function updateCategories(data) {
  const categories = data.data ? generateCategories(data.data.aggregations) : []

  return {
    type: actionTypes.UPDATE_CATEGORIES,
    categories
  }
}

export function updateSelectedFilter(selectedFilter, index) {
  return {
    type: actionTypes.UPDATE_SELECTED_FILTER,
    index,
    selectedFilter
  }
}

export function updateSelectedValue(selectedValue, index) {
  return {
    type: actionTypes.UPDATE_SELECTED_FILTER_VALUE,
    index,
    selectedValue
  }
}

export function addFilter() {
  return {
    type: actionTypes.ADD_FILTER
  }
}

export function removeSelectedFilter(index) {
  return {
    type: actionTypes.REMOVE_SELECTED_FILTER,
    index
  }
}

export function removeAllFilters() {
  return {
    type: actionTypes.REMOVE_ALL_FILTERS
  }
}

export function getCategories() {
  return (dispatch, getState) => {
    const data = buildParams(getState().query)

    return getData(data).then(
      response => dispatch(updateCategories(response)),
    )
  }
}
