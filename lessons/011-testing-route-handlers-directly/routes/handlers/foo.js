'use strict'

module.exports = function fooHandler (request, reply) {
  reply.send({ foo: request.body.foo })
}
