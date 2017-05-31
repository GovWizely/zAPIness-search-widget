import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ConnectedApp, { App } from '../App';

const { Map } = require('immutable');

describe('containers/App', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const filters = Map({
    categories: [],
    filters: []
  });
  const toggle = Map({
    key: undefined,
    show: false
  });

  const initialState = Map({
    categories: [],
    keyword: '',
    offset: 0,
    pageNum: 1,
    filters,
    data: undefined,
    error: [],
    query: Map({
      keyword: '',
      offset: 0,
      filters: []
    }),
    isFetching: false,
    toggle
  });

  const store = mockStore(initialState);

  const handleSelect = jest.fn();
  const getCategories = jest.fn();
  const updateFields = jest.fn();
  const toggleResultHandler = jest.fn();
  const previewResult = jest.fn();

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <App
          query={initialState}
          toggle={toggle}
          handleSelect={handleSelect}
          getCategories={getCategories}
          updateFields={updateFields}
          toggleResultHandler={toggleResultHandler}
          previewResult={previewResult}
          isFetching={false}
          filters={filters}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('dispatch actions to store', () => {
    shallow(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );

    expect(store.getActions().length).toEqual(1);
  });

  it('renders no result during data fetching', () => {
    const app = shallow(
      <App
        query={initialState}
        toggle={toggle}
        handleSelect={handleSelect}
        getCategories={getCategories}
        updateFields={updateFields}
        toggleResultHandler={toggleResultHandler}
        previewResult={previewResult}
        isFetching
        filters={filters}
      />
    );

    expect(app.find('div.__sw-result__').exists()).toBe(false);
  });
});
