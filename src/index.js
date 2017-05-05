import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { configureApp, createMountPoint } from './actions/api'
import Root from './containers/Root'

const renderApp = ({
  mountPoint,
  host,
  endpoint,
  label,
  fields,
  preview = false
}) => {
  const store = configureStore()

  createMountPoint(mountPoint)
  configureApp(host, endpoint, fields, label, preview)

  render(
    <Root store={store} />,
    document.querySelector(mountPoint)
  )
}

const zAPI = {
  SearchWidget: {
    new: renderApp
  }
}

window.zAPI = Object.assign({}, zAPI)

export default render
