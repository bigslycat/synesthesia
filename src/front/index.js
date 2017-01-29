import { createStore } from 'redux';

import createRender from './helpers/createRender';
import app from './reducers';
import App from './containers/App';

import './style.less';
import './inject';

const store = createStore(app);
const render = createRender('#app-root')(store)(App);

if (document.readyState !== 'loading') render();
else document.addEventListener('DOMContentLoaded', render);

if (module.hot) module.hot.accept();
