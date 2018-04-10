const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const source = require('./source')
const watch = require('./watch')
const config = require('../../../wpage.json')

module.exports = {
  start: function (port) {
    const wsPort = 3365

    port = port || 8080

    // 创建本地服务器
    http.createServer(function (request, response) {
    
      // 解析地址
      var uo = url.parse(request.url, true)
    
      // 文件路径
      var pathname = uo.pathname
    
      // 获取get参数对象
      var query = uo.query
    
      // 后缀名
      var pathext = path.extname(pathname)
    
      // 后缀匹配库
      var ext = config.source_ext
    
      // 路由匹配库
      var routeurl = config.url
    
      // 强制指定为资源：加参数 type=assets
      if (query.type == 'assets') {
        source.source(pathname, request, response)
        return
      }
    
      // 其他形式加载资源
      if (typeof ext[pathext] == 'string') {
        source.source(pathname, request, response, ext[pathext])
        return
      }
    
      // 未匹配中页面，跳转到其他页面上
      if (typeof routeurl[pathname] != 'string') {
        source.load('404.html', request, response)
        return
      }
    
      // 加载页面
      source.load(routeurl[pathname], request, response, function (file) {
        var shtml = '\
<script>var ws = new WebSocket("ws://localhost:' + wsPort + '");\
  ws.onopen = function (e) {\
    console.log("websocket页面监听已开启")\
  };\
  ws.onmessage = function (res) {\
    if (res.data === "reload") {\
      location.reload();\
    }\
  };\
  window.onbeforeunload = function () {\
    ws && ws.close();\
  };\
</script>' + "\n"
        return shtml + file
      });
    
    }).listen(port)
    
    // 开启页面监听
    watch.start(wsPort)
    
    console.log('server created...')
  }
}
