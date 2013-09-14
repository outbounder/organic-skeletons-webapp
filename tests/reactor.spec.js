var request = require("request");

describe("reactor test", function(){
  var Cell = require("organic").Cell;

  it("boots up", function(next){
    instance = new Cell({
      "plasma": {
        "HttpServer": {
          "source": "plasma/httpServer",
          "port": 1337,
          "ip": "127.0.0.1",
          "emit": {
            "request": "HttpRequest",
            "ready": "HttpServer"
          }
        },
        "HttpReactor": {
          "source": "plasma/httpReactor",
          "capture": {
            "type": "HttpRequest"
          },
          "reactions": {
            "root": "context/http/reactions",
            "extname": ".js",
            "indexname": "index"
          },
          "endReactions": ["context/http/reactions/notfound"]
        }
      }
    })
    instance.on("HttpServer", function(c){
      expect(c.server).toBeDefined();
      require("mongoose").connect("localhost", "test-db")
      next() 
    });
    instance.plasma.emit({type: "build", "branch": "plasma"});
  })

  it("fires http request which has to be handled by default action", function(next){
    request.post({
        uri:"http://127.0.0.1:1337/",
        json: {
          "test": "data"
        }
      }, function(err, res, body){
      expect(body).toContain("Hello");
      next()
    })
  })

  it("fires http request which has to be handled by notfound reaction", function(next){
    request.post({
        uri:"http://127.0.0.1:1337/asdasd",
        json: {
          "test": "data"
        }
      }, function(err, res, body){
      expect(body).toContain("Not found");
      next()
    })
  })

  it("fires http request which has to be handled by old-style-action reaction", function(next){
    request.post({
        uri:"http://127.0.0.1:1337/users/test-login",
        json: {
          "username": "data",
          "password": "test"
        }
      }, function(err, res, body){
      expect(body).toContain("USER");
      next()
    })
  })

  it("fires http request which has to be handled by old-style-action with result", function(next){
    request.get({
        uri:"http://127.0.0.1:1337/users/result",
        json: {}
      }, function(err, res, body){
      expect(body).toContain("augmented");
      next()
    })
  })

  it("fires http request which has to be handled by whenMethod reaction", function(next){
    request.get({
        uri:"http://127.0.0.1:1337/whenMethod",
        json: {}
      }, function(err, res, body){
      expect(body).toContain("Blah");
      next()
    })
  })

  it("fires http request which has to be handled by crud reaction", function(next){
    request.get({
        uri:"http://127.0.0.1:1337/users/crud/list",
        json: {}
      }, function(err, res, body){
      expect(body.length).toBe(0)
      next()
    })
  })

  it("closes", function(){
    instance.emit("kill")
    require("mongoose").disconnect()
  })
})