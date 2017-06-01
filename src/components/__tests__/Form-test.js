import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedForm, { Form } from '../Form';
import Input from '../Input';

const { Map } = require('immutable');

describe('components/Form', () => {
  const submitHandler = jest.fn();
  const handleSubmit = jest.fn();
  const mockStore = configureMockStore();
  const filters = Map({
    categories: {
      country: ['Italy', 'Germany'],
      capital: ['Rome', 'Berlin']
    },
    filters: []
  });

  const store = mockStore({
    filters,
    isFetching: false,
    query: Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      error: [],
      fields: [],
      showAll: true,
      hasFilter: true
    })
  });

  it('renders successfully', () => {
    const form = shallow(
      <Form
        submitHandler={submitHandler}
        isFetching={false}
        onSubmit={handleSubmit}
        filters={filters}
      />
    );

    const { name, placeholder } = form.find('Input').props();

    expect(form.find('form').is('.__sw-input__')).toBe(true);
    expect(form.find('Input').length).toBe(1);
    expect(name).toEqual('keyword');
    expect(placeholder).toEqual('Search for keyword...');
  });

  it('dispatch actions when user key in input', () => {
    const connectedForm = mount(
      <Provider store={store}>
        <ConnectedForm
          isFetching={false}
          filters={filters}
          onSubmit={() => {}}
        />
      </Provider>
    );

    expect(connectedForm.find(Input).length).toBe(1);
    connectedForm.find(Input).simulate('change', { target: { value: 'David' } });
    expect(connectedForm.find('.__sw-fetcher__').length).toBe(1);
    expect(store.getActions().length).toBe(2);
  });

  it('shows add filter button', () => {
    const connectedForm = mount(
      <Provider store={store}>
        <ConnectedForm
          isFetching={false}
          filters={filters}
          onSubmit={() => {}}
        />
      </Provider>
    );

    expect(connectedForm.find('button').length).toBe(1);
    expect(connectedForm.find('button').text()).toBe('Advanced Filter');

    connectedForm.find('button').simulate('click');

    expect(connectedForm.find('button').first().text()).toBe('Hide Advanced Filter');
    expect(connectedForm.find('FieldArray').length).toBe(1);
    expect(JSON.stringify(store.getActions())).toContain(
      JSON.stringify({ type: 'UPDATE_HAS_FILTER', hasFilter: true })
    );
  });
});
