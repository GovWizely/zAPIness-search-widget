import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import sinon from 'sinon'
import * as FilterActions from '../FilterActions'
import * as actionTypes from '../../constants/ActionTypes'
import { configureApp } from '../api'

const { Map } = require('immutable')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions/FilterActions', () => {
  const index = 2
  const keyword = 'Earth'
  const offset = 10
  const endpoint = 'sample-endpoint/1'
  const host = 'http://sample-host'

  describe('updateSelectedFilter', () => {
    it('creates action to update selected filter', () => {
      const selectedFilter = { type: 'star', value: 'Sun' }

      expect(FilterActions.updateSelectedFilter(selectedFilter, index)).toEqual(
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

      expect(FilterActions.updateSelectedValue(selectedValue, index)).toEqual(
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
      expect(FilterActions.removeSelectedFilter(index)).toEqual(
        {
          type: actionTypes.REMOVE_SELECTED_FILTER,
          index
        }
      )
    })
  })

  describe('removeAllFilters', () => {
    it('creates action to remove all filters', () => {
      expect(FilterActions.removeAllFilters()).toEqual(
        { type: actionTypes.REMOVE_ALL_FILTERS }
      )
    })
  })

  describe('getCategories', () => {
    it('gets categories', () => {
      const store = mockStore({
        form: {
          form: {}
        },
        query: Map({ keyword, offset }),
        isFetching: false
      })

      const expectedActions = {
        type: actionTypes.UPDATE_CATEGORIES,
        categories: ['type', 'Agent']
      }

      configureApp(host, endpoint)

      nock('endpoint').get('/').reply(404, { aggregations: [{ type: 'Agent' }] })

      const dispatch = sinon.spy(store, 'dispatch')
      const fn = FilterActions.getCategories()

      fn(dispatch, store.getState)

      expect(dispatch.calledWith(expectedActions))
    })
  })
})
