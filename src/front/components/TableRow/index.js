import React, { PropTypes } from 'react';

const TableRow = (...args) => (
  <div>
    <pre>{JSON.stringify(args, null, '  ')}</pre>
  </div>
);

TableRow.contextTypes = {
  name: PropTypes.string,
};

export default TableRow;
