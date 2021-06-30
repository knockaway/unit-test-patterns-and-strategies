'use strict';

const tap = require('tap');
const add = require('./index');

// Notice that we are passing an asynchronous function to `tap.test`. This tells
// tap that the test should pass if the promise resolves and fail if the
// promise rejects. In general, we recommend this pattern because it is easy
// to use. However, see lesson 002 for an example of how it can be misleading.
tap.test('adds two numbers correctly', async t => {
  const result = add(1, 2.14);

  // If this assertion is false, tap recognizes that the overall test
  // fails and reports it as a failing test.
  //
  // Action: try changing the assertion to a failing case.
  t.equal(result, 3.14);

  // Action: try uncommenting the next line to see if the test fails.
  /* return Promise.reject(Error('failed test')) */
});
