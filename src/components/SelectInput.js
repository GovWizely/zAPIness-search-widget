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
    clearable={props.clearable}
    disabled={props.disabled}
    name={props.fieldName}
    onBlur={() => props.input.onBlur(props.input.value)}
    onChange={value => props.input.onChange(value)}
    options={generateList(props.list)}
    style={props.styles}
    value={props.input.value || ''}
  />
);

SelectInput.defaultProps = {
  clearable: true,
  disabled: false,
  input: {},
  styles: {}
};

SelectInput.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  input: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.any
  ]),
  list: PropTypes.arrayOf(String).isRequired,
  styles: PropTypes.shape({})
};

export default SelectInput;
