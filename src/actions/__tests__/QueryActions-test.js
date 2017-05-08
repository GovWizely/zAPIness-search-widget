import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';
import * as QueryActions from '../QueryActions';
import * as actionTypes from '../../constants/ActionTypes';
import { configureApp } from '../api';

const { Map } = require('immutable');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions/QueryActions', () => {
  const keyword = 'Earth';
  const offset = 10;
  const endpoint = 'sample-endpoint/1';

  describe('updateKeyword', () => {
    it('creates action to update keyword', () => {
      expect(QueryActions.updateKeyword(keyword)).toEqual(
        {
          type: actionTypes.UPDATE_KEYWORD,
          keyword
        }
      );
    });
  });

  describe('updatePageNum', () => {
    it('creates action to update page number', () => {
      const pageNum = 9;
      expect(QueryActions.updatePageNum(pageNum)).toEqual(
        {
          type: actionTypes.UPDATE_PAGE_NUM,
          pageNum
        }
      );
    });
  });

  describe('updateFields', () => {
    it('creates action to update fields', () => {
      const fields = ['a', 'b', 'c'];
      expect(QueryActions.updateFields(fields)).toEqual(
        {
          type: actionTypes.UPDATE_FIELDS,
          fields
        }
      );
    });
  });

  describe('clearError', () => {
    it('creates action to clear errors', () => {
      expect(QueryActions.clearError()).toEqual(
        {
          type: actionTypes.CLEAR_ERROR
        }
      );
    });
  });

  describe('requestApi', () => {
    const store = mockStore({
      form: {
        form: {}
      },
      query: Map({ keyword, offset }),
      isFetching: false
    });

    const results = [1, 2, 3];

    it('get results successfully', () => {
      const expectedActions = [
        {
          type: actionTypes.RECEIVE_DATA
        },
        {
          type: actionTypes.LOAD_RESULT,
          results
        }
      ];

      configureApp(endpoint);

      nock('endpoint').get('/').reply(200, { results });

      const dispatch = sinon.spy(store, 'dispatch');
      const fn = QueryActions.requestApi();

      fn(dispatch, store.getState);

      expect(dispatch.calledWith(expectedActions));
    });
  });

  describe('filterResult', () => {
    it('returns on the selected fields', () => {
      const fields = ['title', 'director'];
      const data = [
        {
          title: 'Harry Potter',
          director: 'David Yates',
          year: '2006'
        },
        {
          title: 'Interstellar',
          director: 'Christopher Nolan',
          year: '2015'
        },
        {
          title: 'Avatar',
          director: 'James Cameron',
          year: '2009'
        }
      ];

      expect(QueryActions.filterResult(data, fields)).toEqual([
        {
          title: 'Harry Potter',
          director: 'David Yates'
        },
        {
          title: 'Interstellar',
          director: 'Christopher Nolan'
        },
        {
          title: 'Avatar',
          director: 'James Cameron'
        }
      ]);
    });
  });
});
