const fs = require("fs")

const dir = process.cwd()

let custom = {}
if (fs.existsSync(dir + "/.wpagerc.json")) {
    custom = require(dir + "/.wpagerc.json")
}

const config = Object.assign({
    ignore: [],
    // nested|expanded|compact|compressed
    sass_style: "nested"
}, custom)

config.ignore = config.ignore.push(...[
    "node_modules/",
    ".git/",
    ".wpagerc.json"
])

config.dir = dir

module.exports = config