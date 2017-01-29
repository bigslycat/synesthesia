import { connect } from 'react-redux';

import ToolbarComponent from '../components/Toolbar';
import personsListUpdate from '../actions/personsListUpdate';

const mapStateToProps = ({ person: { data } }) => ({
  persons: data,
});

const mapDispatchToProps = dispatch => ({
  personsListUpdate: persons => dispatch(personsListUpdate(persons)),
});

const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolbarComponent);

export default ToolbarContainer;
