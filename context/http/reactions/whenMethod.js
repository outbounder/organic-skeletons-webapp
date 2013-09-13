var alchemy = require("../../helpers/alchemy")

module.exports = alchemy.whenMethod({
  "GET": function(req, res, next) {
    res.end("Blah")
  }
})