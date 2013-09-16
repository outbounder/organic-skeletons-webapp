var mongoose = require("mongoose") 
var alchemy = require("organic-alchemy")
var rest = require("organic-reactions-restactions")
var mongoose_reactions = require("organic-reactions-mongoose-crud")

module.exports.init = function(plasma, config, url){
  return alchemy.chain(
    rest.fromActions(url, {
      "GET /list": function(req, res, next) {
        if(!req.user || !req.user.role == "admin") 
          return next(alchemy.error("not authorized", 401))
        next()
      },
      "GET /:id": function(req, res, next) {
        res.end(req.params.id)
      },
      "GET /:id/:slug": function(req, res, next) {
        res.end(req.params.id+req.params.slug)  
      }
    }),
    mongoose_reactions.crud( url,
      mongoose.model("User", {
        email: String,
        password: String
      })),
    function(c, next) {
      console.log("this is just console log for reactions on users/crud path =>", c.req.url, c.res.result);
    }
  )
}