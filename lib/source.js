const fs = require("fs")

const src = __dirname + "/../../../src/"

/**
 * 
 * @param {*string} name html页面路径，必须在src目录下
 * @param {*function} callback 写入前文件处理
 */
function load(name, request, response, callback = null, contentType = 'text/html', encode = 'utf-8') {
  response.writeHead(200, { "content-type": contentType })
  fs.readFile(name, encode, function (err, file) {
    if (err) {
      console.log('文件不存在：' + name)
      file = '';
    }
    if (callback) {
      var cb = callback(err, file)
      file = cb == undefined ? file : cb
    }
    response.write(file, encode)
    response.end()
  })
}

function loadSource(name, request, response, contentType) {
  name = src + name
  load(name, request, response, function (err, file) {
    if (err) {
      response.write('source path:' + name + ' load error')
      return
    }
    return file
  }, contentType, "binary")
}

function loadHtml(name, request, response, callback = null) {
  name = src + name
  load(name, request, response, function (err, file) {
    if (callback) {
      file = callback(file)
    }
    return file
  })
}

module.exports = {
  load: function (name, request, response, callback = null) {
    loadHtml(name, request, response, callback)
  },
  source: function (name, request, response, contentType) {
    loadSource(name, request, response, contentType)
  }
}
