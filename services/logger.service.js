var fs = require("fs");

var Logger = (exports.Logger = {});
var errorStream = fs.createWriteStream("logs/error.txt");

Logger.error = function(msg) {
  errorStream.write(msg);
};