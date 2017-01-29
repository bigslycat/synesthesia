import React, { Component } from 'react';

import Table from '../Table';
import TableFillPanel from '../TableFillPanel';
import Toolbar from '../Toolbar';
import { app as appClass } from './styles.less';

class App extends Component {
  static propTypes = {
    ...Table.contextTypes,
    ...TableFillPanel.contextTypes,
    ...Toolbar.contextTypes,
  };

  static childContextTypes = { ...App.propTypes };

  constructor(...args) {
    super(...args);

    this.state = {
    };
  }

  getChildContext() {
    return this.props;
  }

  render() {
    return (
      <div className={appClass}>
        <Table />
        <TableFillPanel />
        <Toolbar />
      </div>
    );
  }
}

export default App;
