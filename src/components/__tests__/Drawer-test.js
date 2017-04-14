import React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../Drawer'

describe('components/Drawer', () => {
  const results = {
    name: 'Harry Potter',
    author: 'J.K Rowling',
    year: '1996'
  }
  const wrapper = shallow(
    <Drawer
      cells={results}
      label="name"
    />
  )

  it('renders successfully', () => {
    expect(wrapper.find('a').is('.__sw-data__')).toBe(true)
    expect(wrapper.contains(<div>Harry Potter</div>)).toBe(true)
  })

  it('shows details when click', () => {
    expect(wrapper.state('showDetails')).toBe(false)
    wrapper.simulate('click', { preventDefault() {} })
    expect(wrapper.state('showDetails')).toBe(true)
  })

  it('renders details correctly', () => {
    wrapper.simulate('click', { preventDefault() {} })
    expect(wrapper.containsMatchingElement(
      <table>
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td>Harry Potter</td>
          </tr>
          <tr>
            <td><b>Author</b></td>
            <td>J.K Rowling</td>
          </tr>
          <tr>
            <td><b>Year</b></td>
            <td>1996</td>
          </tr>
        </tbody>
      </table>
    ))
  })
})
