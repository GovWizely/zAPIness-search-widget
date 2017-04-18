import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import ConnectedApp, { App } from '../App'

const { Map } = require('immutable')

describe('containers/App', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  const initialState = Map({
    categories: [],
    keyword: '',
    offset: 0,
    pageNum: 1,
    filters: [],
    data: undefined,
    error: [],
    query: Map({
      keyword: '',
      offset: 0,
      filters: []
    }),
    isFetching: false
  })

  const store = mockStore(initialState)

  const handleSelect = jest.fn()
  const getCategories = jest.fn()

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <App
          query={initialState}
          handleSelect={handleSelect}
          getCategories={getCategories}
        />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('dispatch actions to store', () => {
    shallow(
      <Provider store={store}>
        <ConnectedApp
          query={initialState}
          handleSelect={handleSelect}
          getCategories={getCategories}
        />
      </Provider>
    )

    expect(store.getActions().length).toEqual(1)
  })
})
