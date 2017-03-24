const initialState = {
  keyword: "",
  pageNum: 1,
  offset: 0
}

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_RESULT':
      return {
        ...state,
        data: action.data
      }
    case 'LOAD_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'UPDATE_KEYWORD':
      return {
        ...state,
        keyword: action.keyword
      }
    case 'UPDATE_PAGE_NUM':
      return {
        ...state,
        pageNum: action.pageNum,
        offset: action.pageNum * 10
      }
    default:
      return state
  }
}
