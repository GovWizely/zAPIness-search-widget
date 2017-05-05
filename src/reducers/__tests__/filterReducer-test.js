import filterReducer from '../filterReducer'
import * as actionTypes from '../../constants/ActionTypes'

const { Map } = require('immutable')

describe('filterReducer', () => {
  const filter = index => Map({
    type: `type-${index}`,
    availableValues: [`value-${index}`],
    value: index
  })

  const initialState = Map({
    categories: [],
    filters: [filter(0), filter(1)]
  })

  it('handles add filter', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.ADD_FILTER
      })
    ).toEqual(Map({
      categories: [],
      filters: [filter(0), filter(1), Map({
        type: '',
        availableValues: [],
        value: ''
      })]
    }))
  })

  it('handles remove selected filter', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.REMOVE_SELECTED_FILTER,
        index: 1
      })
    ).toEqual(Map({
      categories: [],
      filters: [filter(0)]
    }))
  })

  it('handles remove all filters', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.REMOVE_ALL_FILTERS
      })
    ).toEqual(Map({
      categories: [],
      filters: []
    }))
  })

  it('handles update selected filter', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.UPDATE_SELECTED_FILTER,
        index: 1,
        selectedFilter: 'type-1'
      })
    ).toEqual(Map({
      categories: [],
      filters: [
        filter(0),
        Map({
          type: 'type-1',
          availableValues: [],
          value: ''
        })
      ]
    }))
  })

  it('handles update selected filter value ', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.UPDATE_SELECTED_FILTER_VALUE,
        index: 1,
        selectedValue: '1'
      })
    ).toEqual(Map({
      categories: [],
      filters: [
        filter(0),
        Map({
          type: 'type-1',
          availableValues: ['value-1'],
          value: '1'
        })
      ]
    }))
  })

  it('handles update categories', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['1', '2', '3']
      })
    ).toEqual(Map({
      categories: ['1', '2', '3'],
      filters: [filter(0), filter(1)]
    }))
  })
})
