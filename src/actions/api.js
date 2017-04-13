import axios from 'axios'

let masterEndpoint = null

export function configureAPI(endpoint) {
  masterEndpoint = endpoint
}

export function get(data) {
  return axios({
    method: 'get',
    url: masterEndpoint,
    params: data
  })
}
