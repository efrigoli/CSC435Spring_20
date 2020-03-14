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
  console.log(__dirname);
  // Reading the contents of the HTML file
  fs.readFile('Week01HTML.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // Writing the HTMl file's data
    res.write(data);
    res.end();
  });
// Setting the local port
}).listen(8080);
