// Elise Frigoli
// CSC 435 - Advanced Web App Development
// Assignment 1
// 03/14/20

// Including the HTML module
var http = require('http');
// Including the File System module to serve the HTML file
var fs = require('fs');

// Creating a server
http.createServer(function (req, res) {
  // Reading the contents of the HTML file
  fs.readFile('Week01HTML.html', function(err, data) {
    // Writing the response headers
    res.writeHead(200, {'Content-Type': 'text/html'});
    // Writing the HTMl file's data as a response to the client
    res.write(data);
    // Ending the response to the client
    res.end();
  });
// Setting the local port to trigger the function when accessed
}).listen(8080);
