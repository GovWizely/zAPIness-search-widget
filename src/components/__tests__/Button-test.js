import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('components/Button', () => {
  it('renders successfully', () => {
    const clickHandler = jest.fn();
    const button = shallow(
      <Button
        kind="primary"
        className="btn"
        clickHandler={clickHandler}
        type="button"
      >
        Powerful
      </Button>
    );

    const { className, type } = button.props();

    button.simulate('click');

    expect(button.text()).toBe('Powerful');
    expect(className).toBe('btn');
    expect(type).toBe('button');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
