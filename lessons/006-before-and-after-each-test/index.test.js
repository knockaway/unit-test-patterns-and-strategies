'use strict'

const tap = require('tap')
const knex = require('knex')
const mockKnex = require('mock-knex')
const getData = require('./index')

// The `tap.beforeEach` function allows us to perform some setup actions
// prior to each subtest within the test suite. In this lesson, we are using
// the fact that `knex` requires a database connection in order to function,
// combined with the fact that `mock-knex` utilizes a singleton within its
// internals. This pairing means we need to create a new database connection,
// and mock that connection, before testing.
//
// Additionally, the `tap.beforeEach` function provides access to the test
// object, `t`. Through this object we have access to an object that is scoped
// to each individual subtest -- `t.context`. We make use of this `context`
// object to provide the mocked database connection to the subtest.
tap.beforeEach(t => {
  const db = knex({ client: 'mysql2' })
  t.context.database = mockKnex.mock(db)
  t.context.tracker = mockKnex.getTracker()
  t.context.tracker.install()
})

// As with `tap.beforeEach`, `tap.afterEach` allows us to perform clean up
// actions after each individual subtest. In this lesson we need to tell the
// `mock-knex` library that its internal singleton tracker object needs to
// be reset in preparation for the next subtest.
tap.afterEach(t => {
  t.context.tracker.uninstall()
})

// This test makes use of the setup we have done in `beforeEach` to inspect
// the query peformed by `getData`. The test verifies that the unfiltered
// invocation of the function generates an unfiltered SQL statement without
// any bind parameters.
tap.test('selects everything without a filter', async t => {
  t.plan(2)

  const { database, tracker } = t.context

  tracker.on('query', query => {
    t.equal(query.sql, 'select * from `foo`')
    t.ok(query.bindings.length === 0)
    query.response([])
  })

  await getData({ database })
})

// This test extends the first test by testing the filtered invocation of the
// `getData` function. It further verifies that the SQL statement generated
// includes the desired `where` clause with appropriate bind parameters.
tap.test('select filtered rows', async t => {
  t.plan(2)

  const { database, tracker } = t.context

  tracker.on('query', query => {
    t.equal(query.sql, 'select * from `foo` where (`col_a` = ?)')
    t.strictSame(query.bindings, ['bar'])
    query.response([])
  })

  await getData({ database, whereColA: 'bar' })
})

// Finally, this test covers the default parameters of the `getData` function
// as covered in lesson 005.
tap.test('default database connection fails', async t => {
  t.rejects(getData, /null implementation/)
})
