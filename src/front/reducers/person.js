import remove from 'lodash/remove';

import { PERSON_CREATE } from '../actions/personCreate';
import { PERSON_UPDATE } from '../actions/personUpdate';
import { PERSON_DELETE } from '../actions/personDelete';

const getInitialState = () => ({
  data: [],
  idCounter: 0,
});

const person = (
  state = getInitialState(),
  { id, type, fio, age, phone, email },
) => {
  switch (type) {
    case PERSON_CREATE: {
      const newId = state.idCounter + 1;
      const newPerson = { id: newId, fio, age, phone, email };

      return {
        data: [...state.data, newPerson],
        idCounter: newId,
      };
    }

    case PERSON_UPDATE:
      return {
        ...state,
        data: state.data.map(
          user => (
            user.id === id ?
              { id, fio, age, phone, email } :
              user
          ),
        ),
      };

    case PERSON_DELETE: {
      return {
        ...state,

        data: remove(
          state.data,
          user => user.id === id,
        ),
      };
    }

    default:
      return state;
  }
};

export default person;
