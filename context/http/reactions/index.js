var alchemy = require("../../helpers/alchemy")
var bodyParser = require("connect").bodyParser;

module.exports.init = function(plasma, config) {
  return alchemy.chain([bodyParser(), function(c, next){
    if(c.req.url.indexOf("crud") === -1)
      c.res.write("Hello World!");
    next()
  }])
}