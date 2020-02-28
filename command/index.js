import Commander from "commander";
import start from "./start";
import init from "./init";

Commander.version("v" + require("../package.json").version)
    //   .description("create wpage project")
    //   .arguments("<project_name>")
    //   .description("create wpage project")
    .action(function () {
        let args_length = arguments.length;
        let Circular = arguments[args_length - 1];
        let args = Circular.args.slice(0, -1);
        let [name, value] = args;

        if (name == undefined) {
            name = "start";
        }
        if (name == undefined && value == undefined) {
            name = "init";
        }
        switch (name) {
            case "start":
                start();
                break;
            case "init":
                init(value);
                break;
            default:
                console.log(`该命令无法执行。\n您可能想要通过wpage-cli创建一个wpage运行环境，这个功能已在wpage2.0.0以上的版本中实现\n请移除wpage-cli并将wpage更新倒最新版本使用新功能。\n继续执行该操作请输入：wpage init ${name}\n`);
        }
    })
Commander.parse(process.argv)

if (Commander.args.length === 0) {
    Commander.help()
}