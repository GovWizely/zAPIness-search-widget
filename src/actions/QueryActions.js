import { map, fromPairs } from 'lodash'

import * as actionTypes from '../constants/ActionTypes'

import { requestData, receiveData } from './LoadingActions'
import { buildParams } from './elasticsearch'
import { get } from './api'

function loadResult(data) {
  return {
    type: actionTypes.LOAD_RESULT,
    data
  }
}

function loadError(error) {
  return {
    type: actionTypes.LOAD_ERROR,
    error
  }
}

function generateCategories(data) {
  const categories = []

  map(data, (value, key) => {
    categories.push(
      [key, map(value, 'key')]
    )
  })

  return fromPairs(categories)
}

function updateCategories(data) {
  let categories

  if (data.data) {
    categories = generateCategories(data.data.aggregations)
  } else {
    categories = []
  }

  return {
    type: actionTypes.UPDATE_CATEGORIES,
    categories
  }
}

export function updateKeyword(keyword) {
  return {
    type: actionTypes.UPDATE_KEYWORD,
    keyword
  }
}

export function updatePageNum(pageNum) {
  return {
    type: actionTypes.UPDATE_PAGE_NUM,
    pageNum
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

export function requestApi() {
  return (dispatch, getState) => {
    dispatch(requestData())

    const error = getState().form.form.syncErrors

    if (error) {
      dispatch(receiveData())
      return dispatch(loadError(error))
    }

    const data = buildParams(getState().query)

    return get(data)
      .then((response) => {
        dispatch(receiveData())
        dispatch(loadResult(response))
      },
      (error) => {
        dispatch(receiveData())
        dispatch(loadError(error))
      })
  }
}

export function getCategories() {
  return (dispatch, getState) => {
    const data = buildParams(getState().query)

    return get(data).then(
      response => dispatch(updateCategories(response)),
    )
  }
}
