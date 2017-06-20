import React from 'react';
import { shallow } from 'enzyme';
import Select from '../Select';

describe('components/Select', () => {
  const list = [
    "earth",
    "mars",
    "jupiter"
  ];
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const input = {
    onChange: onChange,
    onBlur: onBlur,
    value: ''
  };

  it('renders successfully', () => {
    const select = shallow(
      <Select
        clearable={true}
        list={list}
        id="randomId"
        input={input}
      />
    );

    expect(select.find('div.__sw-select-box__').exists()).toBe(true);
    expect(select.find('input').exists()).toBe(true);
  });

  it('shows options when input is being changed', () => {
    const select = shallow(
      <Select
        allowFormatted={false}
        clearable={true}
        list={list}
        id="randomId"
        input={input}
      />
    );

    const input = select.find('input');
    input.simulate('change', { target: { value: '' }});
    expect(select.find('div.__sw-open-options__').exists()).toBe(true);
    expect(select.find('List').length).toBe(3);
    expect(select.find('List').children().nodes).toEqual(list);
  });

  it('shows matching options when user types', () => {
    const select = shallow(
      <Select
        allowFormatted={false}
        clearable={true}
        list={list}
        id="randomId"
        input={input}
      />
    );

    const input = select.find('input');
    input.simulate('change', { target: { value: 'a' }});
    expect(select.find('div.__sw-open-options__').exists()).toBe(true);
    expect(select.find('List').length).toBe(2);
    expect(select.find('List').children().nodes).toEqual(['earth', 'mars']);
  });
});
