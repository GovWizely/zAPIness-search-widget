import React from 'react'
import { shallow } from 'enzyme'
import SelectInput from '../SelectInput'

describe('components/SelectInput', () => {
  it('renders successfully', () => {
    const changeHandler = jest.fn()
    const fieldName = 'select'
    const list = ['Earth', 'Mars', 'Pluto']

    const input = shallow(
      <SelectInput
        fieldName={fieldName}
        changeHandler={changeHandler}
        list={list}
      />
    )

    expect(input.containsMatchingElement(
      <select>
        <option>SELECT ONE</option>
        <option>Earth</option>
        <option>Mars</option>
        <option>Pluto</option>
      </select>
    ))

    const props = input.props()

    expect(props.name).toBe(fieldName)
    expect(props.component).toBe('select')

    input.find('Field').simulate('change')
    expect(changeHandler).toHaveBeenCalledTimes(1)
  })
})
