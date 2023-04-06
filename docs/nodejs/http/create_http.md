---
title: 创建HTTP服务
date: 2023/04/06
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

使用 nodejs 创建 HTTP 服务

## 1.操作步骤

```js
//1. 导入 http 模块
const http = require('http');

//2. 创建服务对象 create 创建 server 服务
// request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据 
// response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文 
const server = http.createServer((request, response) => {
    response.end('Hello HTTP server');
});

//3. 监听端口, 启动服务 
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中...'); 
});
```

::: tip
`http.createServer`里的回调函数的执行时机: 当接收到 `HTTP` 请求的时候，就会执行
:::

## 2.测试

浏览器请求对应端口

`http://127.0.0.1:9000`

## 3.注意事项

1. 命令行 ctrl + c 停止服务
2. 当服务启动后，更新代码必须重启服务才能生效 
3. 响应内容中文乱码的解决办法
    - `response.setHeader('content-type','text/html;charset=utf-8');` 
4. 端口号被占用: `Error: listen EADDRINUSE: address already in use :::9000`
    - 关闭当前正在运行监听端口的服务 ( 使用较多 )
    - 修改其他端口号
5. HTTP协议默认端口是80。HTTPS协议的默认端口是443, HTTP服务开发常用端口有3000，8080，8090，9000 等

::: tip
如果端口被其他程序占用，可以使用`资源监视器`找到占用端口的程序，然后使用`任务管理器`关闭 对应的程序
:::