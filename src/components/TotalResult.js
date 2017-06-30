import React from 'react';
import PropTypes from 'prop-types';

import styles from '../stylesheets/styles';

const TotalResult = ({ start, end, total }) => (
  <div
    style={styles.pagination.total}
    className="__sw-total-result__"
  >
    { start } - { end } of { total } results shown
  </div>
);

TotalResult.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default TotalResult;
