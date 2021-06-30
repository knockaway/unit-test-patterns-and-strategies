'use strict';

const tap = require('tap');
const server = require('./index');

// This test is a direct copy of the code from lesson 010. It is included here
// to show that routes can still be tested completely via the `.inject` method.
// However, given that each handler is a testable function in this lesson,
// it can be argued that this test suite is more like an integration test
// suite than a unit test suite. Essentially, the tests in this suite are
// testing both the funtionality provided by Fastify itself, e.g. schema
// validation, and that the handler functions do what we intend for them to
// do.
tap.test('responds with success', async t => {
  const response = await server.inject({ path: '/', method: 'GET' });
  t.strictSame(response.json(), { hello: 'world' });
});

tap.test('post route rejects for bad payload', async t => {
  const response = await server.inject({
    path: '/foo',
    method: 'POST',
    payload: { foo: { bar: 'bar' } }
  });
  t.equal(response.statusCode, 400);
  t.match(response.json(), { message: 'body.foo should be string' });
});

tap.test('post route returns success', async t => {
  const response = await server.inject({
    path: '/foo',
    method: 'POST',
    payload: { foo: 'hello world' }
  });
  t.equal(response.statusCode, 200);
  t.strictSame(response.json(), { foo: 'hello world' });
});
