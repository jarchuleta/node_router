
var path = require('path');
var appDir = path.dirname(require.main.filename);
var FileWriter = require('../writeFile.js');

exports.add = function (request, response) {
  
  var data = {
    title: 'Add User',
  }

  var html =  FileWriter.renderPartial(appDir+'/Views/Users/add.html', data);

  response.write(html);
  response.end();

}
