import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import SelectInput from '../SelectInput';

describe('components/SelectInput', () => {
  const list = ['Earth', 'Mars', 'Pluto'];
  const onChange = jest.fn();
  const input = { name: 'name', value: 'text', onChange };

  it('renders successfully', () => {
    const selectInput = shallow(
      <SelectInput
        input={input}
        clearable
        disabled={false}
        list={list}
      />
    );

    expect(selectInput.containsMatchingElement(
      <select>
        <option>SELECT ONE</option>
        <option>Earth</option>
        <option>Mars</option>
        <option>Pluto</option>
      </select>
    ));

    const props = selectInput.find(Select).props();
    expect(props.options).toEqual(
      [
        { value: 'Earth', label: 'Earth' },
        { value: 'Mars', label: 'Mars' },
        { value: 'Pluto', label: 'Pluto' }
      ]
    );

    selectInput.find(Select).simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
