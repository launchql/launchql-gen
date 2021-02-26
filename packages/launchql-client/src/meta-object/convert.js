import path from 'path';
import fs from 'fs';

export function convertFromMetaSchema(metaSchema) {
  const {
    _meta: { tables }
  } = metaSchema;

  const result = {
    tables: []
  };

  for (const table of tables) {
    result.tables.push({
      name: table.name,
      fields: table.fields.map((f) => pickField(f)),
      primaryConstraints: pickArrayConstraint(table.primaryKeyConstraints),
      uniqueConstraints: pickArrayConstraint(table.uniqueConstraints),
      foreignConstraints: pickForeignConstraint(
        table.foreignKeyConstraints,
        table.relations
      )
    });
  }

  return result;
}

function pickArrayConstraint(constraints) {
  if (constraints.length === 0) return [];
  const c = constraints[0];
  return c.fields.map((field) => pickField(field));
}

function pickForeignConstraint(constraints, relations) {
  if (constraints.length === 0) return [];

  const { belongsTo } = relations;

  return constraints.map((c) => {
    const { fields, refFields, refTable } = c;

    const fromKey = pickField(fields[0]);
    const toKey = pickField(refFields[0]);

    const matchingBelongsTo = belongsTo.find((c) => {
      const field = pickField(c.keys[0]);
      return field.name === fromKey.name;
    });

    // Ex: 'ownerId' will have an alias of 'owner', which has further selection of 'User' type
    if (matchingBelongsTo) {
      fromKey.alias = matchingBelongsTo.fieldName;
    }

    return {
      refTable: refTable.name,
      fromKey,
      toKey
    };
  });
}

function pickField(field) {
  return {
    name: field.name,
    type: field.type
  };
}

function generateMetaObjectFixture() {
  const inDir = path.resolve(
    __dirname,
    '../../__fixtures__/api/meta-schema.json'
  );
  const outDir = path.resolve(
    __dirname,
    '../../__fixtures__/api/meta-obj.json'
  );
  fs.readFile(inDir, { encoding: 'utf8' }, (err, data) => {
    if (err) return console.log(err);
    const converted = convertFromMetaSchema(JSON.parse(data));
    fs.writeFile(outDir, JSON.stringify(converted), (err) => {
      if (err) return console.log(err);
      console.log('DONE');
    });
  });
}
