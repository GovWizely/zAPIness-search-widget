import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import DebouncedInput from './DebouncedInput';

const Radium = require('radium');

const Input = props => (
  <Field
    name={props.name}
    component={DebouncedInput}
    value={props.value}
    className="__input__"
    placeholder={props.placeholder}
    onChange={props.changeHandler}
    clearHandler={props.clearHandler}
  />
);

Input.defaultProps = {
  clearHandler: () => {},
  type: 'text',
  value: ''
};

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clearHandler: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};

export default Radium(Input);
