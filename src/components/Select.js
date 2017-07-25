import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import List from './List';
import DownwardArrow from './DownwardArrow';

import styles from '../stylesheets/styles';
import colors from '../stylesheets/colors';

const Radium = require('radium');

const noResult = 'No results found';

class Select extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    const value = isUndefined(this.props.input) ? '' : this.props.input.value;

    this.state = {
      value: this.formatLabel(value),
      firstClick: true,
      isOpen: false,
      notFormattedKeyword: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      this.setState({
        value: this.formatLabel(nextProps.input.value)
      });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false
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

  clearHandler(e) {
    e.preventDefault();
    this.setState({
      value: '',
      firstClick: false,
      isOpen: false
    });
    this.textInput.focus();
  }

  noResultClickHandler(e) {
    e.preventDefault();

    this.setState({
      value: this.textInput.value,
      isOpen: true
    });
    this.textInput.focus();
  }

  matches(input) {
    if (this.state.firstClick) {
      return this.props.list;
    }

    const regex = new RegExp(input, 'i');
    const filteredList = filter(this.props.list, l => l.match(regex) && l !== input);
    return isEmpty(filteredList) ? noResult : filteredList;
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

  showSelection(e) {
    e.preventDefault();

    this.setState({
      value: '',
      isOpen: !this.state.isOpen
    });
  }

  inputStyle() {
    let basic = [
      styles.select.input,
      styles.select.placeholder,
      this.props.additionalInputStyle
    ];
    if (this.state.isOpen) {
      basic = basic.concat([
        styles.select.noSelect,
        styles.select.openSelectInputBorder
      ]);
    } else if (this.props.disabled) {
      basic = basic.concat(
        styles.select.disabled,
        styles.select.inputBorder
      );
    } else if (this.props.dropdownOnly) {
      basic = basic.concat(
        styles.select.dropdownOnly,
        styles.select.inputBorder
      );
    } else {
      basic = basic.concat([
        styles.select.inputBorder
      ]);
    }

    return basic;
  }

  formatLabel(match) {
    return this.props.allowFormatted ? startCase(match) : match;
  }

  render() {
    const {
      clearable,
      disabled,
      dropdownOnly,
      id,
      input
    } = this.props;

    const matches = this.matches(this.state.value);

    return (
      <div className="__sw-select-box__" style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <input
            {...input}
            type="text"
            style={this.inputStyle()}
            value={this.state.value}
            placeholder="Select as you type..."
            onBlur={val => input.onBlur(val)}
            onChange={e => this.changeHandler(e)}
            disabled={disabled}
            ref={(i) => { this.textInput = i; }}
            id={id}
          />
          { this.state.value !== '' && clearable &&
            <a
              href={'undefined'}
              onClick={e => this.clearHandler(e)}
              style={styles.filter.clearBtn}
              className="__sw-filter-clear-btn__"
            >
              &times;
            </a>
          }

          {
            dropdownOnly &&
            <a
              href={'undefined'}
              onClick={e => this.showSelection(e)}
              style={styles.filter.dropdownBtn}
              className="__sw-filter-dropdown-btn__"
            >
              <DownwardArrow
                backgroundColor={colors.aliceBlue}
                arrowColor={colors.darkChalk}
              />
            </a>
          }
        </div>
        {
          this.state.isOpen &&
          <div className="__sw-open-options__" style={styles.select.options} ref={this.setWrapperRef}>
            <ul style={styles.select.ul}>
              {
                matches === noResult &&
                <List
                  clickHandler={e => this.noResultClickHandler(e)}
                  containerStyle={styles.select.noResult}
                  key="noResult"
                  styles={styles.select.noResultLink}
                >
                  {noResult}
                </List>
              }
              {
                matches !== noResult && map(matches, (match, index) => (
                  <List
                    id={`option-${index}`}
                    clickHandler={e => this.clickHandler(e)}
                    containerStyle={styles.select.li}
                    key={index}
                    styles={styles.select.link}
                    value={match}
                  >
                    { this.formatLabel(match) }
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
  allowFormatted: true,
  clearable: true,
  disabled: false,
  dropdownOnly: false,
  list: []
};

Select.propTypes = {
  allowFormatted: PropTypes.bool,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  dropdownOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.string)
};

export default Radium(Select);
