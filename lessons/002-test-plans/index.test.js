'use strict';

const tap = require('tap');
const finishesLater = require('./index');

// This test shows how we can test functions that require callbacks. Notice
// that we pass a plain function, instead of an asynchronous function like we did
// in lesson 001, to `tap.test`. This tells tap to expect either a known plan
// or an explicit "end" to the test. In this case, we are using an explicit
// end.
tap.test('without a plan', t => {
  finishesLater(done);

  function done(error, result) {
    t.error(error);
    t.equal(result, 'finished');

    // Since we have not told tap how many assertions to expect, we need to
    // tell tap that the test is complete. We do this by invoking `t.end`.
    //
    // Action: try commenting out the next line to see what happens
    t.end();
  }
});

// In this case, we are once again passing a standard function to `tap.test`.
// However, this time, we tell tap that the test should conduct exactly two
// assertions. If any more or fewer assertions are completed, the test will
// fail. We do this through the usage of `t.plan`.
tap.test('with a plan', t => {
  // Action: try adjusting the number of expected assertions to see what happens
  t.plan(2);

  finishesLater(done);

  function done(error, result) {
    t.error(error);
    t.equal(result, 'finished');
  }
});

// This test shows how relying on the asynchronous function feature of tap
// is not a guarantee that the test does what it is intended to do. This test
// "passes" because the promise resolves. But it is a BROKEN TEST because we
// never actually tested the `done` callback gets invoked correctly.
tap.test('with a promise that resolves (fixed)', async t => {
  // Action: uncomment the next line to see how using `t.plan` can fix this test
  // t.plan(2)
  finishesLater(() => {});

  /* eslint-disable no-unused-vars */
  function done(error, result) {
    t.error(error);
    t.equal(result, 'finished');
  }

  // If you follow the suggested action and uncomment `t.plan(2)` then this
  // test will correctly start failing. It will start failing because tap will
  // recognize that the planned for two assertions were never encountered.
  // This shows how `t.plan` is useful in certain situations to guarantee that
  // the test is exercising the desired code paths.
});
