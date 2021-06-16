'use strict'

const tap = require('tap')
const handler = require('./foo')

// This test shows how a route handler function can be tested independently of
// any server instance. Given that `request` and `reply` are known objects,
// we can use our knowledge of their expected shape to construct them
// specific to the testing situation. In this test, we want to verify that
// a payload which has passed schema validation (which was handled by Fastify
// itself) is used by the handler to send a response using data from that
// payload.
tap.test('parrots input', async t => {
  // While not technically necessary, we are establishing a plan here to
  // indicate both to `tap` and the reader that this test should have one
  // assertion pass.
  t.plan(1)

  // Experiment: write another test that submits an empty payload object, `{}`.
  // Should the handler be modified to account for this? Why or why not?
  const request = {
    body: {
      foo: 'hello world'
    }
  }

  const reply = {
    send (payload) {
      t.strictSame(payload, { foo: 'hello world' })
    }
  }

  handler(request, reply)
})
