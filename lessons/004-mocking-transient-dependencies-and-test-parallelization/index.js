'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function getData() {
  const importantData = fs.readFileSync(path.join(__dirname, 'Readme.md')).toString();
  return importantData.substring(0, 11);
};
