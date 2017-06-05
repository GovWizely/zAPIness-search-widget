import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';

const lookingGlass = require('../glass.png');

const Radium = require('radium');

const Fetcher = (props) => {
  const {
    submitHandler,
    fetching,
    keyword
  } = props;

  return (
    <div
      style={styles.lookingGlassWrapper}
      onClick={fetching ? () => { } : data => submitHandler(data, keyword)}
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
  submitHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired
};

export default Radium(Fetcher);
