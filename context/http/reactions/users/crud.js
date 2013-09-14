var alchemy = require("../../../helpers/alchemy")
module.exports = alchemy.crud(require("mongoose").model("User", {}))