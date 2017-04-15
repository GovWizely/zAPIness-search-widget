import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'

import ConnectedForm, { Form } from '../Form'

describe('components/Form', () => {
  const submitHandler = jest.fn()
  const mockStore = configureMockStore()
  const store = mockStore({
    categories: [],
    filters: []
  })

  it('renders successfully', () => {
    const form = shallow(
      <Form
        submitHandler={submitHandler}
      />
    )

    const { name, placeholder } = form.find('Input').props()

    expect(form.find('form').is('.__sw-input__')).toBe(true)
    expect(form.find('Input').length).toBe(1)
    expect(name).toEqual('keyword')
    expect(placeholder).toEqual('Search for keyword...')
  })

  it('dispatch actions when user key in input', () => {
    const connectedForm = mount(
      <Provider store={store}>
        <ConnectedForm />
      </Provider>
    )

    connectedForm.find('Input').simulate('change')

    expect(store.getActions().length).toBe(2)
  })
})
