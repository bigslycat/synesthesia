export const PERSON_CREATE = 'PERSON_CREATE';

const personCreate = ({ fio, age, phone, email }) =>
  ({ type: PERSON_CREATE, fio, age, phone, email });

export default personCreate;
