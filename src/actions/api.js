import axios from 'axios'

let masterEndpoint = null
let selectableFields = []
let instance = null
let previewMode = null

export function configureApp(host, endpoint, fields = [], preview = false) {
  instance = axios.create({
    baseURL: host
  })

  masterEndpoint = endpoint
  selectableFields = fields
  previewMode = preview
}

export function getData(data) {
  return instance.get(
    `search/${masterEndpoint}`,
    { params: data }
  )
}

export function getStats() {
  return instance.get(
    `/count/${masterEndpoint}`
  )
}

export function getEndpoint() {
  return masterEndpoint
}

export function getSelectableFields() {
  return selectableFields
}

export function getInstance() {
  return instance
}

export function getPreviewMode() {
  return previewMode
}

export function createMountPoint(id) {
  if (document.getElementById(id)) {
    return
  }

  const div = document.createElement('div')
  div.id = id
  document.body.appendChild(div)
}
