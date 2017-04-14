import React from 'react'
import configureMockStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { FieldArray } from 'redux-form'

import ConnectedFilter, { Filter } from '../Filter'

const { Map } = require('immutable')

describe('components/Filter', () => {
  const addFilter = jest.fn()
  const removeFilter = jest.fn()
  const removeAllFilters = jest.fn()
  const selectFilterHandler = jest.fn()
  const selectFilterValueHandler = jest.fn()
  const submitHandler = jest.fn()
  const mockStore = configureMockStore()
  const store = mockStore({
    categories: [],
    filters: []
  })

  const filter = shallow(<Filter
    addFilter={addFilter}
    fields={[]}
    form={{}}
    query={Map({
      filters: [
        Map({ type: '', value: '', availableValues: [1, 2, 3] })
      ],
      errors: []
    })}
    removeFilter={removeFilter}
    removeAllFilters={removeAllFilters}
    selectFilterHandler={selectFilterHandler}
    selectFilterValueHandler={selectFilterValueHandler}
    submitHandler={submitHandler}
  />)

  it('renders successfully', () => {
    expect(filter.find('div').is('.__sw-filter__')).toBe(true)
    expect(filter.find('Button').length).toBe(1)
  })

  it('shows details when click', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ConnectedFilter
          addFilter={addFilter}
          fields={[]}
          form={{}}
          query={Map({
            filters: [
              Map({ type: '', value: '', availableValues: [1, 2, 3] })
            ],
            errors: []
          })}
          removeFilter={removeFilter}
          removeAllFilters={removeAllFilters}
          selectFilterHandler={selectFilterHandler}
          selectFilterValueHandler={selectFilterValueHandler}
          submitHandler={submitHandler}
        />
      </Provider>
    )

    expect(wrapper.find('Button').length).toBe(1)
    wrapper.find('Button').simulate('click')

    expect(store.getActions().length).toBe(1)
    expect(store.getActions()[0]).toEqual({ type: 'ADD_FILTER' })
  })
})
