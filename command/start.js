const Log = require("../lib/log")
const Server = require("../lib/server")

module.exports = function () {
    Server.listen(function (port) {
        Log.remind(port)
    })
}