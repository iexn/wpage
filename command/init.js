import fs from "fs"
import path from "path"
import Log from "../lib/log"

let copyFile = function (srcPath, tarPath, cb) {
    let rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    let ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}

let copyFolder = function (srcDir, tarDir, cb) {
    fs.readdir(srcDir, function (err, files) {
        let count = 0
        let checkEnd = function () {
            ++count == files.length && cb && cb()
        }

        if (err) {
            checkEnd()
            return
        }

        files.forEach(function (file) {
            let srcPath = path.join(srcDir, file)
            let tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}


module.exports = function (copy_path) {
    try {
        fs.mkdirSync(copy_path)
    } catch (e) {
        Log.print(`文件夹${copy_path}已存在`)
        return false
    }
    Log.print(`wpage正在运行中...`)
    copyFolder("../example/", copy_path, function (err) {
        if (err) {
            throw err
        }
        Log.print('所有文件已创建成功！')
    })
}
