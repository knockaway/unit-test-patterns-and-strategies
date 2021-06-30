'use strict';

const tap = require('tap');
const plugin = require('./plugin');

// As with the handler tests in lesson 011, we can test Fastify plugins
// by recognizing that plugins receive standardized input objects and making
// use of the contract implied by this standardization to write unit tests
// for plugins. In this test, we opt to test one part of the plugin: verifying
// that the plugin decorates the `request` prototype with a function.
tap.test('decorates request object', async t => {
  const server = {
    // This plugin provides a single decoration. So it is easy to test.
    // If the plugin provided multiple decorations, this test would be a little
    // more complicated.
    //
    // Action: add another decoration in the plugin and make this test consider
    // both decorations.
    decorateRequest(name, value) {
      t.equal(name, 'foo');
      t.type(value, Function);
      t.equal('foo', value());
    },

    // We are not testing the route definition in this test. But we need
    // to account for the method being used by the plugin. So we provide a
    // simple stub function.
    route() {
      t.pass();
    }
  };

  await plugin(server);
});

// This test is very similar to the previous test. The difference is that it
// tests both the route being defined and that the route makes uses of the
// decorator.
//
// Experiment: add a request decorator to the plugin in lesson 011 and adjust
// one of the handlers to use the decorator. How would the test for that handler
// need to be adjusted?
tap.test('defines a route', async t => {
  const server = {
    decorateRequest() {
      t.pass();
    },

    route(config) {
      t.equal(config.path, '/');
      t.equal(config.method, 'GET');
      t.type(config.handler, Function);

      // This is a rough approximation of what Fastify does internally.
      // We do this here so that we can have access to the route handler
      // outside of the plugin for the subsequent handler test.
      //
      // Experiment: inline the handler test here instead of by mutating
      // the `server` object.
      this.routes = { '/': config.handler };
    }
  };

  await plugin(server);

  const request = {
    foo() {
      return 'mock foo';
    }
  };
  const reply = {
    send(payload) {
      t.strictSame(payload, { foo: 'mock foo' });
    }
  };
  server.routes['/'](request, reply);
});
