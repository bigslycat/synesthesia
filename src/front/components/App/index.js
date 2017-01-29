import React from 'react';

import Table from '../../containers/Table';
import TableFillPanel from '../../containers/TableFillPanel';
import { app as appClass } from './styles.less';

const App = () =>
  <div className={appClass}>
    <Table />
    <TableFillPanel />
  </div>;

export default App;
