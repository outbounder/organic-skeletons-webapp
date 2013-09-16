var alchemy = require("organic-alchemy")
var bodyParser = require("connect").bodyParser;

module.exports.init = function(plasma, config) {
  return alchemy.chain([bodyParser(), function(c, next){
    c.res.setHeader("Greeter", "Hello World!");
    next()
  }])
}