import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import { configureAPI } from './actions/api';
import Root from './containers/Root';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

require('./stylesheets/main.scss');

const renderApp = ({ endpoint }) => {
  const store = configureStore();
  configureAPI(endpoint);

  render(
    <AppContainer>
      <Root store={ store }/>
    </AppContainer>,
    document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const HotRoot = require('./containers/Root').default
      render(
        <AppContainer>
          <HotRoot store={ store } />
        </AppContainer>,
        document.getElementById('root')
      );
    });
  }
}

window.SearchWidget = Object.assign(
  {},
  window.SearchWidget,
  { new: renderApp }
);

export default render;
