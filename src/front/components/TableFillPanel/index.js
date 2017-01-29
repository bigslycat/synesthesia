import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';

import {
  bar as barClass,
  tools as toolsClass,
  fieldset as fieldsetClass,
  field as fieldClass,
} from './styles.less';

const fieldParams = {
  className: fieldClass,
  style: { width: false, height: false },
  inputStyle: { height: false, marginTop: '2px' },
  floatingLabelStyle: { top: '4px' },
  floatingLabelFocusStyle: { top: false },
};

class TableFillPanel extends Component {
  static propTypes = {
    personCreate: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.save = this.save.bind(this);
    this.saveOnPress = this.saveOnPress.bind(this);
    this.input = this.input.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return { fields: {
      fio: '',
      age: '',
      phone: '',
      email: '',
    } };
  }

  save() {
    this.props.personCreate(this.state.fields);
    this.setState(this.getInitialState());
  }

  saveOnPress({ key }) {
    if (key === 'Enter') this.save();
  }

  input({ target: { name } }, value) {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }

  render() {
    return (
      <Card className={barClass}>
        <CardHeader title="Создать новую запись" />
        <CardText className={toolsClass}>
          <div className={fieldsetClass}>
            <TextField
              name="fio"
              floatingLabelText="ФИО"
              hintText="Иванов Иван Иванович"
              value={this.state.fields.fio}
              onChange={this.input}
              onKeyPress={this.saveOnPress}
              {...fieldParams}
            />
            <TextField
              name="age"
              floatingLabelText="Возраст"
              hintText="Количество полных лет"
              type="number"
              value={this.state.fields.age}
              onChange={this.input}
              onKeyPress={this.saveOnPress}
              {...fieldParams}
            />
            <TextField
              name="phone"
              floatingLabelText="Телефон"
              hintText="+7 000 000-00-00"
              type="tel"
              value={this.state.fields.phone}
              onChange={this.input}
              onKeyPress={this.saveOnPress}
              {...fieldParams}
            />
            <TextField
              name="email"
              floatingLabelText="E-mail"
              value={this.state.fields.email}
              onChange={this.input}
              onKeyPress={this.saveOnPress}
              {...fieldParams}
            />
          </div>
          <IconButton
            tooltip="Сохранить"
            onClick={this.save}
          >
            <Done />
          </IconButton>
        </CardText>
      </Card>
    );
  }
}

export default TableFillPanel;
