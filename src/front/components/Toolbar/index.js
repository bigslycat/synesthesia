import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

import {
  toolbar as tollbarClass,
  codeField as codeFieldClass,
} from './styles.less';

const prepareValue = value => (
  typeof value === 'string' && value.search(',') > -1 ?
    `"${value}"` : value
);

const personToString = person => Object.values(person)
  .map(prepareValue)
  .join(',');

class Toolbar extends Component {
  static contextTypes = {
    personsListUpdate: PropTypes.func.isRequired,
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
    personsToExport: PropTypes.arrayOf(
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
      json: JSON.stringify(this.context.persons.map(
        ({ fio, age, phone, email }) => ({ fio, age, phone, email }),
      ), null, ' '),
    };

    this.setJson = this.setJson.bind(this);
  }

  setJson(e, json) {
    this.setState({ json });

    try {
      const persons = JSON.parse(json);
      if (Array.isArray(persons)) this.context.personsListUpdate(persons);
    } catch (err) {
      // nothing do
    }
  }

  getCsv() {
    return this.context.personsToExport.map(personToString).join('\n');
  }

  render() {
    return (
      <Card className={tollbarClass}>
        <Tabs>
          <Tab
            label="JSON"
            icon={<ModeEdit />}
          >
            <CardText>
              <TextField
                className={codeFieldClass}
                style={{ width: false, display: false }}
                textareaStyle={{ font: false }}
                floatingLabelText="JSON"
                multiLine
                rows={5}
                rowsMax={25}
                value={this.state.json}
                onChange={this.setJson}
              />
            </CardText>
          </Tab>
          <Tab
            label="CSV"
            icon={<FileDownload />}
          >
            <CardText>
              <pre>
                {this.getCsv()}
              </pre>
            </CardText>
          </Tab>
        </Tabs>
      </Card>
    );
  }
}

export default Toolbar;
