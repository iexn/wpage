这是一个能让你开发静态页面时，搭建本地服务器和及时刷新浏览器预览功能的包

安装：
```
npm install wpage
```

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



---

`wpage.js` 中主要包含内容如下：

```
{
  // 路由跳转规则定义，必须在这里设置跳转位置
  "url": {
    "/": "index.html" // 路由规则：跳转位置
  },
  
  // 资源文件后缀名
  "source_ext": { 
    ".js": "application/ecmascript" // 后缀名：资源识别content-type
  }
}
```

