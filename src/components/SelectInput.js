import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import startCase from 'lodash/startCase';
import reduce from 'lodash/reduce';

import 'react-select/dist/react-select.css';
import styles from '../stylesheets/styles';

const generateList = list => reduce(list, (options, el) => {
  options.push({
    value: el,
    label: startCase(el)
  });
  return options;
}, []);

const SelectInput = ({
  meta: { error },
  clearable,
  disabled,
  input,
  list,
  ...rest
}) => {
  const hasErrors = !disabled && error === 'Required';

  return (
    <div style={hasErrors ? styles.error : undefined}>
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
};

SelectInput.defaultProps = {
  clearable: true,
  disabled: false,
  input: {},
  meta: {
    error: undefined
  },
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
  meta: PropTypes.shape({
    error: PropTypes.string
  }),
  styles: PropTypes.shape({})
};

export default SelectInput;
