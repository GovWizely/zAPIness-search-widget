import { shallow } from 'enzyme'
import Grid from '../Grid'

describe('components/Grid', () => {
  const clickHandler = jest.fn()
  const activePage = 2
  const grid = Grid(activePage, clickHandler)

  it('marks grid as non active if this is not current page', () => {
    const firstGrid = shallow(grid(1))

    expect(firstGrid.text()).toBe('1')

    expect(firstGrid.props().className).toBe('')
  })

  it('marks grid as active if this is current page', () => {
    const currentGrid = shallow(grid(2))

    expect(currentGrid.text()).toBe('2')
    expect(currentGrid.props().className).toBe('active')
  })
})
