import queryReducer from '../queryReducer'
import * as actionTypes from '../../constants/ActionTypes'

const { Map } = require('immutable')

describe('queryReducer', () => {
  const data = [1, 2, 3]

  const filter = index => Map({
    type: `type-${index}`,
    availableValues: [`value-${index}`],
    value: index
  })

  const initialState = Map({
    categories: [],
    keyword: '',
    offset: 0,
    pageNum: 1,
    filters: [filter(0), filter(1)],
    data: undefined,
    error: []
  })

  it('returns initialState', () => {
    expect(
     queryReducer(undefined, {})
   ).toEqual(Map({
     categories: [],
     keyword: '',
     offset: 0,
     pageNum: 1,
     filters: [],
     data: undefined,
     error: []
   }))
  })

  it('handles load result', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.LOAD_RESULT,
        data
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [filter(0), filter(1)],
      data,
      error: []
    }))
  })

  it('handles load error', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.LOAD_ERROR,
        error: 'Some Error'
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [filter(0), filter(1)],
      data: undefined,
      error: 'Some Error'
    }))
  })

  it('handles update keywords', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_KEYWORD,
        keyword: 'Some Keyword'
      })
    ).toEqual(Map({
      categories: [],
      keyword: 'Some Keyword',
      offset: 0,
      pageNum: 1,
      filters: [filter(0), filter(1)],
      data: undefined,
      error: []
    }))
  })

  it('handles add filter', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.ADD_FILTER
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [filter(0), filter(1), Map({
        type: '',
        availableValues: [],
        value: ''
      })],
      data: undefined,
      error: []
    }))
  })

  it('handles remove selected filter', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.REMOVE_SELECTED_FILTER,
        index: 1
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [filter(0)],
      data: undefined,
      error: []
    }))
  })

  it('handles remove all filters', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.REMOVE_ALL_FILTERS
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [],
      data: undefined,
      error: []
    }))
  })

  it('handles update selected filter', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_SELECTED_FILTER,
        index: 1,
        selectedFilter: 'type-1'
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [
        filter(0),
        Map({
          type: 'type-1',
          availableValues: [],
          value: ''
        })
      ],
      data: undefined,
      error: []
    }))
  })

  it('handles update selected filter value ', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_SELECTED_FILTER_VALUE,
        index: 1,
        selectedValue: '1'
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [
        filter(0),
        Map({
          type: 'type-1',
          availableValues: ['value-1'],
          value: '1'
        })
      ],
      data: undefined,
      error: []
    }))
  })

  it('handles update page num', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_PAGE_NUM,
        pageNum: 2
      })
    ).toEqual(Map({
      categories: [],
      keyword: '',
      offset: 10,
      pageNum: 2,
      filters: [filter(0), filter(1)],
      data: undefined,
      error: []
    }))
  })

  it('handles update categories', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['1', '2', '3']
      })
    ).toEqual(Map({
      categories: ['1', '2', '3'],
      keyword: '',
      offset: 0,
      pageNum: 1,
      filters: [filter(0), filter(1)],
      data: undefined,
      error: []
    }))
  })
})
