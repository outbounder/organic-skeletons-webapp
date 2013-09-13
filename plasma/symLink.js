var Organel = require("organic").Organel;
var fs = require('fs');
var path = require("path");
var _ = require("underscore");

module.exports = Organel.extend(function Required(plasma, config){
  Organel.call(this, plasma);

  if(config.target)
    for(var key in config.target) {
      for(var dirName in config.target[key])
        config.target[key][dirName] = path.join(process.cwd(),config.target[key][dirName]);
    }
  
  this.config = config;

  for(var key in config.target) {
    for(var dirName in config.target[key]) {
      var dest = path.join(process.cwd(),key,dirName);
      if(fs.existsSync(dest))
        fs.unlinkSync(dest);
      fs.symlinkSync(config.target[key][dirName], dest);
    }
  }
})
