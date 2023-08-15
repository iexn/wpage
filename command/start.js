const Log = require("../lib/log")
const Server = require("../lib/server")

module.exports = function (port) {
    Server.listen(port, function (port) {
        Log.remind(port)
    })
}