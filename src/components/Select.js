import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import filter from 'lodash/filter';

import styles from '../stylesheets/styles';
const Radium = require('radium');

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: startCase(this.props.input.value),
      firstClick: true,
      showOptions: false
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
      firstClick: false,
      showOptions: true
    });
  }

  clearHandler(e) {
    e.preventDefault();
    this.setState({
      value: '',
      firstClick: false
    });
    this.textInput.focus();
  }

  matches(input) {
    if (this.state.firstClick) {
      return this.props.list;
    }

    const regex = new RegExp(input, 'i');
    const filteredList = filter(this.props.list, l => l.match(regex) && l !== input);
    return filteredList;
  }

  clickHandler(e) {
    e.preventDefault();

    this.setState({
      value: startCase(e.target.getAttribute('value')),
      showOptions: false
    });

    this.props.input.onChange(e.target.getAttribute('value'));
  }

  render() {
    const {
      clearable,
      input,
      list,
      name,
      disabled,
      ...rest
    } = this.props;

    const notSelectedInputStyle = [
      styles.select.input,
      styles.select.noSelect,
      styles.select.placeholder,
      styles.select.openSelectInputBorder
    ];

    const inputStyle = [
      styles.select.input,
      styles.select.placeholder,
      styles.select.inputBorder
    ];

    return (
      <div className="__sw-select-box__" style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <input
            {...input}
            type="text"
            name={name}
            placeholder="select one"
            style={this.state.showOptions ? notSelectedInputStyle : inputStyle }
            value={this.state.value}
            onBlur={val => input.onBlur(val)}
            onChange={e => this.changeHandler(e)}
            ref={(input) => { this.textInput = input; }}
          />
          { this.state.value !== '' && clearable &&
            <a
              href={'undefined'}
              onClick={e => this.clearHandler(e)}
              style={styles.filter.clearBtn}
            >
              &times;
            </a>
          }
        </div>
        {
          this.state.showOptions &&
          <div style={styles.select.options}>
            <ul style={styles.select.ul}>
              {
                map(this.matches(this.state.value), (match, index) => (
                  <li key={`option-${index}`} style={styles.select.li}>
                    <a
                      href="{undefined}"
                      onClick={e => this.clickHandler(e)}
                      value={match}
                      style={styles.select.link}
                      key={index}
                    >
                      { startCase(match) }
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

Select.propTypes = {
  input: PropTypes.shape({}),
  list: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string
};

export default Radium(Select);
