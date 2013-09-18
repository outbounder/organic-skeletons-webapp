var switchByMethod = require("organic-alchemy").http.switchByMethod

module.exports = switchByMethod({
  "GET": function(req, res, next) {
    res.end("Blah")
  }
})