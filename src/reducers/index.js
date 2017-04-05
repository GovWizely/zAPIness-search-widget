import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import queryReducer from './queryReducer';

const rootReducer = combineReducers({
  form: formReducer,
  query: queryReducer
});

export default rootReducer;
