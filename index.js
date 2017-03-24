import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

require('./stylesheets/main.scss');

const store = configureStore();

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
