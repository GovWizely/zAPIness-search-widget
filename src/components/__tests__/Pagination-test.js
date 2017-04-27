import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '../Pagination'

describe('components/Pagination', () => {
  const totalPage = 5
  const totalNumButton = 3
  const activePage = 2
  const onSelect = jest.fn()

  it('renders successfully', () => {
    const pagination = shallow(
      <Pagination
        totalPage={totalPage}
        totalNumButton={totalNumButton}
        activePage={activePage}
        onSelect={onSelect}
      />
    )

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a>« Prev</a></li>
          <li><a>1</a></li>
          <li><a className="active">2</a></li>
          <li><a>3</a></li>
          <li><a>...</a></li>
          <li><a>5</a></li>
          <li><a>Next ›</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ))
  })

  it('does not show prev button if current page is the first page', () => {
    const pagination = shallow(
      <Pagination
        totalPage={5}
        totalNumButton={3}
        activePage={1}
        onSelect={onSelect}
      />
    )

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a className="active">1</a></li>
          <li><a>2</a></li>
          <li><a>...</a></li>
          <li><a>5</a></li>
          <li><a>Next ›</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ))
  })

  it('does not show next button if current page is last page', () => {
    const pagination = shallow(
      <Pagination
        totalPage={5}
        totalNumButton={3}
        activePage={5}
        onSelect={onSelect}
      />
    )

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a>‹ Prev</a></li>
          <li><a>1</a></li>
          <li><a>...</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a className="active">5</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ))
  })
})
