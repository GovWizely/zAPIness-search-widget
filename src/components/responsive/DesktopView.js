import React from 'react';
import PropTypes from 'prop-types';
import Breakpoint from './Breakpoint';

const DesktopView = props => (
  <Breakpoint>
    {props.children}
  </Breakpoint>
);

DesktopView.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default DesktopView;
