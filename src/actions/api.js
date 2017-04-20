import { get } from 'axios'

let masterEndpoint = null

export function configureAPI(endpoint) {
  masterEndpoint = endpoint
}

export function getData(data) {
  return get(masterEndpoint, { params: data })
}

export function getEndpoint() {
  return masterEndpoint
}
