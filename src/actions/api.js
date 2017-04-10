import axios from 'axios'

let masterEndpoint = null

export function configureAPI(endpoint) {
  masterEndpoint = endpoint
}

export function post(data) {
  return axios.get(masterEndpoint, data)
}
