'use strict'

const server = require('fastify')({ logger: false })

server.route({
  path: '/',
  method: 'GET',
  handler (request, reply) {
    reply.send({ hello: 'world' })
  }
})

module.exports = server
