import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import styles from '../stylesheets/styles';

const Radium = require('radium');

const renderInput = ({ input, type, placeholder, clearHandler }) => (
  <div>
    <input {...input} type={type} placeholder={placeholder} style={styles.form.input} />
    { input.value !== '' && <span style={styles.form.clearBtn} onClick={() => clearHandler()}>&times;</span>}
  </div>
);

const Input = props => (
  <Field
    name={props.name}
    component={Radium(renderInput)}
    type="text"
    className="__input__"
    placeholder={props.placeholder}
    onChange={props.changeHandler}
    clearHandler={props.clearHandler}
  />
);

Input.defaultProps = {
  clearHandler: () => {},
  type: 'text'
};

renderInput.defaultProps = {
  clearHandler: () => {},
  placeholder: '',
  type: 'text'
};

renderInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  clearHandler: PropTypes.func
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clearHandler: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};

export default Radium(Input);
