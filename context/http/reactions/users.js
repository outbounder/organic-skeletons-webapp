var alchemy = require("../../helpers/alchemy")

module.exports.init = function(plasma, config){
  var _ = require('underscore');
  return alchemy.improve(alchemy.fromActions({
    "GET /result": function(req, res){
      res.result({augmented: true})
    },
    "POST /test-login": function(req, res, next) {
      res.end("USER")
    }
  }), function(c, next){
    c.res.result = function(value){
      c.res.end(JSON.stringify(value))
    }
    next()
  })
}