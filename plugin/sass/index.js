const path = require("path")
const fs = require("fs")
const sass = require("sass")
const Config = require("../../lib/config")
const Log = require("../../lib/log")

module.exports = function (src) {
    let outputStyle = Config.sass_style || 'compressed'

    let compassSrc = src.slice(0, -1 * path.extname(src).length) + ".css"

    sass.render({
        file: src,
        outFile: compassSrc,
        outputStyle: outputStyle
    }, function (error, result) {
        if (error) {
            Log.print(`${src}自动编译失败：${error}`)
            return
        }
        fs.writeFile(compassSrc, result.css, function (err) {
            if (err) {
                Log.print(`${src}自动编译成功但写入文件失败：${err}`)
            }
        })
    })
}