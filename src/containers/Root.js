import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { withContentRect } from 'react-measure';
import App from './App';

const MeasuredApp = withContentRect('bounds')(
  ({ measureRef, contentRect, ...props }) => (
    <App
      innerRef={measureRef}
      contentRect={contentRect}
      {...props}
    />
));

const Root = props => (
  <Provider store={props.store}>
    <MeasuredApp />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired
};

export default Root;
