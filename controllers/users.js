
var path = require('path');
var appDir = path.dirname(require.main.filename);
var FileWriter = require('../writeFile.js');

module.exports.add = function (request, response) {



  var data = {
    title: 'Add User',
  }

  var html =  FileWriter.render(appDir+'/Views/Users/add.html', data);

  //var html = 'test';
  response.write(html);
  response.end();

}
