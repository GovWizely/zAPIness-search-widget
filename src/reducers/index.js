import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import queryReducer from './queryReducer'
import fetchingReducer from './fetchingReducer'

const rootReducer = combineReducers({
  form: formReducer,
  query: queryReducer,
  isFetching: fetchingReducer
})

export default rootReducer
