export const PERSON_UPDATE = 'PERSON_UPDATE';

const personUpdate = ({ id, fio, age, phone, email }) =>
  ({ type: PERSON_UPDATE, id, fio, age, phone, email });

export default personUpdate;
