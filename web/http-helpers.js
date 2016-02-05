var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, data){
    callback(data);
  });

  //
  // var filePath = __dirname + '/public/' + url;
  // var ext = $path.extname(filePath);
  //
  // if(ext === '.css') {
  //   headers['Content-Type'] = 'text/css';
  // }
  //
  // if(ext === '.js') {
  //   headers['Content-Type'] = 'application/javascript';
  // }
  //
  // if (filePath) {
  //   fs.readFile(filePath, 'utf8', function(err, data) {
  //     res.writeHead(200, headers);
  //     res.end(data);
  //   });
  //   return;
  // }
  // if(req.url === '/www.google.com') {
  //   var path = archive.paths.archivedSites + req.url;
  //   fs.exists(path, function(exists){
  //     if (exists) {
  //       fs.readFile(path, 'utf8', function(err, data){
  //         if(err){
  //           return "File Not Found: " + err;
  //         } else {
  //           res.writeHead(200, headers);
  //           res.end(data);
  //           return;
  //         }
  //       });
  //     }
  //   });
};

exports.serveArchives = function(res, archiveUrl, callback){
  fs.readFile(archive.paths.archivedSites+'/'+archiveUrl, 'utf8', function(err, data){
    callback(data);
  });

};
