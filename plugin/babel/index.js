const path = require("path")
const fs = require("fs")
const babel = require("@babel/core")
const Config = require("../../lib/config")
const Log = require("../../lib/log")

module.exports = function (src) {
    // let compassSrc = src.slice(0, -1 * path.extname(src).length) + ".js"
    // let cmd = `npx babel ${src} --out-file ${compassSrc} --presets=es2015`

    // babel.transformFile(src, {
    //     configFile: __dirname
    // }, function (error, result) {
    //     if (error) {
    //         Log.print(`${src}自动编译失败：\n${error}`)
    //         return
    //     }

    //     fs.writeFile(compassSrc, result.code, function (err) {
    //         if (err) {
    //             Log.print(`${src}自动编译成功但写入文件失败：\n${err}`)
    //         }
    //     })
    // })
}