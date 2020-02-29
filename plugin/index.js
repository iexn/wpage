const path = require("path")
const sass = require("./sass")
const babel = require("./babel")

module.exports = {
    exec: function (src) {
        let ext = path.extname(src).slice(1)
        let plugin = {
            mounted: false,
            path: src
        }
        // 监听扩展
        switch(ext) {
            // sass自动处理
            case 'sass':
            case 'scss':
                plugin.mounted = true
                sass(src);
                break
            // babel自动处理
            case 'babel':
                plugin.mounted = true
                babel(src)
                break
        }

        return plugin
    }
}