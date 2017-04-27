import React from 'react'
import { shallow } from 'enzyme'
import List from '../List'

describe('components/List', () => {
  it('renders successfully', () => {
    const clickHandler = jest.fn()
    const className = 'ok'
    const content = 'Lorem Ipsum'

    const input = shallow(
      <List
        className={className}
        clickHandler={clickHandler}
      >
        {content}
      </List>
    )

    expect(input.containsMatchingElement(
      <li>
        <a href="undefined">Lorem Ipsum</a>
      </li>
    ))

    const props = input.props()

    expect(props.className).toBe(className)

    input.find('a').simulate('click')
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})
