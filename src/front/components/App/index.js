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

  static childContextTypes = {
    ...App.propTypes,
    personsToExport: App.propTypes.persons,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      personsToExport: [],
    };

    this.setPersonsToExport = this.setPersonsToExport.bind(this);
  }

  getChildContext() {
    const { personsToExport } = this.state;

    return {
      ...this.props,
      personsToExport: personsToExport.length ?
        personsToExport : this.props.persons,
    };
  }

  setPersonsToExport(personsIds) {
    this.setState({
      personsToExport: this.props.persons.filter(
        ({ id }) => personsIds.includes(id),
      ),
    });
  }

  render() {
    return (
      <div className={appClass}>
        <Table setPersonsToExport={this.setPersonsToExport} />
        <TableFillPanel />
        <Toolbar />
      </div>
    );
  }
}

export default App;
