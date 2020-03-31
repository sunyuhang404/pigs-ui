const fs = require('fs');
const path = require('path');

fs.watch(path.resolve(__dirname, './views'), function (event, filename) {
  console.log(filename);
});