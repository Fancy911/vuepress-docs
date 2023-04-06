---
title: 获取HTTP请求报文
date: 2023/04/06
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

想要获取请求的数据，需要通过 request 对象来获取

| 含义 | 语法 | 重点掌握 |
| :--- | :--- | :--- |
| 获取请求方法 | `request.method` | * |
| 获取请求版本 | `request.httpVersion` |  |
| 获取请求路径 | `request.url` | * |
| 获取 URL 路径 | `require('url').parse(request.url).pathname` | * |
| 获取 URL 查询字符串 | `require('url').parse(request.url, true).query` | * |
| 获取请求头 | `request.headers` | * |
| 获取请求体 | `request.on('data', function(chunk){})`  `request.on('end', function(){}); ` |  |

## 获取请求行和请求头

```js
// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象 create 创建 server 服务
const server = http.createServer((request, response) => {
    // 获取请求方法
    console.log(request.method); // GET

    // 获取请求的url
    console.log(request.url); // /?name=zs&age=18，这里获取到的url，只有路径和查询字符串。并不包含协议、域名、端口号

    // 获取 http 版本号 
    console.log(request.httpVersion); // 1.1， 几乎用不到

    // 获取请求头
    console.log(request.headers); // 会打印出一个对象，里面包含了所有的请求头信息
    console.log(request.headers.host); // 会打印出请求头中的 host 字段的值，也就是域名和端口号
  
    response.end('Hello HTTP server');
});

// 3. 监听端口, 启动服务 
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中...'); 
});
```

::: tip
1. `request.url`只能获取路径以及查询字符串，无法获取`URL`中的域名以及协议的内容
2. `request.headers`将请求信息转化成一个对象，并将属性名都转化成了『小写』
3. 关于路径: 如果访问网站的时候，只填写了IP地址或者是域名信息，此时请求的路径为『/』 
4. 关于`favicon.ico`:这个请求是属于浏览器自动发送的请求
:::

## 获取请求体

```js
// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象 create 创建 server 服务
const server = http.createServer((request, response) => {
    // 1. 定义一个变量，用来存储请求体的数据
    let body = '';

    // 2. 监听 data 事件，用来接收请求体的数据
    request.on('data', function(chunk){
        body += chunk;
    });

    // 3. 监听 end 事件，用来处理请求体的数据
    request.on('end', function(){
        console.log(body); // name=zs&age=18，一般是post（比如表单提交）这种请求，才会有请求体
        response.end('Hello HTTP server');
    });
});
```

## 获取路径和查询字符串

```js
// 1. 导入 http 模块
const http = require('http');
// 2. 导入 url 模块
const url = require('url');

// 3. 创建服务对象 create 创建 server 服务
const server = http.createServer((request, response) => {
    // 解析 request.url 请求路径
    let urlObj = url.parse(request.url, true); // 传 true 表示将查询字符串转化成对象
    console.log(urlObj); 
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?name=zs&age=18',
    //     query: [Object: null prototype] { name: 'zs', age: '18' },
    //     pathname: '/',
    //     path: '/?name=zs&age=18',
    //     href: '/?name=zs&age=18'
    //   }

    // 获取路径
    console.log(urlObj.pathname); // /search

    // 获取查询字符串
    console.log(urlObj.query); // { name: 'zs', age: '18' }
    console.log(urlObj.query.name); // zs

    response.end('Hello HTTP server');
});

// 4. 监听端口, 启动服务
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中...');
});
```

## 获取路径和查询字符串的新方法

```js
// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象 create 创建 server 服务
const server = http.createServer((request, response) => {
    // 实例化 URL 对象
    // let urlObj = new URL('http://localhost:9000/search?name=zs&age=18'); // 传一个参数的方式：传入一个完整的 URL 地址
    let urlObj = new URL(request.url, 'http://localhost:9000'); // 传两个参数的方式：第一个参数是路径，第二个参数是基准路径
    console.log(urlObj);
    // URL {
    //     href: 'http://localhost:9000/search?name=zs&age=18',
    //     origin: 'http://localhost:9000',
    //     protocol: 'http:',
    //     username: '',
    //     password: '',
    //     host: 'localhost:9000',
    //     hostname: 'localhost',
    //     port: '9000',
    //     pathname: '/search',
    //     search: '?name=zs&age=18',
    //     searchParams: URLSearchParams { 'name' => 'zs', 'age' => '18' },
    //     hash: ''
    //   }

    // 获取路径
    console.log(urlObj.pathname); // /search

    // 获取查询字符串
    console.log(urlObj.searchParams); // URLSearchParams { 'name' => 'zs', 'age' => '18' }
    console.log(urlObj.searchParams.get('name')); // zs

    response.end('Hello HTTP server');
});

// 3. 监听端口, 启动服务
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中...');
});
```
