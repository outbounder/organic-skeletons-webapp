var invoke = module.exports.invoke = function(reaction, input, next) {
  if(!reaction) return
  if(reaction.length == 1)
    return next(reaction(input))
  if(reaction.length == 2)
    return reaction(input, next)
  if(reaction.length == 3)
    return reaction(input.req, input.res, next)
  if(reaction.length == 4)
    return reaction(input.err, input.req, input.res, next)
}

var transform = module.exports.transform = function(input, trasnformators){
  if(!trasnformators) return input

}

var chain = module.exports.chain = function(reactionsArray) {
  return function(c, nextChain) {
    var index = -1;
    var next = function(err){
      if(err) return nextChain(err)
      index += 1
      if(index < reactionsArray.length) {
        invoke(reactionsArray[index], c, next)
      } else {
        nextChain()
      }
    }
    next()
  }
}

module.exports.whenMethod = function(definitions) {
  return function(c, next) {
    invoke(definitions[c.req.method], c, next)
  }
}

// *
// supports arguments in form reaction(chemical, reactionsArray, reactionsArray... , backupReactionsArray)
// where reactionsArrays are concatinated forming a single chain of reactions
module.exports.reaction = function(){
  var args = [];
  for(var i = 0; i<arguments.length; i++)
    args.push(arguments[i])
  var chemical = args.shift()
  var backupChain = args.pop()
  var chain = []
  for(var i = 0; i<args.length; i++)
    chain = chain.concat(args[i])
  var next = function(err){
    if(err) return invoke(backupChain.shift(), err)
    invoke(chain.shift(), chemical, next)
  }
  next()
}

module.exports.fromActions = function(actions, transformers) {
  var methods = {};
  for(var actionName in actions) {
    var parts = actionName.split(" ")
    var methodName = parts.shift()
    var actionUrl = parts.shift()
    var action = actions[actionName]
    action.url = actionUrl
    methods[methodName] = action
  }
  return function(c, next) {
    var reaction = transform(methods[c.req.method], transformers)
    if(!reaction.url || c.req.url.indexOf(reaction.url) !== -1){
      if(reaction.length == 2)
        reaction(c.req, c.res)
      if(reaction.length == 3)
        reaction(c.req, c.res, next)
    }
  }
}

module.exports.improve = function(reaction, improver) {
  return chain([improver, reaction])
}