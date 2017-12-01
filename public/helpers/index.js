import moment from 'moment';
import lodash from 'lodash';

export const getEntityPairs = relations => (
  relations.reduce((acc, relation) => {
    const { from, to } = relation;
    const key = `${from}::${to}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(relation);
    return acc;
  }, {})
);

const sortBy = lodash.sortByAll ? lodash.sortByAll : lodash.sortBy;

const timePredicate = (flow) => moment(flow['timestamp']).valueOf();
const messagePredicate = (flow) => flow.message !== 'response';

export const formatSchema = (schema = []) => {
  console.log('schema', schema);
  const relations = sortBy(schema, [timePredicate, messagePredicate]);

  return ({
    relations,
    entities: Object.keys(schema.reduce((acc, relation) => (
      { ...acc, [relation.from]: true, [relation.to]: true }
    ), {})),
  });
};

export const includes = (box1, box2) => (
  (box1.y < box2.y) && ((box1.y + box1.height) > (box2.y + box2.height))
);
