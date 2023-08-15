const fs = require("fs")
var source = require("./config/source.json");

const dir = process.cwd()

let custom = {}
if (fs.existsSync(dir + "/.wpagerc.json")) {
    custom = require(dir + "/.wpagerc.json")
}

const config = Object.assign({
    ignore: [],
    // 'expanded' | 'compressed'
    sass_style: "compressed",
    dir: dir,
    sourceContentType: source
}, custom)

config.ignore.push(...[
    "node_modules/",
    ".git/",
    ".wpagerc.json"
])

if (custom.hasOwnProperty("sourceContentType")) {
    config.sourceContentType = Object.assign(source, custom.sourceContentType)
} else {
    config.sourceContentType = source
}

module.exports = config