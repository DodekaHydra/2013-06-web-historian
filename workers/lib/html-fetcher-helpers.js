exports.readUrls = function(filePath, cb){
  var fs = require('fs');
  fs.readFile(filePath, 'utf8', function(err, data){
    var urls = data.split('\n');
    for(var i = 0; i < urls.length; i++){
      exports.downloadUrls(urls[i]);
      cb(urls[i]);
    }
  });
};

exports.downloadUrls = function(urls){
  var downloader = require('./../htmlfetcher.js');
  var path = require('path');
  var pathLocation = path.join(__dirname, '../../data/sites', urls + '.html');
  return downloader.htmlFetcher(urls, pathLocation);
};