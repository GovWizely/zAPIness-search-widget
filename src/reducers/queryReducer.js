import * as actionTypes from '../constants/ActionTypes'

const { Map } = require('immutable')

const initialState = Map({
  keyword: '',
  offset: 0,
  pageNum: 1,
  data: undefined,
  error: []
})

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_RESULT:
      return state.set('data', action.data)
    case actionTypes.LOAD_ERROR:
      return state.set('error', action.error)
    case actionTypes.CLEAR_ERROR:
      return state.set('error', [])
    case actionTypes.UPDATE_KEYWORD:
      return state.set('keyword', action.keyword)
    case actionTypes.UPDATE_PAGE_NUM:
      return state.merge({
        pageNum: action.pageNum,
        offset: (action.pageNum - 1) * 10
      })
    default:
      return state
  }
}
