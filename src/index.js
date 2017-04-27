import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { configureApp } from './actions/api'
import Root from './containers/Root'

const renderApp = ({ host, endpoint, fields }) => {
  const store = configureStore()
  configureApp(host, endpoint, fields)

  render(
    <Root store={store} />,
    document.getElementById('root')
  )
}

const zAPI = {
  SearchWidget: {
    new: renderApp
  }
}

window.zAPI = Object.assign({}, zAPI)

export default render
