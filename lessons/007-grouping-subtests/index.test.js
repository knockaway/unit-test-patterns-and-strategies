'use strict'

const tap = require('tap')
const object = require('./index')

// The `t` object passed to subtests is another instance of the `tap` object
// that is exported by `require('tap'`)`. Thus, `t.test` exists and works just
// as `tap.test`. Utilizing this fact, we can organize subtests into categories.
// In this test suite, we want to test each method of the object exported
// by `index.js` with a set of tests that are specific to each method. Thus,
// we create subtests with names that indicate the method being test, e.g.
// '#method1', and write subtests within it.
//
// Action: what happens if an asynchronous function is passed to the '#method1`
// test instead of a synchronous function? Do we still need to use `t.end`?
tap.test('#method1', t => {
  // Since we are going to test a single method, we can destructure that method
  // into a local variable for easier reference in each subtest.
  //
  // Experiment: what would need to change if `object.method1` relies on the
  // `this` reference?
  const { method1 } = object

  t.test('throws for failure input', async t => {
    t.throws(() => method1('failure'), /failure/)
  })

  t.test('returns method1 on success', async t => {
    const result = method1('not a failure')
    t.equal(result, 'method1')
  })

  // Notice that we passed a synchronous function to the '#method1' test.
  // Recall from lesson 002 that when we do so, we need to instruct tap as to
  // when the test is complete by invoking `t.end`. It's the same situation
  // with grouped subtests.
  t.end()
})

// This test is the same as the '#method1' test. No new concepts are introduced.
tap.test('#method2', t => {
  const { method2 } = object

  t.test('throws for non-strings', async t => {
    t.plan(3)
    const inputs = [[], {}, 42]
    inputs.forEach(input => t.throws(() => method2(input), /input must be a string/))
  })

  t.test('returns input on success', async t => {
    t.equal(method2('a string'), 'a string')
  })

  t.end()
})
