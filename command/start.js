import Log from "../lib/log"
import Server from "../lib/server"

export default function () {
    Server.listen(function (port) {
        Log.remind(port)
    })
}