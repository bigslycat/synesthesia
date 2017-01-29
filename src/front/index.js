import { createStore } from 'redux';

import createRender from './helpers/createRender';
import app from './reducers';
import App from './containers/App';

import './style.less';
import './inject';

const getLocalState = (Component) => {
  try {
    const state = localStorage.getItem('state');

    if (state) return createStore(Component, JSON.parse(state));
    throw new Error();
  } catch (e) {
    return createStore(Component);
  }
};

const store = getLocalState(app);
const render = createRender('#app-root')(store)(App);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

if (document.readyState !== 'loading') render();
else document.addEventListener('DOMContentLoaded', render);

if (module.hot) module.hot.accept();
