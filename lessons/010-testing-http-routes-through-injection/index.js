'use strict'

const server = require('fastify')({ logger: false })

server.route({
  path: '/',
  method: 'GET',
  handler (request, reply) {
    reply.send({ hello: 'world' })
  }
})

server.route({
  path: '/foo',
  method: 'POST',
  schema: {
    body: {
      type: 'object',
      properties: {
        foo: { type: 'string' }
      }
    }
  },
  handler (request, reply) {
    reply.send({ foo: request.body.foo })
  }
})

module.exports = server
