import React from 'react';
import PropTypes from 'prop-types';
import Breakpoint from './Breakpoint';

const TabletView = props => (
  <Breakpoint name="tablet">
    {props.children}
  </Breakpoint>
);

TabletView.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default TabletView;
