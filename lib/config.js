import _ from "lodash"

let custom = require(__dirname + "/.wpagerc.json")

const config = Object.assign({
    ignore: [],
    // nested|expanded|compact|compressed
    sass_style: "nested"
}, custom)

config.ignore = _.uniq(_.concat([
    "node_modules/",
    ".git/",
    ".wpagerc.json"
], config.ignore)),

module.exports = config