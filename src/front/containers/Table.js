import { connect } from 'react-redux';

import TableComponent from '../components/Table';
import personDelete from '../actions/personDelete';
import personUpdate from '../actions/personUpdate';

const mapStateToProps = ({ person }) => ({
  persons: person.data,
});

const mapDispatchToProps = dispatch => ({
  personDelete: id => dispatch(personDelete(id)),
  personUpdate: person => dispatch(personUpdate(person)),
});

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableComponent);

export default TableContainer;
