'use strict'

const tap = require('tap')
const getData = require('./index')

/* tap.jobs = 2 */

// As in lesson 004, this test shows the most basic test of the function
// without any mocking.
tap.test('basic test without any mocking', async t => {
  t.equal('This lesson', getData())
})

// Unlike in lesson 004, we don't need to use `mock-require` to mock the
// transient dependency. Since we are injecting the dependency, we can supply
// any object that meets the requirements of the dependency.
//
// Action: try uncommenting the `tap.jobs = 2` line above to see how these
// tests are affected by parallelization.
tap.test('mocking the fs module', async t => {
  const fs = {
    readFileSync (filename) {
      t.ok(filename.endsWith('Readme.md'))
      return 'Some mocked data'
    }
  }

  t.equal('Some mocked', getData({ fs }))
})

// Action: comment out the first test, lines 10 through 12. Afterward, run
// `npm test:cov:html` to generate a coverage report. In this coverage report,
// notice that the branch coverage for this lesson has fallen to 0%.
//
// Let's assume that the basic test we commented out is not feasible to
// include in our test suite. This could be due to the `getData()` function
// needing to connect to an unavailable database, or some other condition we
// are not intending to test (e.g. testing `getData()` would result in us
// effectively turning this unit test into an integration test). We can solve
// this problem by intercepting the transient dependency as we did in lesson 004.
//
// With the original basic test still commented, uncomment the following test,
// lines 45 through 54, and re-run the coverage report:
//
/* const mockquire = require('mock-require')
tap.test('reach 💯 coverage', async t => {
  mockquire('fs', {
    readFileSync () { return 'Some mocked data' }
  })
  t.teardown(() => { mockquire.stop('fs') })
  const getData = mockquire.reRequire('./index.js')

  t.equal('Some mocked', getData())
}) */
