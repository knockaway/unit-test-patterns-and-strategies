'use strict';

const { request } = require('http');

// This module exists to simplify the testing in `index.test.js` without
// having to complicate it with extra dependencies. This code can be safely
// ignored.
module.exports = async function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = request(url, res => {
      let data = '';
      res.on('data', d => {
        data += d;
      });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
};
