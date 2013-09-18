module.exports = function(err, req, res, next) {
  res.writeHead(err.code || 500)
  res.end("Exception found: "+err.message)
}