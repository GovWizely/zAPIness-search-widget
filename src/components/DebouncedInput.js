import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import debounce from 'lodash/debounce'

import styles from '../stylesheets/styles';

const Radium = require('radium');

class DebouncedInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.input.value
    }
    this.lastPropValue = props.input.value

    this.debouncedOnChange = debounce(event => {
      props.input.onChange(event.target.value)
    }, 500);

    this.handleChange = event => {
      event.persist();
      this.setState({
        value: event.target.value
      });
      this.debouncedOnChange(event);
    }
  }

  getValue() {
    const value = this.props.input.value !== this.lastPropValue ?
      this.props.input.value :
      this.state.value

    this.lastPropValue = this.props.input.value;

    return value;
  }

  render() {
    const {
      input,
      placeholder,
      clearHandler
    } = this.props;

    return (
      <div className='__sw-debounced-input__'>
        <input
          value={this.getValue()}
          onChange={this.handleChange}
          placeholder={placeholder}
          style={styles.form.input}
        />
        { input.value !== '' &&
          <span
            style={styles.form.clearBtn}
            onClick={() => clearHandler()}
            className='__sw-input-clear-btn__'
          >&times;</span>
        }
      </div>
    )
  }
}

export default Radium(DebouncedInput);
