这是一个能让你开发静态页面时，搭建本地服务器和及时刷新浏览器预览功能的包

安装：
```
npm install -g wpage-cli
```

使用方法：

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






------
### 更新日志：

#### 1.2.1更新
* 取消强制在wpage.json中定义url的访问机制，改为设置页面后缀名去访问
+ 监听文件不存在导致的页面必须刷新后才能使用。页面不存在依然继续监听
* wpage.json中增加了 `ext` 与 `default` 参数，具体如下：
```
  // 设置此项后，所有后缀名在这里出现的访问内容均视为页面。数组形式添加，默认为.html
  "ext": [".html"],
  // 默认访问地址，默认为index.html。注意：不要填写前面的 /
  "default": "index.html",
```

#### 1.1.13更新
* 更新文档等帮助内容

#### 1.1.11更新
* 修复在非本机设备访问项目时造成保存文件不能及时刷新网页的bug

#### 1.1.10更新
* 修复git创建在src目录中时，对项目的重新加载bug

#### 1.1.9更新
+ 支持babel文件自动编译，.babel文件会在相同目录下自动编译为.js文件

#### 1.1.2更新
+ 支持sass文件自动编译，.sass或.scss文件会在相同目录下自动编译为.css文件（在已安装sass的前提下）
`wpage.json`中配置编译css文件类型：
```
"sass_style": "compact"
```
支持四个属性值：
> `nested` 嵌套输出方式
> `expanded` 展开输出方式
> `compact` 紧凑输出方式
> `compressed` 压缩输出方式

