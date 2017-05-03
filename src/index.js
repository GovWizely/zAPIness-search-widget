import React from 'react'
import { render } from 'react-dom'
import replace from 'lodash/replace'
import configureStore from './store/configureStore'
import { configureApp, createMountPoint } from './actions/api'
import Root from './containers/Root'

const renderApp = ({ mountPoint, host, endpoint, fields }) => {
  const store = configureStore()
  const id = replace(mountPoint, '#', '')

  createMountPoint(id)
  configureApp(host, endpoint, fields)

  render(
    <Root store={store} />,
    document.getElementById(id)
  )
}

const zAPI = {
  SearchWidget: {
    new: renderApp
  }
}

window.zAPI = Object.assign({}, zAPI)

export default render
