'use strict';

const tap = require('tap');
const handler = require('./root');

// This test follows the same principle as outlined in `./foo.test.js`.
// See that test suite for a full explanation.
tap.test('sends a response', async t => {
  t.plan(1);

  const reply = {
    send(payload) {
      t.strictSame(payload, { hello: 'world' });
    }
  };

  handler({}, reply);
});
