'use strict'

const tap = require('tap')
const { thisThrows, thisRejects } = require('./index')

// This test shows how we can use a standard try/catch block to test a
// function that throws an error. We are testing the case where we expect the
// function to throw.
tap.test('using try/catch for thrown errors', async t => {
  try {
    thisThrows()

    // We use `t.fail` here to explicitly show that we expect the function
    // to have thrown an error. Technically, it is superfluous as the test
    // in the `catch` block should indicate pass or fail. However, as we
    // outlined in lesson 002, we should add a `t.plan(1)` to gurantee that.
    //
    // Action: alter `thisThrows` to not throw an error to see what would happen.
    t.fail('the function did not throw as expected')
  } catch (error) {
    // The `t.match` assertion is used here because we are only concerned with
    // verifying that the expected error is found by way of its `message`
    // property.
    t.match(error, /thrown/)
  }
})

// This test shows how to use tap's built-in `t.throws` assertion in place
// of a traditional try/catch block to test an expected thrown error.
tap.test('using t.throws for thrown errors', async t => {
  // Notice that we are able to pass a simple function reference as the
  // test parameter. tap will invoke the function passed to it test for
  // the thrown error.
  //
  // Action: try `t.throws(thisThrows(), /thrown/)` to see what will happen.
  t.throws(thisThrows, /thrown/)

  // In more complicated situations, we may need to wrap the function we are
  // attempting to test with an anonymous function.
  t.throws(() => thisThrows(), /thrown/)
})

// This test shows how to test for promise rejections with a standard
// promise chain. Notice that we used a plain function for the test and
// we return the result of the promise chain. Recall from lesson 001 that
// tap recognizes functions that returns promises and relies on the
// resolve and reject states to determine test success or failure.
tap.test('using a promise chain for rejections', t => {
  // Action: try removing the `return` statement to see what will happen.
  return thisRejects()
    .then(() => t.fail('should not have resolved'))
    .catch(error => t.match(error, /rejected/))

  // Question: if the `return` statement is removed, will adding a `t.plan`
  // help?
})

// This test shows how to use tap's built-in `t.rejects` assertion to test
// a function that returns a promise which rejects.
//
// Action: if the `async` keyword is removed, will the test pass? Will using
// `t.plan` provide any benefit?
tap.test('using t.rejects for rejections', async t => {
  t.rejects(thisRejects, /rejected/)
})

// Experiment: uncomment the next test block and determine why it fails
/*
tap.test('an experiment', async t => {
  t.throws(() => foo(), /broken/)

  async function foo () {
    throw Error('broken')
  }
})
*/
