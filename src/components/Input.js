import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import styles from '../stylesheets/styles'

const Radium = require('radium')

const Input = props => (
  <Field
    name={props.name}
    component="input"
    type="text"
    style={styles.form.input}
    className="__input__"
    placeholder={props.placeholder}
    onChange={props.changeHandler}
  />
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default Radium(Input)
