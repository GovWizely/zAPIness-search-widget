import * as api from '../api'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

describe('action/api', () => {
  const host = 'http://sample-host'
  const endpoint = 'sample-endpoint/1'
  const fields = ['some', 'selected', 'fields']
  const label = 'some'

  describe('configureApp', () => {
    it('stores the endpoint as instance variable', () => {
      api.configureApp(host, endpoint, fields, label)

      expect(api.getEndpoint()).toEqual(endpoint)
      expect(api.getSelectableFields()).toEqual(fields)
      expect(api.getPreviewMode()).toEqual(false)
      expect(api.getResultLabel()).toEqual(label)
    })

    it('set app as preview mode if preview is set to true', () => {
      const preview = true
      api.configureApp(host, endpoint, fields, label, preview)

      expect(api.getPreviewMode()).toEqual(true)
    })
  })

  describe('getData', () => {
    it('get data successfully', () => {
      const mock = new MockAdapter(axios)
      const data = { params: { q: 'ok' } }

      mock.onGet(endpoint, data).reply(200, {
        results: [1, 2, 3]
      })

      api.configureApp(host, endpoint)

      api.getData(data).then((response) => {
        expect(response.result).toEqual([1, 2, 3])
      })
    })
  })

  describe('createMountPoint', () => {
    it('creates div with the given id', () => {
      api.createMountPoint('special-id')

      expect(document.getElementById('special-id')).not.toBe(null)
    })
  })
})
