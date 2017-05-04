import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import queryReducer from './queryReducer'
import fetchingReducer from './fetchingReducer'
import filterReducer from './filterReducer'
import toggleReducer from './toggleReducer'

const rootReducer = combineReducers({
  form: formReducer,
  query: queryReducer,
  isFetching: fetchingReducer,
  filters: filterReducer,
  toggle: toggleReducer
})

export default rootReducer
