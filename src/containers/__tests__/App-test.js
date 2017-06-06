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
  const contentRect = {
    bounds: {
      width: 1024
    }
  };

  const filters = Map({
    categories: [],
    filters: []
  });
  const getCategories = jest.fn();
  const handleSelect = jest.fn();
  const innerRef = jest.fn();
  const previewResult = jest.fn();

  const toggle = Map({
    key: undefined,
    show: false
  });
  const toggleResultHandler = jest.fn();
  const updateFields = jest.fn();

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

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <App
          contentRect={contentRect}
          filters={filters}
          getCategories={getCategories}
          handleSelect={handleSelect}
          innerRef={innerRef}
          isFetching={false}
          previewResult={previewResult}
          query={initialState}
          toggle={toggle}
          toggleResultHandler={toggleResultHandler}
          updateFields={updateFields}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('dispatch actions to store', () => {
    shallow(
      <Provider store={store}>
        <ConnectedApp
          contentRect={contentRect}
          innerRef={innerRef}
        />
      </Provider>
    );

    expect(store.getActions().length).toEqual(1);
  });

  it('renders no result during data fetching', () => {
    const app = shallow(
      <App
        contentRect={contentRect}
        filters={filters}
        getCategories={getCategories}
        handleSelect={handleSelect}
        innerRef={innerRef}
        isFetching
        previewResult={previewResult}
        query={initialState}
        toggle={toggle}
        toggleResultHandler={toggleResultHandler}
        updateFields={updateFields}
      />
    );

    expect(app.find('div.__sw-result__').exists()).toBe(false);
  });
});
