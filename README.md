> 注意：1.x版本与当前版本用法不同。如需使用1.x版本，请前往历史发布版本进行查看，或直接执行 `npm install -g wpage-cli`

这是一个能让你开发静态页面时，搭建本地服务器和及时刷新浏览器预览功能的包

安装：
```
npm install -g wpage
```

功能：

1. 开启一个本地服务器

2. 对文件进行监听，如有变动刷新浏览器

3. scss和babel后缀的文件会生成编译后的同名不同后缀的新文件

使用方法：

1. 切换到需要使用wpage的目录，执行`wpage start`即可开启wpage服务。

2. 如果需要对不想向浏览器发送刷新通知的文件进行排除，可以在顶级目录下创建文件`.wpagerc.json`：

```
{
    "ignore": []
}
```

排除规则参考 npm ignore 包进行设置。

如：

```
{
    "ignore": [
        "demo.js"
    ]
}
```

会排除掉demo.js文件。

> 注意：系统默认强制添加了 `node_modules/` `.git/` `.wpagerc.json`三项排除规则，项目中可不必填写

3. .wpagerc.json 文件中可设置sass的编译方式：

```
// 支持四个属性值：
// `nested` 嵌套输出方式
// `expanded` 展开输出方式
// `compact` 紧凑输出方式
// `compressed` 压缩输出方式

"sass_style": "nested"
```

4. CLI：

> wpage start

开启wpage服务

> wpage init [project name]

创建一个文件夹，并自动添加`.wpagerc.json`规则文件

5. 机制（与1.x相比）：

    1. 系统对在浏览器中打开的html后缀的文件追加websocket代码，而其他后缀的文件没有。

    2. 增加了可排除刷新的文件设置 ignore。

    3. sass和babel后缀文件因为有扩展功能，所以他们的文件变化并不会通知给浏览器。

    4. 现在可以开启多个wpage服务了，端口号并不会提示占用。

    5. favicon.ico 文件不设置时在命令行中会有文件不存在的提示，现在已经排除了这个提示

    6. 系统提示信息已改为中文


1. 打开命令行工具，cd到任意文件夹下，执行以下命令：
```
wpage project

cd project

npm install

npm start
```

2. 打开浏览器，默认为 `localhost:8080` 就可以查看html了，文件有[保存|添加|删除]动作时浏览器自动刷新

3. babel文件会在它定义的目录下自动创建一个同名的js文件，并且经过babel编译。

4. scss文件也会在同目录下自动创建一个css文件，并且经过sass编译

5. html文件需在同一级放置。默认文件问index.html，如果想添加比如demo.html，必须向wpage.jspn中url参数添加对应路径和文件

---

`wpage.json` 中主要包含内容如下：

```
{
  // 设置此项后，所有后缀名在这里出现的访问内容均视为页面。数组形式添加，默认为.html
  "ext": [".html"],
  // 默认访问地址，默认为index.html。注意：不要填写前面的 /
  "default": "index.html",
  // 资源文件后缀名，一般情况下不需要改动
  "source_ext": {
    ".js": "application/ecmascript" // 后缀名：资源识别content-type
  }
}
```
