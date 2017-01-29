import React, { Component } from 'react';

import Table from '../../containers/Table';
import TableFillPanel from '../../containers/TableFillPanel';
import Toolbar from '../../containers/Toolbar';
import { app as appClass } from './styles.less';

class App extends Component {
  static propTypes = {
    ...Table.propTypes,
    ...TableFillPanel.propTypes,
    ...Toolbar.propTypes,
  };

  constructor(...args) {
    super(...args);

    this.state = {
    };
  }

  render() {
    const {
      persons,
      personCreate,
      personDelete,
      personUpdate,
      personsListUpdate,
    } = this.props;

    return (
      <div className={appClass}>
        <Table {...{ persons, personDelete, personUpdate }} />
        <TableFillPanel {...{ personCreate }} />
        <Toolbar {...{ persons, personsListUpdate }} />
      </div>
    );
  }
}

export default App;
