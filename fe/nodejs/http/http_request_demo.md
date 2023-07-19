---
title: HTTP请求练习
date: 2023/04/06
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

按照以下要求搭建 HTTP 服务

| 请求类型(方法) | 请求地址 | 响应体结果 |
| :--- | :--- | :--- |
| get | /login | 登录页面 |
| get | /reg | 注册页面 |

```js
// 1、引入http模块
const http = require("http");

// 2、建立服务
const server = http.createServer((request,response)=>{
    // 获取请求的方法
    let {method} = request; //对象的解构赋值

    // 获取请求的路径
    let {url} = new URL(request.url, "http://127.0.0.1");

    // 设置响应头信息，解决中文乱码 
    response.setHeader("Content-Type","text/html;charset=utf-8") 
    
    if (url == "/register" && method == "GET") {
        response.end("注册页面");
    } else if (url=="/login" && method == "GET") {
        response.end("登录页面"); 
    } else {
        response.end("<h1>404 Not Found</h1>")
    }
})
//3、监听端口 
server.listen(8000,()=>{
    console.log('服务启动中....'); 
})
```