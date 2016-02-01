
var path = require('path');
var appDir = path.dirname(require.main.filename);
var FileWriter = require('../writeFile.js');

exports.add = function (request, response) {
  console.log("Request handler 'hello' was called.");

  FileWriter.write(appDir+'/Views/Users/add.html', response);

}
