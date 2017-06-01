import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { mount } from 'enzyme';
import * as api from '../../actions/api';

import ConnectedFilter from '../Filter';

const { Map } = require('immutable');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

const DecoratedFilter = reduxForm({
  form: 'form',
  fields: ['keyword', 'filters[].type', 'filters[].value']
})(ConnectedFilter);

const mockStore = configureMockStore([thunk]);

api.configureApp('http://sample-host', '1');

describe('components/Filter', () => {
  const fields = [{
    filters: {
      type: '',
      value: ''
    }
  }];
  const store = mockStore({
    filters: Map({
      categories: {
        country: ['Italy', 'Germany'],
        capital: ['Rome', 'Berlin']
      },
      filters: []
    }),
    form: {
      form: {
        filters: {
          name: 'filters',
          type: 'FieldArray',
          count: 1
        }
      }
    },
    query: Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      error: [],
      fields: [],
      showAll: true,
      hasFilter: true
    }),
    isFetching: false
  });

  const connectedFilter = mount(
    <Provider store={store}>
      <DecoratedFilter
        fields={fields}
      />
    </Provider>
  );

  it('renders successfully', () => {
    expect(connectedFilter.find('.__sw-filter__').length).toBe(1);

    expect(connectedFilter.find('.remove-filter').length).toBe(1);
    expect(connectedFilter.find('.remove-all-filter').length).toBe(1);
    expect(connectedFilter.find('.add-filter').length).toBe(1);
    expect(connectedFilter.find('.submit').length).toBe(1);
  });

  it('adds new filter', () => {
    const addBtn = connectedFilter.find('.add-filter');
    expect(addBtn.text()).toEqual('Add Another Filter');
    addBtn.simulate('click');
    expect(connectedFilter.find(Field).length).toBe(4);
    expect(connectedFilter.find(Field).at(0).props().list).toEqual(['country', 'capital']);
  });

  it('submits form', () => {
    connectedFilter.find('.submit').simulate('click');

    const actions = JSON.stringify(store.getActions());

    expect(actions).toContain(JSON.stringify({ type: 'REMOVE_ALL_FILTERS' }));
    expect(actions).toContain(JSON.stringify({ type: 'RESET_PAGE_NUM' }));
    expect(actions).toContain(JSON.stringify({ type: 'REQUEST_DATA' }));
  });
});
