var alchemy = require("../../helpers/alchemy")
var bodyParser = require("connect").bodyParser;

module.exports.init = function(plasma, config) {
  return alchemy.chain([bodyParser(), function(c, next){
    c.res.write("Hello World!");
    next()
  }])
}