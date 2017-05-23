import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';
import colors from '../stylesheets/colors';

const Spinner = require('react-spinkit');
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
          <Spinner
            name="line-scale"
            color={colors.chalk}
            fadeIn="none"
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
