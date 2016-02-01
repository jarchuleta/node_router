
var fs = require('fs');
var url = require('url');


module.exports =  function (request, response){
  // Parse the request containing file name
  // assuming url.parse sanitized pathname
  var pathname = url.parse(request.url).pathname;

  // get the paths split by /
  var paths = pathname.split("/");

  // Print the name of the file for which request is made.
  console.log("Request for " + pathname + " received.");



  // If a file exists
  var stats;
  if (pathname !== "/"){
    try {
      stats = fs.statSync(pathname.substr(1));
    } catch(err) {
      //console.log(err);
      //ignore, handled by extra case
    }
  }
  if (pathname === "/"){
    // handle default case here
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("Hello World!!");
    response.end();

  // read the file statically
}else if(stats && stats.isFile() === true){

    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         //console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{
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
  //otherwise look for a handler in requestHandler
  else if (paths.length >= 1) {
    // pass controller based controller/function


    var requestHandler;
    var moduleName;
    try {
      moduleName ='./controllers/'+paths[1]+'.js'
      requestHandler = require(moduleName);

    } catch(e) {
      console.log("Module not found " + moduleName + " error: " + e);
    }

    var functionName;
    try {
      functionName = paths[2];
      requestHandler[functionName](request, response);

    } catch (e) {
      console.log("Function "+ functionName +" not found in " + moduleName);
    }
    response.end();
  // Handle the none route condidtions
  } else {
    console.log("No request handler found for " + pathname);

    response.writeHead(404, {"Content-Type": "text/plain"});

    response.write("404 Not found");

    response.end();

  }



}
