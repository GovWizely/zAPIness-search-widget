import React from 'react';
import { shallow } from 'enzyme';
import DebouncedInput from '../DebouncedInput';

describe('components/DebouncedInput', () => {
  const clearHandler = jest.fn();
  const placeholder = 'Select';
  const input = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    value: ''
  };

  it('renders successfully', () => {
    const wrapper = shallow(
      <DebouncedInput
        input={input}
        placeholder={placeholder}
        clearHandler={clearHandler}
      />
    );

    expect(wrapper.find('div.__sw-debounced-input__').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });
});
