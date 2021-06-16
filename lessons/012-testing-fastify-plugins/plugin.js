'use strict'

// This is a basic Fastify plugin (https://www.fastify.io/docs/latest/Plugins/).
// It does two things:
//   1. defines a decorator on the `request` object prototype
//   2. defines a route that makes use of the request decorator
module.exports = async function plugin (server) {
  server.decorateRequest('foo', function () {
    return 'foo'
  })

  server.route({
    path: '/',
    method: 'GET',
    handler (request, reply) {
      reply.send({ foo: request.foo() })
    }
  })
}
