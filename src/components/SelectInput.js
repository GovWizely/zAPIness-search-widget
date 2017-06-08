import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import startCase from 'lodash/startCase';
import reduce from 'lodash/reduce';

import 'react-select/dist/react-select.css';

const generateList = list => reduce(list, (options, el) => {
  options.push({
    value: el,
    label: startCase(el)
  });
  return options;
}, []);

const SelectInput = props => (
  <Select
    {...props}
    name={props.fieldName}
    disabled={props.disabled}
    onChange={value => props.input.onChange(value)}
    options={generateList(props.list)}
    value={props.input.value || ''}
    style={props.styles}
    onBlur={() => props.input.onBlur(props.input.value)}
  />
);

SelectInput.defaultProps = {
  disabled: false,
  input: {},
  styles: {}
};

SelectInput.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(String).isRequired,
  styles: PropTypes.shape({}),
  input: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.any
  ])
};

export default SelectInput;
