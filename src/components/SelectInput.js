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

const SelectInput = ({
  clearable,
  disabled,
  input,
  list,
  ...rest
}) => (
  <div>
    <Select
      {...rest}
      clearable={clearable}
      disabled={disabled}
      onBlur={() => input.onBlur(input.value)}
      onChange={value => input.onChange(value)}
      options={generateList(list)}
      value={input.value || ''}
      arrowRenderer={() => {}}
    />
  </div>
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
  input: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.any
  ]),
  list: PropTypes.arrayOf(String).isRequired,
  styles: PropTypes.shape({})
};

export default SelectInput;
