'use strict';

// This is a standard Fastify plugin that merely registers a couple of routes.
// For more information about Fastify plugins, see
// https://www.fastify.io/docs/latest/Plugins/ and a subsequent lesson.
module.exports = async function routes(server) {
  server.route({
    path: '/',
    method: 'GET',

    // Instead of defining the route handler inline with the route configuration
    // we import an independent testable function.
    handler: require('./handlers/root')
  });

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
    handler: require('./handlers/foo')
  });
};
