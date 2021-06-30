'use strict';

const _database = {
  select() {
    throw Error('null implementation');
  }
};

// This example function requires a Knex instance via the `database` parameter
// and optionally accepts a query filter via the `whereColA` parameter. This
// allows us to show how to handle the necessary state setup and clearing
// before each subtest.
module.exports = async function getData({ database = _database, whereColA = null } = {}) {
  return database
    .select('*')
    .from('foo')
    .where(builder => {
      if (whereColA === null) return;
      builder.where({ col_a: whereColA });
    });
};
