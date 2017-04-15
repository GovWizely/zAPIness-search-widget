import { map, fromPairs } from 'lodash'
import { buildParams } from './elasticsearch'
import { get } from './api'

function loadResult(data) {
  return {
    type: 'LOAD_RESULT',
    data
  }
}

function loadError(error) {
  return {
    type: 'LOAD_ERROR',
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
    type: 'UPDATE_CATEGORIES',
    categories
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

export function updateSelectedFilter(selectedFilter, index) {
  return {
    type: 'UPDATE_SELECTED_FILTER',
    index,
    selectedFilter
  }
}

export function updateSelectedValue(selectedValue, index) {
  return {
    type: 'UPDATE_SELECTED_FILTER_VALUE',
    index,
    selectedValue
  }
}

export function addFilter() {
  return {
    type: 'ADD_FILTER'
  }
}

export function removeSelectedFilter(index) {
  return {
    type: 'REMOVE_SELECTED_FILTER',
    index
  }
}

export function removeAllFilters() {
  return {
    type: 'REMOVE_ALL_FILTERS'
  }
}

export function requestApi() {
  debugger
  return (dispatch, getState) => {
    const error = getState().form.form.syncErrors

    if (error) {
      return dispatch(loadError(error))
    }
    const data = buildParams(getState().query)

    return get(data).then(
        response => dispatch(loadResult(response)),
        error => dispatch(loadError(error)),
      )
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
