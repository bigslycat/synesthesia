export const PERSONS_LIST_UPDATE = 'PERSONS_LIST_UPDATE';

const personsListUpdate = persons => ({
  type: PERSONS_LIST_UPDATE,
  persons,
});

export default personsListUpdate;
