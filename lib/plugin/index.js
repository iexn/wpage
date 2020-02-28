import path from "path"
import sass from "./sass"
import babel from "./babel"
import Util from "../util"

export default {
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