exports.datadir = function(currentDir, pathToText){
  currentDir = currentDir || __dirname;
  pathToText = pathToText || "data/sites.txt";
  console.log(currentDir, "   ", pathToText);
  return currentDir + pathToText;
};

exports.handleRequest = function (req, res) {
  console.log(exports.datadir());

  var statusCode = 200,
      headers = require("./defaultCorsHeaders.js"),
      url = require("url"),
      href = url.parse(req.url).href,
      host = url.parse(req.url).host,
      fs = require('fs'),
      pathname = url.parse(req.url).pathname;

  headers.defaultCorsHeaders['Content-Type'] = "application/json";
  res.writeHead(statusCode, headers.defaultCorsHeaders);

  switch(req.method){
    case "GET":
      req.on('end', function(){
        //if (pathname === "/"){
        var path = pathname.length > 1 ? pathname : '/public/index.html';
        fs.readFile(__dirname + path, function(error, content) {
          // if (error) {
          //   res.writeHead(500);
          //   res.end();
          // }
          // else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          //console.log(content);
          res.end(content);
          // }
        });
        //}
      });
      break;

    case "POST":
    req.on('data', function(data){
      fs.appendFile(exports.datadir(__dirname, pathname), data);
    });
    req.on('end', function(){
      res.writeHead(201);
      res.end();
    });
      break;

    default:
  }

    //res.writeHead(404);
    // req.on('end', function(){
    //   res.end('[]');
    // });
};
