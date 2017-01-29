import React from 'react';

import Table from '../../containers/Table';
import TableFillPanel from '../../containers/TableFillPanel';
import Toolbar from '../../containers/Toolbar';
import { app as appClass } from './styles.less';

const App = () =>
  <div className={appClass}>
    <Table />
    <TableFillPanel />
    <Toolbar />
  </div>;

export default App;
