import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import sinon from 'sinon'
import * as QueryActions from '../QueryActions'
import * as actionTypes from '../../constants/ActionTypes'
import { configureAPI } from '../api'

const { Map } = require('immutable')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions/QueryActions', () => {
  const index = 2
  const keyword = 'Earth'
  const offset = 10
  const endpoint = 'sample-endpoint/1'

  describe('updateKeyword', () => {
    it('creates action to update keyword', () => {
      expect(QueryActions.updateKeyword(keyword)).toEqual(
        {
          type: actionTypes.UPDATE_KEYWORD,
          keyword
        }
      )
    })
  })

  describe('updatePageNum', () => {
    it('creates action to update page number', () => {
      const pageNum = 9
      expect(QueryActions.updatePageNum(pageNum)).toEqual(
        {
          type: actionTypes.UPDATE_PAGE_NUM,
          pageNum
        }
      )
    })
  })

  describe('updateSelectedFilter', () => {
    it('creates action to update selected filter', () => {
      const selectedFilter = { type: 'star', value: 'Sun' }

      expect(QueryActions.updateSelectedFilter(selectedFilter, index)).toEqual(
        {
          type: actionTypes.UPDATE_SELECTED_FILTER,
          index,
          selectedFilter
        }
      )
    })
  })

  describe('updateSelectedValue', () => {
    it('creates action to update selected value', () => {
      const selectedValue = 'Earth'

      expect(QueryActions.updateSelectedValue(selectedValue, index)).toEqual(
        {
          type: actionTypes.UPDATE_SELECTED_FILTER_VALUE,
          index,
          selectedValue
        }
      )
    })
  })

  describe('removeSelectedFilter', () => {
    it('creates action to remove selected filter', () => {
      expect(QueryActions.removeSelectedFilter(index)).toEqual(
        {
          type: actionTypes.REMOVE_SELECTED_FILTER,
          index
        }
      )
    })
  })

  describe('removeAllFilters', () => {
    it('creates action to remove all filters', () => {
      expect(QueryActions.removeAllFilters()).toEqual(
        { type: actionTypes.REMOVE_ALL_FILTERS }
      )
    })
  })

  describe('requestApi', () => {
    const store = mockStore({
      form: {
        form: {}
      },
      query: Map({ keyword, offset })
    })

    const results = [1, 2, 3]

    it('get results successfully', () => {
      const expectedActions = {
        type: actionTypes.LOAD_RESULT,
        results
      }

      configureAPI(endpoint)

      nock('endpoint').get('/').reply(200, { results })

      const dispatch = sinon.spy(store, 'dispatch')
      const fn = QueryActions.requestApi()

      fn(dispatch, store.getState)

      expect(dispatch.calledWith(expectedActions))
    })
  })

  describe('getCategories', () => {
    it('gets categories', () => {
      const store = mockStore({
        form: {
          form: {}
        },
        query: Map({ keyword, offset })
      })

      const expectedActions = {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['type', 'Agent']
      }

      configureAPI(endpoint)

      nock('endpoint').get('/').reply(404, { aggregations: [{ type: 'Agent' }] })

      const dispatch = sinon.spy(store, 'dispatch')
      const fn = QueryActions.getCategories()

      fn(dispatch, store.getState)

      expect(dispatch.calledWith(expectedActions))
    })
  })
})
