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
      value: startCase(this.props.input.value)
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value
    });
  }

  clearHandler() {
    return;
  }

  matches(input) {
    //const matchList = generateList(this.props.list);
    const regex = new RegExp(input, 'i');
    const filteredList = filter(this.props.list, l => l.match(regex) && l !== input);
    return filteredList
  }

  clickHandler(e) {
    e.preventDefault();

    this.setState({
      value: startCase(e.target.getAttribute('value'))
    });
  }

  render() {
    const {
      input,
      list,
      name,
      ...rest
    } = this.props;

    return (
      <div className="__sw-select-box__">
        <div>
          <input
            {...input}
            type="text"
            name={name}
            placeholder="select one"
            style={styles.form.input}
            value={this.state.value}
            onChange={e => this.changeHandler(e)}
          />
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

Select.PropTypes = {
  input: PropTypes.shape({}).isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired
};

export default Select;
