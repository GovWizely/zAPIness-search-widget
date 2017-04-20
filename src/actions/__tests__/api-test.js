import * as api from '../api'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

describe('action/api', () => {
  const endpoint = 'sample-endpoint/1'

  describe('configureAPI', () => {
    it('stores the endpoint as instance variable', () => {
      api.configureAPI(endpoint)

      expect(api.getEndpoint()).toEqual(endpoint)
    })
  })

  describe('get', () => {
    it('get successfully', () => {
      const mock = new MockAdapter(axios)
      const data = { params: { q: 'ok' } }

      mock.onGet(endpoint, data).reply(200, {
        results: [1, 2, 3]
      })

      api.configureAPI(endpoint)

      api.getData(data).then((response) => {
        expect(response.result).toEqual([1, 2, 3])
      })
    })
  })
})
