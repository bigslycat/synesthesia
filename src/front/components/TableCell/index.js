import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import { field as fieldClass } from './styles.less';

const createChecker = (type, name, onChange) => (event, newValue) => {
  switch (type) {
    case 'text':
      onChange(name, newValue ? String(newValue) : '');
      break;

    case 'number': {
      const int = parseInt(newValue, 10);
      if (int > 0) onChange(name, int);
      break;
    }

      // no default
  }
};

const styleReset = { width: false };

const TableCell = ({ type, name, id, value, tempFields, onChange, onEnter }) => (
  tempFields.id === id ?
    <TextField
      className={fieldClass}
      style={styleReset}
      type={type}
      name={name}
      value={tempFields[name]}
      onChange={createChecker(type, name, onChange)}
      onKeyPress={onEnter && (
        ({ key }) => (key === 'Enter' && onEnter())
      )}
    /> :
    <div>{value}</div>
);

TableCell.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tempFields: PropTypes.shape({
    id: PropTypes.number,
    fio: PropTypes.string,
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    phone: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    email: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
};

TableCell.defaultProps = {
  type: 'text',
  value: '',
  onEnter: undefined,
};

export default TableCell;
