var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var fs = require('fs');
// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";

// fs.readFile(__dirname+"/../client/index.html", function(err, html){
var server = http.createServer(function(req, res){
  // if(url asks for file){ return function that supplies file}
  // else
  handler.handleRequest(req, res);
});
if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}
// });
