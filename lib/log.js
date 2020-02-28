import Util from "./util";

const Log = function () {};
const _this = Log.prototype;

_this.remind = function (port = "") {
    console.log(`服务启动成功！\n可以在浏览器中打开以下链接：`, "\n");
    let ips = Util.getAllowIps(port);
    console.log(ips.join("\n"), "\n");
    console.log("wpage服务运行中...\n输入 Ctrl + C 停止wpage服务", "\n");
};

_this.print = function () {
    console.log(new Date, ...arguments);
}

export default new Log;