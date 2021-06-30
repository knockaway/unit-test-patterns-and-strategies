'use strict'

const tap = require('tap')
const httpGet = require('./simple-req')
const server = require('./index')

// This test shows how we can start a server instance, issue a request to it,
// and verify the response is as we expect it to be.
tap.test('responds with success', async t => {
  // The `.listen` method accepts a port number to listen upon. By passing `0`
  // we are asking for "any available port". Once the server has started, it
  // will return the server address.
  const address = await server.listen(0)
  const response = await httpGet(`${address}/`)
  t.strictSame(response, '{"hello":"world"}')

  t.teardown(() => {
    // Experiment: commment the next line. Will the test still pass?
    return server.close()
  })
})
