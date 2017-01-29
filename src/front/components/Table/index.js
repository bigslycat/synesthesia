import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Clear from 'material-ui/svg-icons/content/clear';
import Create from 'material-ui/svg-icons/content/create';
import Done from 'material-ui/svg-icons/action/done';
import Sort from 'material-ui/svg-icons/content/sort';

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
        field: null,
        order: 0,
      },
    };

    this.sortingChange = this.sortingChange.bind(this);
  }

  getPersons() {
    const { field, order } = this.state.sorting;

    if (!field) return this.context.persons;

    const constructor = field === 'age' ? Number : (value = '') => String(value);
    const persons = [...this.context.persons];

    persons.sort(
      (personA, personB) => {
        const fieldA = constructor(personA[field]);
        const fieldB = constructor(personB[field]);

        if (!order || fieldA === fieldB) return 0;
        else if (fieldA > fieldB) return 1 * order;
        return -1 * order;
      },
    );

    return persons;
  }

  getPersonById(targetId) {
    return this.context.persons.filter(({ id }) => (id === targetId))[0];
  }

  getSortIcon(alias) {
    const { sorting: { field, order } } = this.state;

    if (field !== alias || !order) return Sort;
    else if (order < 0) return ArrowDropUp;
    return ArrowDropDown;
  }

  getNextOrder(nextField) {
    const { field, order } = this.state.sorting;

    if (field !== nextField) return 1;
    else if (order <= 0) return order + 1;
    return -1;
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

  sortingChange({ target: { name: field } }) {
    this.setState({
      sorting: {
        field,
        order: this.getNextOrder(field),
      },
    });
  }

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
                ([alias, { header }], index) => {
                  const Icon = this.getSortIcon(alias);

                  return (
                    <TableHeaderColumn key={`header-${alias}`} columnNumber={index} >
                      <FlatButton
                        name={alias}
                        label={header}
                        icon={<Icon />}
                        onClick={this.sortingChange}
                      />
                    </TableHeaderColumn>
                  );
                },
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
