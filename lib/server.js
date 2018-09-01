const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const source = require('./source')
const watch = require('./watch')
const config = require('../../../wpage.json')

module.exports = {
  start: function (port = 8080) {
    const wsPort = 3365

    // 访问网页的地址应与调试功能websocket监听地址一致
    var localhost = "localhost"

    // 创建本地服务器
    http.createServer(function (request, response) {

      localhost = request.headers.host || localhost

      // 如果地址上存在端口号，截掉
      if(localhost.indexOf(':') > 0) {
        localhost = localhost.split(':')[0]
      }
    
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
      
      // 默认显示文件
      var default_html = config.default || 'index.html'

      // 后缀名在此数组中，显示为页面
      var route_ext = config.ext || []
    
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
        
      if(pathname == '') {
        pathname = '/' + default_html
        pathext = pathname.split('.')[1] || 'html'
        pathext = '.' + pathext
      }
      console.log('pathname: ', pathname)
      console.log('pathext: ', pathext)

      // 未匹配中页面，跳转到其他页面上
      if (route_ext.indexOf(pathext) == -1) {
        source.load('404.html', request, response)
        return
      }
    console.log(pathname);
      // 加载页面
      source.load(pathname, request, response, function (file) {
        var shtml = '\
<script>var ws = new WebSocket("ws://' + localhost + ':' + wsPort + '");\
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
    
    console.log("server created!")
    console.log("please open " + localhost + ":" + port + " in browser\n")
  }
}
