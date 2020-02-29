const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const ws = require("ws")
const nodeWatch = require("node-watch")
const Log = require("./log")
const Util = require("./util")
const Plugin = require("../plugin")
const Config = require("./config")

const webSocketServer = ws.Server

const Server = function () { }
const _this = Server.prototype

// 浏览器访问，开启时是否自动引用可用端口号
_this.autoPort = false

// 访问端口
_this.port = 8080

// websocket监听端口
_this.wsPort = 36500

_this.register = function (port, callee, loaded) {
    const listen = http.createServer(function (request, response) {
        callee(request, response)
    }).listen(port)

    listen.on("error", () => {
        _this.register(port + 1, callee, loaded)
    })

    listen.on("listening", () => {
        _this.watch(function () {
            loaded && loaded(port, ...arguments)
        })
    })
}


// 监听ws模块开启状态
_this.ST_webSocketServer

_this.watch = function (loaded) {
    var wss = new webSocketServer({
        port: _this.wsPort
    })

    _this.ST_webSocketServer = setTimeout(() => {
        if (wss._server._connectionKey) {
            clearTimeout(_this.ST_webSocketServer)
            _this.watchConnection(wss, loaded)
        }
    }, 500)

    wss.on("error", () => {
        clearTimeout(_this.ST_webSocketServer)
        _this.wsPort += 1
        _this.watch(loaded)
    })
}

_this.watchConnection = function (wss, loaded) {
    // 所有正在运行客户端
    const clients = []

    // 连接监听
    wss.on('connection', function (ws) {
        clients.push(ws)

        // 接收浏览器传来的参数
        ws.on('message', function (msg) {
            callback && callback.onmessage && callback.onmessage(msg, ws)
        })

        // 关闭连接监听
        ws.on('close', function () {
            clients.splice(clients.indexOf(ws), 1)
        })

    })

    nodeWatch(Config.dir, {
        recursive: true,
        filter: f => {
            return !Util.ignores(f)
        }
    }, function (evt, name) {
        // 开启扩展功能
        let plugin = _this.plugins(evt, name);

        // 使用扩展的文件不向浏览器通知
        if (plugin.mounted) {
            return
        }

        // 有变化之后向客户端发送刷新指令
        for (var client of clients) {
            if (client.readyState != 1) {
                clients.splice(clients.indexOf(client), 1)
                continue
            }
            client.send('reload')
        }

    })

    loaded()
}

_this.listen = function (port, loaded) {

    if (Object.prototype.toString.call(port) == "[object Function]") {
        loaded = port
        port = undefined
    }

    // 如果没有显性指定端口号，开启自动引用端口号
    if (port == undefined) {
        this.autoPort = true
    }

    _this.register(this.port, (request, response) => {

        // 解析地址
        let url_path = url.parse(request.url, true).path

        if (url_path == "" || url_path == "/") {
            url_path = "/index.html"
        }

        let name = Config.dir + url_path
        let ext = path.extname(name).slice(1)
        let host = request.headers.host

        if (url_path == "/favicon.ico") {
            fs.readFile(name, "utf-8", function (err, file) {
                if (err) {
                    response.end()
                    return
                }
                response.write(file, "utf-8")
                response.end()
            })
            return;
        }

        fs.readFile(name, "utf-8", function (err, file) {
            if (err) {
                Log.print('文件不存在：' + name)
                response.end()
                return
            }

            let wsHost = host.replace(/:\d+$/, ":" + _this.wsPort)

            if (ext == "html") {
                file =
                    `<script>var ws = new WebSocket("ws://${wsHost}");ws.onopen = function (e) {console.log("websocket页面监听已开启")};ws.onmessage = function (res) {if (res.data === "reload") {location.reload();}};window.onbeforeunload = function () {ws && ws.close();};</script>`
                    + file
            }

            response.write(file, "utf-8")
            response.end()
        })

    }, loaded)

}

/**
 * 扩展功能
 */
_this.plugins = function (evt, src) {
    return Plugin.exec(src);
}

module.exports = new Server