import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';
import Clear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import TableCell from '../TableCell';

import {
  deleteButtonCell as deleteButtonCellClass,
} from './styles.less';

const tdResetStyle = {
  textOverflow: false,
  textAlign: false,
  overflow: false,
};

const overflow = { overflow: false };
const background = { background: false };

class TableComponent extends Component {
  static contextTypes = {
    personDelete: PropTypes.func.isRequired,
    personUpdate: PropTypes.func.isRequired,
    persons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
      }),
    ).isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      tempFields: {},
      sorting: {
        field: 'fio',
        order: 1,
      },
    };
  }

  getPersons() {
    const { field, order = 1 } = this.state.sorting;

    if (!field) return this.context.persons;

    const constructor = field === 'age' ? Number : (value = '') => String(value);
    const persons = [...this.context.persons];

    persons.sort(
      (personA, personB) => {
        const fieldA = constructor(personA[field]);
        const fieldB = constructor(personB[field]);

        if (fieldA === fieldB) return 0;
        else if (fieldA > fieldB) return 1 * order;
        return -1 * order;
      },
    );

    return persons;
  }

  getPersonById(targetId) {
    return this.context.persons.filter(({ id }) => (id === targetId))[0];
  }

  fields = {
    fio: {
      header: 'ФИО',
    },
    age: {
      header: 'Возраст',
      type: 'number',
    },
    phone: {
      header: 'Телефон',
    },
    email: {
      header: 'E-mail',
    },
  };

  edit(index) {
    this.setState({
      ...this.state,
      tempFields: this.getPersonById(index),
    });
  }

  cancel() {
    this.setState({
      ...this.state,
      tempFields: {},
    });
  }

  save() {
    const { tempFields } = this.state;

    this.cancel();
    this.context.personUpdate(tempFields);
  }

  fieldOnChange(name, value) {
    this.setState({
      ...this.state,
      tempFields: {
        ...this.state.tempFields,
        [name]: value,
      },
    });
  }

  render() {
    const { personDelete } = this.context;
    const { tempFields } = this.state;

    const fieldOnChange = (name, value) =>
      this.fieldOnChange(name, value);

    const cansel = () => this.cancel();
    const save = () => this.save();

    const fields = Object.entries(this.fields);

    return (
      <Paper>
        <Table
          bodyStyle={overflow}
          wrapperStyle={overflow}
          style={background}
          selectable={false}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {fields.map(
                ([alias, { header }], index) =>
                  <TableHeaderColumn
                    key={`header-${alias}`}
                    columnNumber={index}
                  >{header}</TableHeaderColumn>,
              )}
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.getPersons().map(
              ({ id, ...person }) => (
                <TableRow key={`user${id}`}>
                  {fields.map(
                    ([alias, { type = 'text' }]) =>
                      <TableRowColumn key={`cell-${alias}-${id}`}>
                        <TableCell
                          id={id}
                          type={type}
                          name={alias}
                          value={person[alias]}
                          tempFields={tempFields}
                          onChange={fieldOnChange}
                          onEnter={save}
                        />
                      </TableRowColumn>,
                  )}
                  <TableRowColumn style={tdResetStyle} className={deleteButtonCellClass}>
                    {id === tempFields.id ? (
                      <div>
                        <IconButton
                          tooltip="Сохранить"
                          onClick={save}
                        >
                          <Done />
                        </IconButton>
                        <IconButton
                          tooltip="Отменить изменения"
                          onClick={cansel}
                        >
                          <Cancel />
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        <IconButton
                          tooltip="Редактировать"
                          onClick={() => this.edit(id)}
                        >
                          <Create />
                        </IconButton>
                        <IconButton tooltip="Удалить" onClick={() => personDelete(id)}>
                          <Clear />
                        </IconButton>
                      </div>
                    )}
                  </TableRowColumn>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default TableComponent;
