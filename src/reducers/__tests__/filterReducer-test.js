import filterReducer from '../filterReducer';
import * as actionTypes from '../../constants/ActionTypes';

const { Map } = require('immutable');

describe('filterReducer', () => {
  const filter = index => Map({
    type: `type-${index}`,
    value: index
  });

  const initialState = Map({
    categories: [],
    filters: [filter(0), filter(1)]
  });

  it('handles add filter', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.ADD_FILTER,
        filterType: 'type-1',
        value: 1
      })
    ).toEqual(Map({
      categories: [],
      filters: [filter(0), filter(1), Map({
        type: 'type-1',
        value: 1
      })]
    }));
  });

  it('handles remove selected filter', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.REMOVE_SELECTED_FILTER,
        index: 1
      })
    ).toEqual(Map({
      categories: [],
      filters: [filter(0)]
    }));
  });

  it('handles remove all filters', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.REMOVE_ALL_FILTERS
      })
    ).toEqual(Map({
      categories: [],
      filters: []
    }));
  });

  it('handles update categories', () => {
    expect(
      filterReducer(initialState, {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['1', '2', '3']
      })
    ).toEqual(Map({
      categories: ['1', '2', '3'],
      filters: [filter(0), filter(1)]
    }));
  });
});
