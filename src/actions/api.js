import { get } from 'axios'

let masterEndpoint = null
let selectableFields = []

export function configureApp(endpoint, fields = []) {
  masterEndpoint = endpoint
  selectableFields = fields
}

export function getData(data) {
  return get(masterEndpoint, { params: data })
}

export function getEndpoint() {
  return masterEndpoint
}

export function getSelectableFields() {
  return selectableFields
}
