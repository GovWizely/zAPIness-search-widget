import * as actionTypes from '../constants/ActionTypes';

const { Map } = require('immutable');

const initialState = Map({
  keyword: '',
  offset: 0,
  pageNum: 1,
  data: undefined,
  error: undefined,
  fields: [],
  showAll: false,
  hasFilter: false
});

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_RESULT:
      return state.set('data', action.data);
    case actionTypes.LOAD_ERROR:
      return state.set('error', action.error);
    case actionTypes.CLEAR_ERROR:
      return state.set('error', undefined);
    case actionTypes.RESET_PAGE_NUM:
      return state.merge({
        pageNum: 1,
        offset: 0
      });
    case actionTypes.UPDATE_KEYWORD:
      return state.set('keyword', action.keyword);
    case actionTypes.UPDATE_PAGE_NUM:
      return state.merge({
        pageNum: action.pageNum,
        offset: (action.pageNum - 1) * 10
      });
    case actionTypes.UPDATE_FIELDS:
      return state.set('fields', action.fields);
    case actionTypes.UPDATE_SHOW_ALL:
      return state.set('showAll', action.showAll);
    case actionTypes.UPDATE_HAS_FILTER:
      return state.set('hasFilter', action.hasFilter);
    default:
      return state;
  }
}
