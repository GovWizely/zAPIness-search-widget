import React from 'react';
import PropTypes from 'prop-types';
import Breakpoint from './Breakpoint';

const DesktopView = props => (
  <Breakpoint>
    {props.children}
  </Breakpoint>
);

DesktopView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.any
  ]).isRequired
};

export default DesktopView;
