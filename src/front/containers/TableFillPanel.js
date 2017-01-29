import { connect } from 'react-redux';

import TableFillPanelComponent from '../components/TableFillPanel';
import personCreate from '../actions/personCreate';

const mapDispatchToProps = dispatch => ({
  personCreate: person => dispatch(personCreate(person)),
});

const TableFillPaneContainer = connect(
  null,
  mapDispatchToProps,
)(TableFillPanelComponent);

export default TableFillPaneContainer;
