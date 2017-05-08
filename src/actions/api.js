import axios from 'axios';
import replace from 'lodash/replace';

let masterEndpoint = null;
let selectableFields = [];
let instance = null;
let previewMode = null;
let resultLabel = null;

export function configureApp(
  host,
  endpoint,
  fields = [],
  label = null,
  preview = false
) {
  instance = axios.create({
    baseURL: host
  });

  masterEndpoint = endpoint;
  selectableFields = fields;
  previewMode = preview;
  resultLabel = label;
}

export function getData(data) {
  return instance.get(
    `search/${masterEndpoint}`,
    { params: data }
  );
}

export function getStats() {
  return instance.get(
    `/count/${masterEndpoint}`
  );
}

export function getEndpoint() {
  return masterEndpoint;
}

export function getSelectableFields() {
  return selectableFields;
}

export function getInstance() {
  return instance;
}

export function getPreviewMode() {
  return previewMode;
}

export function getResultLabel() {
  return resultLabel;
}

export function createMountPoint(mountPoint) {
  if (document.querySelector(mountPoint)) {
    return;
  }

  const id = replace(mountPoint, '#', '');

  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
}
