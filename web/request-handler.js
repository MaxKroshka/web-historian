var fs = require('fs');
var $path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var headers = helpers.headers;
var getAssets = helpers.serveAssets;
var getArchives = helpers.serveArchives;

// var Promise = require('bluebird');
// require more modules/folders here!

exports.handleRequest = function(req, res) {
  if(req.method === "GET"){

    if(req.url === "/") {
      getAssets(res, '/index.html', function(data){
        res.writeHead(200, headers);
        res.end(data);
      });
      return;
    } else {
      res.writeHead(404, headers);
      res.end();
    }
  } else if(req.method === "POST"){
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    }).on('end', function(){
      body = body.slice(4);
      archive.isUrlInList(body, function(inList){
        if(inList){
          archive.isUrlArchived(body, function(inArchive){
            if(inArchive) {
              getArchives(res, body, function(data){
                res.writeHead(200, headers);
                res.end(data);
              });
            } else {
              archive.readListOfUrls(function(urls){
                archive.downloadUrls(urls);
                getAssets(res, '/loading.html', function(data){
                  res.writeHead(302, headers);
                  res.end(data);
                });
                return;
              });
            }
          });
        }
        else{
          archive.addUrlToList(body,function(){
            archive.readListOfUrls(function(urls){
              archive.downloadUrls(urls);
              getAssets(res, '/loading.html', function(data){
                res.writeHead(302, headers);
                res.end(data);
              });
              return;
            });
          });
        }
      });
    });
  } else {
    res.end(archive.paths.list);
	}
};
