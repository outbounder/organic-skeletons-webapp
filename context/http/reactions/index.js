var chain = require("organic-alchemy").http.chain
var bodyParser = require("connect").bodyParser

module.exports.init = function(plasma, config) {
  return chain([bodyParser(), function(c, next){
    c.res.setHeader("Greeter", "Hello World!");
    next()
  }])
}