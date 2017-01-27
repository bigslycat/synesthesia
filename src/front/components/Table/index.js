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
  static propTypes = {
    personDelete: PropTypes.func.isRequired,
    personUpdate: PropTypes.func.isRequired,
    persons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fio: PropTypes.string,
        age: PropTypes.number,
        phone: PropTypes.string,
        email: PropTypes.string,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tempFields: {},
    };
  }

  edit(index) {
    this.setState({
      ...this.state,
      tempFields: this.props.persons[index],
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
    this.props.personUpdate(tempFields);
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
    const { persons, personDelete } = this.props;
    const { tempFields } = this.state;

    const fieldOnChange = (name, value) =>
      this.fieldOnChange(name, value);

    const cansel = () => this.cancel();
    const save = () => this.save();

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
              <TableHeaderColumn>ФИО</TableHeaderColumn>
              <TableHeaderColumn>Возраст</TableHeaderColumn>
              <TableHeaderColumn>Телефон</TableHeaderColumn>
              <TableHeaderColumn>E-mail</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {persons.map(
              ({ id, fio, age, phone, email }, index) => (
                <TableRow key={`user${id}`}>
                  <TableRowColumn>
                    <TableCell
                      id={id}
                      name="fio"
                      value={fio}
                      tempFields={tempFields}
                      onChange={fieldOnChange}
                      onEnter={save}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TableCell
                      id={id}
                      type="number"
                      name="age"
                      value={age}
                      tempFields={tempFields}
                      onChange={fieldOnChange}
                      onEnter={save}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TableCell
                      id={id}
                      name="phone"
                      value={phone}
                      tempFields={tempFields}
                      onChange={fieldOnChange}
                      onEnter={save}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TableCell
                      id={id}
                      name="email"
                      value={email}
                      tempFields={tempFields}
                      onChange={fieldOnChange}
                      onEnter={save}
                    />
                  </TableRowColumn>
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
                          onClick={() => this.edit(index)}
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
