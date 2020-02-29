const Commander = require("commander")
const start = require("./start")
const init = require("./init")

const program = new Commander.Command()

program
    .description("感谢使用wpage！")
    .version("v" + require("../package.json").version)

program
    .command("init <directory>")
    .action(directory => {
        init(directory)
    })

program
    .command("start")
    .action(() => {
        start()
    })

program
    .on("command:*", function (cmd, args) {
        let name = cmd[0]
        console.log(`错误：命令执行失败\n您可以执行 wpage --help 或 wpage -h 来查看所有支持的命令\n`)
        console.log(`该命令无法执行。\n您可能想要通过wpage-cli创建一个wpage运行环境，这个功能已在wpage2.0.0以上的版本中实现\n请移除wpage-cli并将wpage更新倒最新版本使用新功能。\n继续执行该操作请输入：wpage init ${name}\n`)
    })

program.parse(process.argv)
