import React from 'react'
import { shallow } from 'enzyme'
import Result from '../Result'

describe('components/Result', () => {
  const activePage = 1
  const paginationHandleSelect = jest.fn()
  const query = {
    get: jest.fn(),
    data: {
      metadata: {
        total: 3
      },
      aggregations: { type: 1 },
      results: [1, 2, 3]
    }
  }

  it('renders successfully', () => {
    const result = shallow(
      <Result
        activePage={activePage}
        paginationHandleSelect={paginationHandleSelect}
        query={query}
      />
    )

    expect(result.find('div.__sw-result__').length).toBe(1)
    expect(result.find('Pagination').length).toBe(1)
    expect(result.find('Drawer').length).toBe(3)

    result.find('Drawer').forEach((node, index) => {
      expect(node.props().cells).toEqual(query.data.results[index])
      expect(node.props().label).toEqual('type')
    })
  })

  it('renders no result message if result is empty', () => {
    const result = shallow(
      <Result
        activePage={activePage}
        paginationHandleSelect={paginationHandleSelect}
        query={{
          get: jest.fn(),
          data: {
            metadata: {
              total: 0
            },
            results: []
          }
        }}
      />
    )

    expect(result.find('div.__sw-no-result__').length).toBe(1)
    expect(result.find('Pagination').length).toBe(0)
  })
})
