'use strict';

module.exports = function rootHandler(request, reply) {
  reply.send({ hello: 'world' });
};
