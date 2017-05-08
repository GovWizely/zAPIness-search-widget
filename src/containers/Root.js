import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';

const Root = props => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired
};

export default Root;
