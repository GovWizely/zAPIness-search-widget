import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { configureAPI } from './actions/api'
import Root from './containers/Root'

const renderApp = ({ endpoint }) => {
  const store = configureStore()
  configureAPI(endpoint)

  render(
    <Root store={store} />,
    document.getElementById('root')
  )
}

window.SearchWidget = Object.assign(
  {},
  window.SearchWidget,
  { new: renderApp }
)

export default render
