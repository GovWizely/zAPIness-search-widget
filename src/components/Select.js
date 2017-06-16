import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import { renderInput } from './Input';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import styles from '../stylesheets/styles';

const generateList = list => reduce(list, (options, el) => {
  options.push({
    value: el,
    label: startCase(el)
  });
  return options;
}, []);

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  changeHandler(value) {
    debugger
    return;
  }

  clearHandler() {
    return;
  }

  matches(input) {

    const matchList = generateList(this.props.list);
    //debugger
    return this.props.list
  }

  clickHandler(e) {
    debugger
    this.setState({
      value: target
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
            value={startCase(input.value) || ''}
            onChange={value => input.onChange(value)}
          />
        </div>
      </div>
    )
  }
}

export default Select;


{/* <ul>
  {
    map(this.matches(this.state.input), (match, index) => (
      <li onClick={(e) => this.clickHandler(e)} value={match}>
        { startCase(match) }
      </li>
    ))
  }
</ul> */}
