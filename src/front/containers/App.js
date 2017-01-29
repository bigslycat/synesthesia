import { connect } from 'react-redux';

import AppComponent from '../components/App';

import personCreate from '../actions/personCreate';
import personUpdate from '../actions/personUpdate';
import personDelete from '../actions/personDelete';
import personsListUpdate from '../actions/personsListUpdate';

const mapStateToProps = ({ person }) => ({
  persons: person.data,
});

const mapDispatchToProps = dispatch => ({
  personCreate: person => dispatch(personCreate(person)),
  personUpdate: person => dispatch(personUpdate(person)),
  personDelete: id => dispatch(personDelete(id)),
  personsListUpdate: persons => dispatch(personsListUpdate(persons)),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default AppContainer;
