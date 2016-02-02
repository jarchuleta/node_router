var fs = require('fs');
var handlebars = require('handlebars')

exports.write = function (path, response) {

  fs.readFile(path, function (err, data) {
    if (err) {
       console.log("Can't read file " + path + " error:" + err);
       // HTTP Status: 404 : NOT FOUND
       // Content Type: text/plain
       response.writeHead(404, {'Content-Type': 'text/html'});
       response.end();
    }else{
      console.log("writing file " + path);
       //Page found
       // HTTP Status: 200 : OK
       // Content Type: text/plain
       response.writeHead(200, {'Content-Type': 'text/html'});

       // Write the content of the file to response body
       response.write(data.toString());
       response.end();
    }
  });
}


exports.renderPartial = function (path, data){


  try{
    var source = fs.readFileSync(path, 'utf-8');
    var template = handlebars.compile(source);
    var html = template(data);

    return html.toString();
  }
  catch (error)
  {

       console.log("Can't read file " + path + " error:" + err);

  }
}
