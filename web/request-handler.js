exports.datadir = function(currentDir, pathToText){
  currentDir = currentDir || __dirname;
  pathToText = pathToText || "data/sites.txt";
  // console.log(currentDir, "   ", pathToText);
  return currentDir + pathToText;
};

exports.handleRequest = function (req, res) {
  // console.log(exports.datadir());

  var statusCode = 200,
      headers = require("./defaultCorsHeaders.js"),
      url = require("url"),
      href = url.parse(req.url).href,
      host = url.parse(req.url).host,
      fs = require('fs'),
      pathname = url.parse(req.url).pathname;

  headers.defaultCorsHeaders['content-type'] = "application/json";
  res.writeHead(statusCode, headers.defaultCorsHeaders);

  var path = require('path');
  switch(req.method){
    case "GET":
      req.on('end', function(){
        var pathLocation = pathname.length > 1 ? path.join(__dirname, '../data/sites/', pathname) : __dirname + '/public/index.html';
        fs.readFile(pathLocation, function(error, content) {
          if (error){
            res.writeHead(404);
            // console.log(error);
            res.end();
          } else {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(content);
          }
        });
      });
      break;

    case "POST":
      req.on('data', function(data){
        var pathLocation = path.join(__dirname, '../spec/testdata/sites.txt');
        // console.log('path: ', pathLocation, "\tdata: ", data);
        fs.writeFileSync(pathLocation, data.slice(4)+'\n');
      });

      req.on('end', function(){
        res.writeHead(302);
        res.end();
      });
      break;

    default:
      console.log('Y U NO POST?');
      break;
  }

    //res.writeHead(404);
    // req.on('end', function(){
    //   res.end('[]');
    // });
};
