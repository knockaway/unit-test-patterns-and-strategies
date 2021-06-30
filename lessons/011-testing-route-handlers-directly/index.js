'use strict'

const server = require('fastify')({ logger: false })

server.register(require('./routes'))

module.exports = server
