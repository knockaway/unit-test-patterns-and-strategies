'use strict'

const tap = require('tap')
const server = require('./index')

// This test shows how we can use Fastify's included testing feature, `.inject`,
// to test the route defined by the server.
tap.test('responds with success', async t => {
  // Compare this test with the test in lesson 009. Notice that in this test
  // we do not actually start the server. Nor do we need to stop it once the
  // test is complete. Also, we don't need any extra tools to issue the
  // request.
  const response = await server.inject({ path: '/', method: 'GET' })
  t.strictSame(response.json(), { hello: 'world' })
})

// This test shows that the `.inject` method goes through the full server
// request lifecycle just as if we had started the server and issued a "real"
// request to it. In this test, we issue a request to a route that requires
// a POST body to match a specific schema. Since Fastify verifies that requests
// validate against schemas prior to passing the request to the defined handler,
// we are able to send a "bad" payload and get back a "bad request" response.
// This shows that the request from `.inject` is handled just as it would be
// if the request were sent to a live server.
tap.test('post route rejects for bad payload', async t => {
  const response = await server.inject({
    path: '/foo',
    method: 'POST',
    payload: { foo: { bar: 'bar' } }
  })
  t.equal(response.statusCode, 400)
  t.match(response.json(), { message: 'body.foo should be string' })
})

// This test shows that we can pass validation and get a response from our
// defined handler.
tap.test('post route returns success', async t => {
  const response = await server.inject({
    path: '/foo',
    method: 'POST',
    payload: { foo: 'hello world' }
  })
  t.equal(response.statusCode, 200)
  t.strictSame(response.json(), { foo: 'hello world' })
})
