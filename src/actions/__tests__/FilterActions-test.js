import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';
import * as FilterActions from '../FilterActions';
import * as actionTypes from '../../constants/ActionTypes';
import { configureApp } from '../api';

const { Map } = require('immutable');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions/FilterActions', () => {
  const index = 2;
  const keyword = 'Earth';
  const offset = 10;
  const endpoint = 'sample-endpoint/1';
  const host = 'http://sample-host';

  describe('removeSelectedFilter', () => {
    it('creates action to remove selected filter', () => {
      const store = mockStore({
        filters: [{ type: 'country', value: 'Sweden' }]
      });

      const expectedActions = [{
        type: actionTypes.REMOVE_SELECTED_FILTER,
        index
      }];

      store.dispatch(FilterActions.removeSelectedFilter(index));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('removeAllFilters', () => {
    it('creates action to remove all filters', () => {
      const store = mockStore({
        filters: [{ type: 'country', value: 'Sweden' }]
      });

      const expectedActions = [{ type: actionTypes.REMOVE_ALL_FILTERS }];

      store.dispatch(FilterActions.removeAllFilters());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addFilter', () => {
    it('adds new filter with the passed values and types', () => {
      const store = mockStore({
        filters: [{ type: 'country', value: 'Sweden' }]
      });

      const filterType = 'country';
      const value = 'Sweden';

      const expectedActions = [{ type: actionTypes.ADD_FILTER,
        filterType,
        value
      }];

      store.dispatch(FilterActions.addFilter(filterType, value));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addFilters', () => {
    it('adds filters to store based on fields from the form', () => {
      const store = mockStore({
        filters: [{ type: 'country', value: 'Sweden' }]
      });

      const filter1 = {
        type: 'capital',
        value: 'berlin'
      };

      const filter2 = {
        type: 'country',
        value: 'italy'
      };

      const formFilters = [filter1, filter2];

      const expectedActions = [
        {
          type: actionTypes.REMOVE_ALL_FILTERS
        },
        {
          type: actionTypes.ADD_FILTER,
          filterType: filter1.type,
          value: filter1.value
        }, {
          type: actionTypes.ADD_FILTER,
          filterType: filter2.type,
          value: filter2.value
        }
      ];

      store.dispatch(FilterActions.addFilters(formFilters));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('does not add empty filters to the store', () => {
      const store = mockStore({
        filters: [{ type: 'country', value: 'Sweden' }]
      });

      const filter1 = {
        type: 'capital',
        value: 'berlin'
      };

      const filter2 = {
        type: null,
        value: null
      };

      const filter3 = {
        type: { value: 'capital', label: 'Capital' },
        value: null
      };

      const formFilters = [filter1, filter2, filter3];

      const expectedActions = [
        {
          type: actionTypes.REMOVE_ALL_FILTERS
        },
        {
          type: actionTypes.ADD_FILTER,
          filterType: filter1.type,
          value: filter1.value
        }
      ];

      store.dispatch(FilterActions.addFilters(formFilters));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('getCategories', () => {
    it('gets categories', () => {
      const store = mockStore({
        form: {
          form: {}
        },
        query: Map({ keyword, offset }),
        isFetching: false
      });

      const expectedActions = {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['type', 'Agent']
      };

      configureApp(host, endpoint);

      nock('endpoint').get('/').reply(404, { aggregations: [{ type: 'Agent' }] });

      const dispatch = sinon.spy(store, 'dispatch');
      const fn = FilterActions.getCategories();

      fn(dispatch, store.getState);

      expect(dispatch.calledWith(expectedActions));
    });
  });
});
