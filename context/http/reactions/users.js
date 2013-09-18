var chain = require("organic-alchemy").http.chain
var fromActions = require("organic-reactions-rest").fromActions

var userLogged = false; // never do this kind of programming

module.exports.init = function(plasma, config, url_base){
  return chain(function(c, next){
    c.res.result = function(value){
      c.res.end(JSON.stringify(value))
    }
    if(userLogged) // of course
      c.req.user = {role: "admin"};
    next()
  }, fromActions(url_base, {
    "GET /result": function(req, res, next){
      res.result({augmented: true})
    },
    "POST /test-login": function(req, res, next) {
      userLogged = true; // XXX
      res.end("USER")
    }
  }))
}