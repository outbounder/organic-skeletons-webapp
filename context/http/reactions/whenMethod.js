var alchemy = require("organic-alchemy")

module.exports = alchemy.whenMethod({
  "GET": function(req, res, next) {
    res.end("Blah")
  }
})