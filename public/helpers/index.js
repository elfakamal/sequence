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

export const formatSchema = (schema = []) => {
  console.log('SCHEMA', schema);

  return ({
    // relations: Object.values(getEntityPairs(schema))
    //   .reduce((acc, pair) => acc.concat(pair), []),
    relations: schema,
    entities: Object.keys(schema.reduce((acc, relation) => (
      { ...acc, [relation.from]: true, [relation.to]: true }
    ), {})),
  });
};

export const includes = (box1, box2) => (
  (box1.y < box2.y) && ((box1.y + box1.height) > (box2.y + box2.height))
);
