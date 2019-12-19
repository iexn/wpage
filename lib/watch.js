const cwd = process.cwd()
const webSocketServer = require('ws').Server
const node_watch = require('node-watch')
const path = require('path')
const exec = require('child_process').exec
const config = require(cwd + '/wpage.json')

const src = cwd + "/" + (config.listenPath || "src") + "/"

module.exports = {
  start: function (port, watchSrc = src, callback = null) {
    // 启动websocket服务通信
    var wss = new webSocketServer({
      port: port
    });

    // 所有正在运行客户端
    var clients = [];

    // 连接监听
    wss.on('connection', function (ws) {
      clients.push(ws);

      // 接收浏览器传来的参数
      ws.on('message', function (msg) {
        callback && callback.onmessage && callback.onmessage(msg, ws);
      });

      // 关闭连接监听
      ws.on('close', function () {
        clients.splice(clients.indexOf(ws), 1);
      });

    });

    // 监听src目录变化
    node_watch(watchSrc, { recursive: true }, function (evt, name) {

      var etc = path.extname(name)
      var dir = path.dirname(name)
      var bsn = path.basename(name, etc)

      // 排除 .git 文件夹重新加载问题
      if(watchSrc + '/.git' == dir) {
        return false
      }

      // 监听扩展
      switch(etc) {
        // sass自动处理
        case '.sass':
        case '.scss':
        var sassStyle = config.sass_style || 'nested' // nested|expanded|compact|compressed
          var cmd = 'sass ' + name + ' ' + dir + '/' + bsn + '.css --style ' + sassStyle
          exec(cmd, function(error, stdout, stderr) {
            if(error) {
              console.log(cmd + ' 命令出错')
              return 
            }
          })
          return
        break
        // babel自动处理
        case '.babel':
          var cmd = 'npx babel ' + name + ' --out-file ' + dir + '/' + bsn + '.js'
          exec(cmd, function(error, stdout, stderr) {
            if(error) {
              console.log(cmd + ' 命令出错')
              return 
            }
          })
          return
        break
      }

      // console.log(evt, name);
      // 有变化之后向客户端发送刷新指令
      for (var client of clients) {
        if (client.readyState != 1) {
          clients.splice(clients.indexOf(client), 1);
          continue;
        }
        client.send('reload');
      }
    });

  }
}

