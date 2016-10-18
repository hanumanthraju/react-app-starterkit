import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router';
import { FormioResource, FormioAuth, formioReducers, FormioRoutes } from 'react-formio';
import Config from './config';
import Header from './components/Header.jsx';

require('react-widgets/dist/css/react-widgets.css');
require('react-formio/formio.css');

new FormioAuth({
  appUrl: Config.appUrl,
  forceAuth: true
});

// Register all resources in the config file.
let resources = {};
for (const key in Config.resources) {
  resources[key] = new FormioResource(key, Config.resources[key].form);
}

const store = createStore(
  combineReducers({
    formio: formioReducers()
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="slash">
      <div className="app">
        <Header />
        <div className="container">
          <FormioRoutes />
        </div>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('formio')
);
