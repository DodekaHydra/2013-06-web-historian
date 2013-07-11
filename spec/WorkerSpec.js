var stubs = require("./helpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
var fs = require("fs");

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["wikipedia.com", "google.com"];
    var filePath = __dirname + "/testdata/sites.txt";

    fs.writeFileSync(filePath, urlArray.join("\n"));

    var resultArray = [];
    var result = htmlFetcherHelpers.readUrls(filePath, function(urls){
      resultArray.push(urls);
    });
    waits(200);
    runs(function(){
      expect(resultArray).toEqual(urlArray);
    });
  });

  it("should have a 'downloadUrls' function", function(){
    var result = htmlFetcherHelpers.downloadUrls();
    expect(result).toBeTruthy();
  });
});