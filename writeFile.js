var fs = require('fs');
exports.write = function (path, response) {

  fs.readFile(path, function (err, data) {
    if (err) {
       console.log("Can't write file " + path + " error:" + err);
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
