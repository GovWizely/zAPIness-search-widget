import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('components/Input', () => {
  it('renders successfully', () => {
    const changeHandler = jest.fn();
    const nameProp = 'ok';
    const placeholderProp = 'Super cool';

    const input = shallow(
      <Input
        name={nameProp}
        changeHandler={changeHandler}
        placeholder={placeholderProp}
      />
    );

    const { name, type, className, placeholder } = input.props();

    expect(name).toBe(nameProp);
    expect(type).toBe('text');
    expect(className).toBe('__input__');
    expect(placeholder).toBe(placeholderProp);

    input.simulate('change');
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });
});
