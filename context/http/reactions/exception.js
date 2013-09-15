module.exports = function(err, req, res, next) {
  res.writeHead(err.code)
  res.end("Exception found: "+err.message)
}