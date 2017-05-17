import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ConnectedForm, { Form } from '../Form';

const { Map } = require('immutable');

describe('components/Form', () => {
  const submitHandler = jest.fn();
  const mockStore = configureMockStore();
  const filters = Map({
    categories: [],
    filters: []
  });

  const store = mockStore({
    categories: [],
    filters,
    isFetching: false
  });

  it('renders successfully', () => {
    const form = shallow(
      <Form
        submitHandler={submitHandler}
        isFetching={false}
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
        />
      </Provider>
    );

    connectedForm.find('Input').simulate('change');

    expect(store.getActions().length).toBe(2);
  });

  it('shows add filter button if categories is not empty', () => {
    const newFilters = Map({
      categories: ['a', 'b', 'c'],
      filters: []
    });

    const form = shallow(
      <Form
        submitHandler={submitHandler}
        isFetching={false}
        filters={newFilters}
      />
    );

    expect(form.find('Button').is('.__sw-advanced-search__')).toBe(true);
  });

  it('shows loading icon during data fetching', () => {
    const form = shallow(
      <Form
        submitHandler={submitHandler}
        isFetching
        filters={filters}
      />
    );

    expect(form.find('div.__sw-loading__').length).toBe(1);
  });
});
