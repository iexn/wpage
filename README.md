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

1. 在当前目录下启动服务：

   命令行内开启服务：`wpage start`

   代码内开启服务：`wpage.start()`

2. 开启服务根目录下创建配置文件`.wpagerc.json`：

   ```
   {
   	"ignore": [],
   	"sass_style": "",
   	"dir": "",
   	"sourceContentType": {}
   }
   ```

   - `ignore`

     如果不想让部分文件发生变化时浏览器刷新，可以在这里配置不刷新文件。遵循ignore文件配置规则，比如：

     ```
     "ignore": [
     	"node_modules/",
         ".git/",
         ".wpagerc.json"
     ]
     ```

     以上配置项已经添加到`wpage`的默认配置里了，我们无需在配置文件中添加他们。

   - `sass_style`

     这个配置项决定了`.scss`后缀文件编译后的代码格式，与sass的代码格式配置相同：

     ```
     nested
     expanded
     compact
     compressed
     ```

     默认值是`nested`。

   - `dir`

     这个配置项允许我们对任意目录开启服务，而不是在当前目录。

   - `sourceContentType`

     由于系统的原因，在开发过程中需要设置不同格式文件的`Content-Type`。`wpage`已经对大多数格式做了处理，如果设置的不对或者使用其他格式的文件时，需要在`sourceContentType`中添加对应格式的`Content-Type`，例如：

     ```
     "sourceContentType": {
     	".svg": "image/svg+xml"
     }
     ```

     当然上面的值也是默认配置，我们无需再次添加。

     

3. CLI：

> wpage start

开启wpage服务

> wpage init [project name]

创建一个文件夹，并自动添加`.wpagerc.json`规则文件

4. 机制（与1.x相比）：
   1. 系统对在浏览器中打开的html后缀的文件追加websocket代码，而其他后缀的文件没有。

   2. 增加了可排除刷新的文件设置 ignore。
   3. sass和babel后缀文件因为有扩展功能，所以他们的文件变化并不会通知给浏览器。
   4. 现在可以开启多个wpage服务了，端口号并不会提示占用。
   5. favicon.ico 文件不设置时在命令行中会有文件不存在的提示，现在已经排除了这个提示
   6. 系统提示信息已改为中文


---

2.0.4更新：

1. 修改`.svg`文件的默认`Content-type=image/svg+xml`

2.0.3更新：

1. 修复bug，增加模块内调用`wpage.start()`，等效于cli：`wpage start`

