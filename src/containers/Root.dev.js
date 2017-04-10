import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'

const Root = props => (
  <Provider store={props.store}>
    <div>
      <App />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.shape({}).isRequired
}

export default Root
