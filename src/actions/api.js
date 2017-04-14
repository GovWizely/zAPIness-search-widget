import axios from 'axios'

let masterEndpoint = null

export function configureAPI(endpoint) {
  masterEndpoint = endpoint
}

export function get(data) {
  return axios.get(masterEndpoint, { params: data })
}

export function getEndpoint() {
  return masterEndpoint
}
