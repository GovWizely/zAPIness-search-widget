import axios from 'axios';

let masterEndpoint = null;

export function configureAPI(endpoint) {
  return masterEndpoint = endpoint;
}

export function post(data) {
  return axios.post(masterEndpoint, data);
}
