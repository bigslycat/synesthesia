import React from 'react';

import Table from '../../containers/Table';
import { app as appClass } from './styles.less';

const App = () =>
  <div className={appClass}>
    <Table />
  </div>;

export default App;
