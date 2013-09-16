var alchemy = require("organic-alchemy")
var rest = require("organic-reactions-restactions")

var userLogged = false; // never do this kind of programming

module.exports.init = function(plasma, config, url_base){
  return alchemy.chain(function(c, next){
    c.res.result = function(value){
      c.res.end(JSON.stringify(value))
    }
    if(userLogged) // of course
      c.req.user = {role: "admin"};
    next()
  }, rest.fromActions(url_base, {
    "GET /result": function(req, res, next){
      res.result({augmented: true})
    },
    "POST /test-login": function(req, res, next) {
      userLogged = true; // XXX
      res.end("USER")
    }
  }))
}