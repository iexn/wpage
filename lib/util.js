import path from "path"
import os from "os";
import ignore from "ignore"
import Config from "./config"

const Util = function () {};
const _this = Util.prototype;

/**
 * 获取全部可访问ip数组和端口
 */
_this.getAllowIps = function (port = "") {
    let ips = ["localhost"];

    let interfaces = os.networkInterfaces();

    for (let i in interfaces) {
        interfaces[i].map(item => {
            if (item.family == "IPv4") {
                ips.push(item.address);
            }
        });
    }

    if (port != "") {
        ips = ips.map(ip => {
            return "http://" + ip + ":" + port;
        });
    }

    return ips;
}

/**
 * path是否在配置项排除文件中
 */
let ig = ignore().add(Config.ignore);
_this.ignores = function (src) {
    return ig.ignores(path.relative(__dirname, src))
}

export default new Util;