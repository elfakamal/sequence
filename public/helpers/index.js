export const formatSchema = schema => ({
  relations: schema,
  entities: Object.keys(schema.reduce((acc, relation) => (
    { ...acc, [relation.from]: true, [relation.to]: true }
  ), {})),
});

export const includes = (box1, box2) => (
  (box1.y < box2.y) && ((box1.y + box1.height) > (box2.y + box2.height))
);
