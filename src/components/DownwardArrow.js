import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/assign';
import styles from '../stylesheets/styles';

const DownwardArrow = props => (
  <div style={{ position: 'relative' }}>
    <div
      style={
        assign(styles.arrow.visibleArrow, { borderTop: `7px solid ${props.arrowColor}` })
      }
    />
    <div
      style={
        assign(styles.arrow.hiddenArrow, { borderTop: `7px solid ${props.backgroundColor}` })
      }
    />
  </div>
);

DownwardArrow.propTypes = {
  arrowColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default DownwardArrow;
