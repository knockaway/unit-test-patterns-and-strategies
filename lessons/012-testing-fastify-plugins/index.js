'use strict'

const server = require('fastify')({ logger: false })

server.register(require('./plugin'))

module.exports = server
