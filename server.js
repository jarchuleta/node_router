var http = require('http');
var router = require('./router.js')



// Create a server
var server = http.createServer(router);

server.listen(8081);

// Console will print the message
console.log('Server running1 at http://127.0.0.1:8081/');
