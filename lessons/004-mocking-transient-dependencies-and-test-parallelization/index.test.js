'use strict'

const tap = require('tap')
const mockquire = require('mock-require')
const getData = require('./index')

// By default, tap proccesses test suites (`*.test.js` files) in parallel,
// but it does not process sub-tests in parallel. A sub-test is a `tap.test`
// within a test suite. This can be configured by setting `tap.jobs` to any
// number greater than `1`.
//
// Experiment: try uncommenting the following `tap.jobs` line to see how
// it affects the processing of these tests.
/* tap.jobs = 3 */

// This is a test that does not rely on any transient dependency mocking.
// The test relies on the tested function's dependencies to peform their
// functions as intended. Which is to say, `fs.readFileSync` will actually
// read data from the disk.
tap.test('basic test without any mocking', async t => {
  t.equal('This lesson', getData())
})

// This test shows how to use `mock-require` to mock the transient `fs`
// dependency. The idea is that we are only concerned with `getData` working
// correctly, not that `fs.readFileSync` does what it is guranteed to do.
tap.test('mocking the fs module', async t => {
  // Here, we are telling `mock-require` to intercept the import of the `fs`
  // module and to return an object of our own construction instead.
  mockquire('fs', {
    // While do not care about the operation of `fs.readFileSync`, we want to
    // verify that the parameter passed to it matches what we expect.
    // Since we are mocking the module to provide our own `readFileSync` method,
    // we are able to inspect the parameters passed to it and verify that they
    // match what we want them to match.
    readFileSync (filename) {
      t.ok(filename.endsWith('Readme.md'))
      return 'Some mocked data'
    }
  })

  // Mocking a dependency can have side effects. To avoid them, we should
  // always clean up after ourselves upon test completion. tap provides us
  // with `t.teardown` to facilitate this.
  //
  // Action: try commenting out this `t.teardown` block and see what happpens.
  t.teardown(() => {
    // Since we only mocked a single dependency we have opted to use the
    // `mockquire.stop` method to remove the singular mock we added. If we
    // had mocked multiple dependencies, we could use `mockquire.stopAll()`
    // instead.
    mockquire.stop('fs')
  })

  // Now that we have configured our mocking library to return what we desire
  // for the modules we want mocked, we need to re-require the module we
  // are testing in order to get a properly mocked instance of that module.
  // We use the `mockquire.reRequire` method to do this.
  //
  // Experiment: what happens if we do not re-require here? What if we use
  // the regular `require` function again, e.g.
  // `const getData = require('./index')`?
  const getData = mockquire.reRequire('./index')
  t.equal('Some mocked', getData())
})

// This test shows the side effects that can be introduced through mocking.
// To see this, remove the `t.teardown` block in the previous test.
tap.test('test side effects of mocking', async t => {
  const path = require('path')
  const fs = require('fs')
  const data = fs.readFileSync(path.join(__dirname, 'Readme.md'))
  t.ok(data.toString().startsWith('This lesson'))
})
