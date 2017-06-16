import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import filter from 'lodash/filter';

import styles from '../stylesheets/styles';

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
      firstClick: false,
      showOptions: true
    });
  }

  matches(input) {
    console.log(this.state.firstClick);
    let returnList = null;
    if (this.state.firstClick) {
      // return this.props.list;
      returnList = this.props.list;
    }

    const regex = new RegExp(input, 'i');
    const filteredList = filter(this.props.list, l => l.match(regex) && l !== input);
    // return filteredList;
    returnList = filteredList;
    console.log(returnList);

    return returnList;
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

    return (
      <div className="__sw-select-box__">
        <div style={{ position: 'relative' }}>
          <input
            {...input}
            type="text"
            name={name}
            placeholder="select one"
            style={styles.form.input}
            value={this.state.value}
            onBlur={val => input.onBlur(val)}
            onChange={e => this.changeHandler(e)}
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
          <div>
            <ul>
              {
                map(this.matches(this.state.value), match => (
                  <li>
                    <a
                      href="{undefined}"
                      onClick={e => this.clickHandler(e)}
                      value={match}
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

export default Select;
