const webSocketServer = require('ws').Server
const node_watch = require('node-watch')

const src = __dirname + "/../../../src/"

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

