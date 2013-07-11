var http = require('http-get');

exports.htmlFetcher = function(url, path){

  http.get(url, path, function (error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log('File downloaded at: ' + result.file);
    }
  });

};

