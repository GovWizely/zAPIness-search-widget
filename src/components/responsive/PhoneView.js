import React from 'react';
import PropTypes from 'prop-types';
import Breakpoint from './Breakpoint';

const PhoneView = props => (
  <Breakpoint name="phone">
    {props.children}
  </Breakpoint>
);

PhoneView.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.func,
      PropTypes.shape({})
    ]
  ).isRequired
};

export default PhoneView;
