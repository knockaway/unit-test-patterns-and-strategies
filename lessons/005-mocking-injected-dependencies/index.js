'use strict';

const path = require('path');
const _fs = require('fs');

// Here we are injecting the `fs` dependency through standard JavaScript
// object destructuring. We assign a default implementation, `_fs`, to the
// implentation that will be used by the function: `fs`.
module.exports = function getData({ fs = _fs } = {}) {
  const importantData = fs.readFileSync(path.join(__dirname, 'Readme.md')).toString();
  return importantData.substring(0, 11);
};
