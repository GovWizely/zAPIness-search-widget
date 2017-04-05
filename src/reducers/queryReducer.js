const { Map } = require('immutable');

const initialState = Map({
  categories: [],
  keyword: "",
  offset: 0,
  pageNum: 1,
  filters: [],
  data: undefined,
  error: []
});

export default function queryReducer(state = initialState, action) {
  let newState, availableValues, target, newType;

  switch (action.type) {
    case 'LOAD_RESULT':
      return state.set('data', action.data).set('error', [])
    case 'LOAD_ERROR':
      return state.set('error', action.error)
    case 'UPDATE_KEYWORD':
      return state.set('keyword', action.keyword)
    case 'ADD_FILTER':
      newState = state.get('filters').concat(Map({
        type: "",
        availableValues: [],
        value: ""
      }))
      return state.setIn(['filters'], newState)
    case 'REMOVE_SELECTED_FILTER':
      newState = state.get('filters')
        .slice(0, action.index)
        .concat(state.get('filters').slice(action.index + 1))

      return state.setIn(['filters'], newState)
    case 'REMOVE_ALL_FILTERS':
      return state.set('filters', []).set('error', [])
    case 'UPDATE_SELECTED_FILTER':
      availableValues = state.get('categories')[action.selectedFilter]

      target = state.get('filters')[action.index]

      newType = Map({
        type: action.selectedFilter,
        availableValues: availableValues || [],
        value: target.value || ""
      })

      newState = state.get('filters')
        .slice(0, action.index)
        .concat(newType)
        .concat(state.get('filters').slice(action.index + 1))

      return state.setIn(['filters'], newState)
    case 'UPDATE_SELECTED_FILTER_VALUE':
      target = state.get('filters')[action.index]

      newType = Map({
        type: target.get('type') || "",
        availableValues: target.get('availableValues') || [],
        value: action.selectedValue
      })

      newState = state.get('filters')
        .slice(0, action.index)
        .concat(newType)
        .concat(state.get('filters').slice(action.index + 1))

      return state.setIn(['filters'], newState)
    case 'UPDATE_PAGE_NUM':
      return state.merge({
        pageNum: action.pageNum,
        offset: action.pageNum * 10
      })
    case 'UPDATE_CATEGORIES':
      return state.set('categories', action.categories)
    default:
      return state
  }
}
