import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

import List from './List';

import styles from '../stylesheets/styles';

const Radium = require('radium');

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: startCase(this.props.input.value),
      firstClick: true,
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      this.setState({
        value: startCase(nextProps.input.value)
      });
    }
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
      firstClick: false,
      isOpen: true
    });
  }

  focusHandler(e) {
    this.props.optionHandler(e.target.id);
  }

  clearHandler(e) {
    e.preventDefault();
    this.setState({
      value: '',
      firstClick: false,
      isOpen: false
    });
    this.textInput.focus();
  }

  matches(input) {
    if (this.state.firstClick) {
      return this.props.list;
    }

    const regex = new RegExp(input, 'i');
    const filteredList = filter(this.props.list, l => l.match(regex) && l !== input);
    return isEmpty(filteredList) ? ['No results found'] : filteredList;
  }

  clickHandler(e) {
    e.preventDefault();

    const targetValue = e.target.getAttribute('value');

    this.setState({
      value: startCase(targetValue),
      isOpen: false
    });

    this.props.input.onChange(targetValue);
  }

  render() {
    const {
      clearable,
      id,
      input,
      showOptions
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

    const matches = this.matches(this.state.value);

    return (
      <div className="__sw-select-box__" style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <input
            {...input}
            type="text"
            style={showOptions && this.state.isOpen ? notSelectedInputStyle : inputStyle}
            value={this.state.value}
            placeholder="Select as you type..."
            onBlur={val => input.onBlur(val)}
            onChange={e => this.changeHandler(e)}
            onFocus={e => this.focusHandler(e)}
            ref={(i) => { this.textInput = i; }}
            id={id}
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
          (this.state.isOpen && showOptions) &&
          <div style={styles.select.options}>
            <ul style={styles.select.ul}>
              {
                map(matches, (match, index) => (
                  <List
                    id={`option-${index}`}
                    clickHandler={e => this.clickHandler(e)}
                    containerStyle={styles.select.li}
                    key={index}
                    styles={styles.select.link}
                    value={match}
                  >
                    { startCase(match) }
                  </List>
                ))
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

Select.defaultProps = {
  list: [],
  clearable: true
};

Select.propTypes = {
  clearable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
  optionHandler: PropTypes.func.isRequired,
  showOptions: PropTypes.bool.isRequired
};

export default Radium(Select);
