var mongoose = require("mongoose") 
var chain = require("organic-alchemy").http.chain
var error = require("organic-alchemy").http.error
var fromActions = require("organic-reactions-rest").fromActions
var crud = require("organic-reactions-mongoose-crud").crud

var acceptOnlyLoggedUsers = function(c, next) {
  if(!c.req.user) return next(error("Sorry", 401))
  next()
}

module.exports.init = function(plasma, config, url){
  return chain( 
    acceptOnlyLoggedUsers, 
    crud(url, require("context/models/User") ),
    fromActions(url, {
      "GET /:id/:slug": function(req, res, next){
        res.end(req.params.id+req.params.slug)
        next()
      }
    }) 
  )
}