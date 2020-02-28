import path from "path"
import childProcess from "child_process"
import Config from "../../config"
import Log from "../../log"

const exec = childProcess.exec

export default function (src) {
    let sassStyle = Config.sass_style || 'nested'

    let compassSrc = src.slice(0, -1 * path.extname(src).length) + ".css"

    let cmd = `npx node-sass ${src} ${compassSrc} --style nested --sourcemap=none --no-cache`

    exec(cmd, function(error, stdout, stderr) {
        if(error) {
            Log.print(`${src}自动编译失败：${stderr}`)
            return
        }
    })
}