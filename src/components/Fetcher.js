import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';
import colors from '../stylesheets/colors';

import { Wave } from 'better-react-spinkit';

const lookingGlass = require('../glass.png');

const Radium = require('radium');

const Fetcher = (props) => {
  const {
    fetching,
    submitHandler
  } = props;

  return (
    <div
      style={fetching ? styles.loadingIconWrapper : styles.lookingGlassWrapper}
      onClick={fetching ? () => { } : submitHandler}
      role="button"
    >
      {
        !fetching &&
        <span>
          <img src={lookingGlass} alt="Search" style={styles.lookingGlass} />
        </span>
      }
      {
        fetching &&
        <span>
          <Wave
            color={colors.chalk}
            size={34}
            reverse
          />
        </span>
      }
    </div>
  );
};

Fetcher.propTypes = {
  fetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default Radium(Fetcher);
