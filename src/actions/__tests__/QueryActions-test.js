import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as QueryActions from '../QueryActions'
import { configureAPI, get } from '../api'

const { Map } = require('immutable')

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions/QueryActions', () => {
  const index = 2
  const keyword = 'Earth'
  const offset = 10
  const endpoint = 'sample-endpoint/1'

  describe('updateKeyword', () => {
    it('creates action to update keyword', () => {
      const keyword = 'Interstellar'
      expect(QueryActions.updateKeyword(keyword)).toEqual(
        {
          type: 'UPDATE_KEYWORD',
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
          type: 'UPDATE_PAGE_NUM',
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
          type: 'UPDATE_SELECTED_FILTER',
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
          type: 'UPDATE_SELECTED_FILTER_VALUE',
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
          type: 'REMOVE_SELECTED_FILTER',
          index
        }
      )
    })
  })

  describe('removeAllFilters', () => {
    it('creates action to remove all filters', () => {
      expect(QueryActions.removeAllFilters()).toEqual(
        { type: 'REMOVE_ALL_FILTERS' }
      )
    })
  })

  describe('requestApi', () => {
    it('get successfully', () => {
      const store = mockStore({
        form: {
          form: {}
        },
        query: Map({ keyword, offset })
      })

      const results = [1, 2, 3]
      const mock = new MockAdapter(axios)
      const data = { params: { q: 'ok' } }
      const expectedActions = {
        type: 'LOAD_RESULT',
        results
      }

      configureAPI(endpoint)

      mock.onGet(endpoint, data).reply(200, { response: { results } })

      get(data).then((response) => {
        expect(response.result).toEqual([1, 2, 3])
      })

      // return store.dispatch(QueryActions.requestApi())
      //   .then(() => {
      //     expect(store.getActions()).toEqual(expectedActions)
      //   })
    })
  })
})
