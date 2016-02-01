exports.hello = function (request, response) {
  console.log("Request handler 'hello' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("hello world");
  response.end();

}
