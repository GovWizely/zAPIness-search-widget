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
      firstClick: true
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
      firstClick: false
    });
  }

  clearHandler(e) {
    e.preventDefault();
    this.setState({
      value: ''
    });
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
      value: startCase(e.target.getAttribute('value'))
    });
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
      </div>
    );
  }
}

Select.propTypes = {
  input: PropTypes.shape({}).isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired
};

export default Select;
