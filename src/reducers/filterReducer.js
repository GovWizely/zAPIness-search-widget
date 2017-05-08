import * as actionTypes from '../constants/ActionTypes';

const { Map } = require('immutable');

const initialState = Map({
  categories: [],
  filters: []
});

export default function filterReducer(state = initialState, action) {
  let newState;
  let availableValues;
  let target;
  let newType;

  switch (action.type) {
    case actionTypes.ADD_FILTER:
      newState = state.get('filters').concat(Map({
        type: '',
        availableValues: [],
        value: ''
      }));
      return state.setIn(['filters'], newState);
    case actionTypes.REMOVE_SELECTED_FILTER:
      newState = state.get('filters')
        .slice(0, action.index)
        .concat(state.get('filters').slice(action.index + 1));

      return state.setIn(['filters'], newState);
    case actionTypes.REMOVE_ALL_FILTERS:
      return state.set('filters', []);
    case actionTypes.UPDATE_SELECTED_FILTER:
      availableValues = state.get('categories')[action.selectedFilter];

      target = state.get('filters')[action.index];

      newType = Map({
        type: action.selectedFilter,
        availableValues: availableValues || [],
        value: target.value || ''
      });

      newState = state.get('filters')
        .slice(0, action.index)
        .concat(newType)
        .concat(state.get('filters').slice(action.index + 1));

      return state.setIn(['filters'], newState);
    case actionTypes.UPDATE_SELECTED_FILTER_VALUE:
      target = state.get('filters')[action.index];

      newType = Map({
        type: target.get('type') || '',
        availableValues: target.get('availableValues') || [],
        value: action.selectedValue
      });

      newState = state.get('filters')
        .slice(0, action.index)
        .concat(newType)
        .concat(state.get('filters').slice(action.index + 1));

      return state.setIn(['filters'], newState);
    case actionTypes.UPDATE_CATEGORIES:
      return state.set('categories', action.categories);
    default:
      return state;
  }
}
