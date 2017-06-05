import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';

const lookingGlass = require('../glass.png');

const Radium = require('radium');

const Fetcher = (props) => {
  const {
    submitHandler,
    fetching
  } = props;

  return (
    <div
      style={styles.lookingGlassWrapper}
      onClick={fetching ? () => { } : submitHandler}
      role="button"
      disabled={fetching}
      className="__sw-fetcher__"
    >
      <span>
        <img
          src={lookingGlass}
          alt="Search"
          style={styles.lookingGlass}
        />
      </span>
    </div>
  );
};

Fetcher.propTypes = {
  fetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default Radium(Fetcher);
