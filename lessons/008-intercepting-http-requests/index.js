'use strict';

const { request } = require('https');

module.exports = function getData() {
  return new Promise((resolve, reject) => {
    const req = request(
      'https://api.github.com/users/octocat/repos',
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          'user-agent': 'curl/7.76.1'
        }
      },
      handler
    );

    req.on('error', error => {
      reject(error);
    });
    req.end();

    function handler(res) {
      if (res.statusCode !== 200) {
        return reject(Error(`got invalid status code ${res.statusCode}`));
      }

      let data = '';
      res.on('data', d => {
        data += d;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
};
