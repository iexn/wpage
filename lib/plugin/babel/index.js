import path from "path"
import childProcess from "child_process"
import Log from "../../log"

const exec = childProcess.exec

export default function (src) {
    let compassSrc = src.slice(0, -1 * path.extname(src).length) + ".js"
    let cmd = `npx babel ${src} --out-file ${compassSrc} --presets=es2015`

    exec(cmd, function(error, stdout, stderr) {
        if(error) {
            Log.print(`${src}自动编译失败：${stderr}`)
            return
        }
    })
}