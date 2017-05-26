import * as actionTypes from '../constants/ActionTypes';

const { Map } = require('immutable');

const initialState = Map({
  categories: [],
  filters: []
});

export default function filterReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case actionTypes.ADD_FILTER:
      newState = state.get('filters').concat(Map({
        type: action.filterType,
        value: action.value
      }));

      return state.setIn(['filters'], newState);
    case actionTypes.REMOVE_SELECTED_FILTER:
      newState = state.get('filters')
        .slice(0, action.index)
        .concat(state.get('filters').slice(action.index + 1));

      return state.setIn(['filters'], newState);
    case actionTypes.REMOVE_ALL_FILTERS:
      return state.set('filters', []);
    case actionTypes.UPDATE_CATEGORIES:
      return state.set('categories', action.categories);
    default:
      return state;
  }
}
