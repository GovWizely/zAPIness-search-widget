import axios from 'axios'

let masterEndpoint = null

export function configureAPI(endpoint) {
  // masterEndpoint = axios.create({
  //   baseURL: endpoint,
  //   timeout: 1000,
  //   headers: { 'Referrer-Policy': 'unsafe-url' }
  // })
  masterEndpoint = endpoint
}

export function get(data) {
  //debugger
  return axios({
    method: 'get',
    url: masterEndpoint,
    data
  })
  // //return masterEndpoint.get({ params: data })
  // //return axios.get(masterEndpoint, { params: data })
  // return axios({
  //   method: 'get'
  // })
}
