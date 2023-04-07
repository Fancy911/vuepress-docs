---
title: 静态资源与动态资源
date: 2023/04/07
categories:
 - 计算机网络
tags:
 - 静态资源
 - 网络
---

## 静态资源

- 静态资源是指 <strong style="color:red">内容长时间不发生改变的资源</strong> ，例如**图片，视频，CSS 文件，JS文件，HTML文件，字体文件**等
- 动态资源是指 <strong style="color:red">内容经常更新的资源</strong> ，例如**百度首页，网易首页，京东搜索列表页面**等

### 网站根目录（静态资源目录）

HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 <strong style="color:red">静态资源目录</strong>  ，也称之为 <strong style="color:red">网站根目录</strong>

::: tip
思考: vscode 中使用 live-server 访问 HTML 时， 它启动的服务中网站根目录是谁?
 
答案: 是启动当前服务文件所在的文件夹
:::

### 网页中的URL

网页中的 URL 主要分为两大类: 相对路径与绝对路径

#### 绝对路径

绝对路径是指 <strong style="color:red">从根目录开始的路径</strong> ，例如: `http://localhost:8080/index.html`

绝对路径可靠性强，而且相对容易理解，在项目中运用较多。

| 形式 | 特点 |
| :--- | :--- |
| `http://www.atguigu.com/web` | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式 |
| `//atguigu.com/web` | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| `/web` | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小 型网站 |


#### 相对路径

相对路径是指 <strong style="color:red">相对于当前文件的路径</strong> ，例如: `./index.html`

相对路径在发送请求时，需要与当前页面 `URL` 路径进行  <strong style="color:red">计算</strong> ，得到完整 `URL` 后，再发送请求，学习阶
段用的较多.

例如当前网页`url`为`http://www.baidu.com/course/h5.html`

| 形式 | 计算结果 | 备注 |
| :--- | :--- | :--- |
| `./css/app.css` | `http://www.baidu.com/course/css/app.css` | 
| `js/app.js` | `http://www.baidu.com/js/app.js` |
| `../img/logo.png` | `http://www.baidu.com/img/logo.png` |
| `../../mp4/show.mp4` | `http://www.baidu.com/mp4/show.mp4` | 已经到了根目录了，再往上就不行了，所以哪怕路径写的是又上一层，还是只到顶层 |

#### 网页中使用URL的场景

包括但不限于如下场景:
1. a 标签 href 
2. link 标签 href 
3. script 标签 src 
4. img 标签 src
5. video audio 标签 src 
6. form 中的 action 
7. AJAX 请求中的 URL

### 设置资源类型(mime类型)

媒体类型(通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 )是一种标准，用来表示文档、文件或字节流的性质和格式。

```bash
mime 类型结构: [type]/[subType]
例如: text/html text/css image/jpeg image/png application/json
```

HTTP 服务可以设置响应头 `Content-Type` 来表明响应体的 `MIME` 类型，浏览器会根据该类型决定如何处理资源

下面是常见文件对应的 `mime` 类型

```bash
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```

::: tip
对于未知的资源类型，可以选择 `application/octet-stream` 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的**下载**效果
:::


## 搭建静态资源服务器

什么是静态资源服务器呢？就是一个专门用来提供静态资源的服务器，比如我们在网页中引入的图片，视频，CSS 文件，JS文件，HTML文件，字体文件等等，这些资源都是静态资源，我们可以通过一个静态资源服务器来提供这些资源，这样就不用每次都去请求这些资源了，直接从静态资源服务器上获取就可以了。

### 需求描述

* 创建一个 HTTP 服务，端口为 9000，满足如下需求
* GET  /index.html        响应  page/index.html 的文件内容
* GET  /css/app.css       响应  page/css/app.css 的文件内容
* GET  /images/logo.png   响应  page/images/logo.png 的文件内容

### 服务器目录结构

```bash
├── server.js
└── page
     ├── css
     │    └── app.css
     ├── images
     │    └── logo.png
     └── index.html
```

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

// 声明一个变量，存储mime类型
let mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}

// 创建服务对象
const server = http.createServer((request, response) => {
    // 判断请求方式，如果不是 GET 请求，直接返回 405
    if (request.method !== 'GET') {
        response.statusCode = 405;
        response.end('<h1>405 Method Not Allowed</h1>');
        return;
    }

    // 获取请求url的路径
    let { pathname } = new URL(request.url, 'http://127.0.0.1:9000');

    //声明一个变量，存储网站根目录，也叫静态资源目录
    let root = __dirname + '/page'; 

    //拼接文件路径
    let filePath = root + pathname;

    //读取文件 fs 异步 API
    fs.readFile(filePath, (err, data) => {
        // 错误处理
        if (err) {
            // console.log(err); // 打印错误信息，是一个对象，包含错误的编码和错误信息
            /**
             * 设置字符集，防止中文乱码
             *  * 设置字符集有两种方式
             *  * 1. 设置响应头
             *  * 2. html文件中的meta标签 <meta charset="utf-8">
             */
            response.setHeader('content-type','text/html;charset=utf-8');

            // 判断错误的编码，返回对应的错误信息
            switch(err.code){
                // ENOENT 代表文件不存在
                case 'ENOENT':
                    response.statusCode = 404;
                    response.end('<h1>404 Not Found</h1>');
                // EPERM 代表没有操作权限，不允许访问
                case 'EPERM':
                    response.statusCode = 403;
                    response.end('<h1>403 Forbidden</h1>');
                // 其他错误
                default:
                    response.statusCode = 500;
                    response.end('<h1>Internal Server Error</h1>');
            }
            return;
        }

        //获取文件的后缀名
        let ext = path.extname(filePath).slice(1);
        //获取对应的类型
        let type = mimes[ext];

        // 如果匹配到了mime里有的后缀名
        if (type) {
            // 如果是html文件，设置字符集 utf-8
            if (ext === 'html') {
                // 因为除了html文件，其他的文件（css、js）都是按照网页的字符集来解析的，所以无需再次设置字符集
                response.setHeader('content-type', type + ';charset=utf-8'); // text/html;charset=utf-8
            } 
            else {
                // 如果匹配到了，但是不是html
                response.setHeader('content-type', type);
            }
        } 
        else {
            // 没有匹配到，给一个默认的类型，application/octet-stream 表示二进制流
            response.setHeader('content-type', 'application/octet-stream');
        }
        //响应文件内容
        response.end(data);
    })
});

//监听端口, 启动服务
server.listen(9000, () => {
  console.log('服务已经启动....')
});
```