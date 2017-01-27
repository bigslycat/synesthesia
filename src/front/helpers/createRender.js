import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createRender = selector =>
  store =>
    Component =>
      () => {
        render(
          <MuiThemeProvider>
            <Provider {...{ store }}>
              <Component />
            </Provider>
          </MuiThemeProvider>,
          document.querySelector(selector),
        );
      };

export default createRender;
