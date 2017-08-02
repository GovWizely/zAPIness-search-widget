import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import assign from 'lodash/assign';

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

  inputClickHandler(e) {
    if (this.props.dropdownOnly) {
      e.preventDefault();

      this.setState({
        isOpen: !this.state.isOpen
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

  inputStyle() {
    const basic = [
      styles.select.input,
      this.props.additionalInputStyle
    ];

    let inputStyles;

    if (this.state.isOpen) {
      inputStyles = basic.concat([
        styles.select.noSelect,
        styles.select.openSelectInputBorder
      ]);
    } else if (this.props.disabled) {
      inputStyles = basic.concat(
        styles.select.disabled,
        styles.select.inputBorder
      );
    } else if (this.props.dropdownOnly) {
      inputStyles = basic.concat(
        styles.select.hover,
        styles.select.dropdownOnly,
        styles.select.inputBorder
      );
    } else {
      inputStyles = basic.concat([
        styles.select.inputBorder
      ]);
    }

    return inputStyles;
  }

  formatLabel(match) {
    return this.props.allowFormatted ? startCase(match) : match;
  }

  render() {
    const {
      className,
      clearable,
      disabled,
      dropdownOnly,
      id,
      input,
      placeholder
    } = this.props;

    const matches = this.matches(this.state.value);

    return (
      <div className={className}>
        <div style={{ position: 'relative' }}>
          <input
            {...input}
            type="text"
            style={this.inputStyle()}
            value={this.state.value}
            placeholder={placeholder}
            onClick={e => this.inputClickHandler(e)}
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
              onClick={e => this.inputClickHandler(e)}
              style={styles.filter.dropdownBtn}
              className="__sw-filter-dropdown-btn__"
            >
              {
                this.state.isOpen &&
                <DownwardArrow
                  backgroundColor={colors.white}
                  arrowColor={colors.darkChalk}
                />
              }
              {
                !this.state.isOpen &&
                <DownwardArrow
                  backgroundColor={colors.whiteSmoke}
                  arrowColor={colors.darkChalk}
                />
              }
            </a>
          }
        </div>
        {
          this.state.isOpen &&
          <div className="__sw-open-options__" style={assign(styles.select.options, styles.select[className])} ref={this.setWrapperRef}>
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
  additionalInputStyle: {},
  allowFormatted: true,
  className: '',
  clearable: true,
  disabled: false,
  dropdownOnly: false,
  list: [],
  placeholder: ''
};

Select.propTypes = {
  additionalInputStyle: PropTypes.shape({}),
  allowFormatted: PropTypes.bool,
  className: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  dropdownOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string
};

export default Radium(Select);
