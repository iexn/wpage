这是一个能让你开发静态页面时，搭建本地服务器和及时刷新浏览器预览功能的包

安装：
> npm install wpage


#### 1.1.2更新
+ 支持sass文件自动编译（在已安装sass的前提下）
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


使用：
cd到指定目录下执行命令

> // 创建项目，假设project为新建的项目名称
> wpage project
> 
> // 进入项目
> cd project
>
> // 安装依赖
> npm install 
>
> // 开启本地服务器
> npm start


---


进入项目文件内容如下：

| 文件 | 说明 |
| - | - |
| src | 项目开发目录 | 
| package.json | 如有必要更新其他依赖包 |
| server.js | wpage服务入口 |
| wpage.json | wpage路由定义文件 |


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

