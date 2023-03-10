---
title: 原生AJAX
date: 2023/02/21
categories:
 - 前端
tags:
 - react
 - ajax
 - xml
 - http
---

## 1. AJAX 简介

AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。

通过 AJAX 可以在浏览器中向服务器发送异步请求，**最大的优势：无刷新获取数据**。 

AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

## 2. XML 简介
XML——可扩展标记语言。

XML——被设计用来传输和存储数据。

XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，
全都是自定义标签，用来表示一些数据。

比如说我有一个学生数据: `name = "孙悟空" ; age = 18 ; gender = "男" ;`
用 XML 表示: 
```xml
<student>
    <name>孙悟空</name>
    <age>18</age>
    <gender>男</gender>
</student>
```
现在已经被 JSON 取代了。
```json
{
    "name":"孙悟空",
    "age":18,
    "gender":"男"
}
```

## 3. AJAX的特点

### 优点

1. 可以无需刷新页面而与服务器端进行通信。
2. 允许你根据用户事件来更新部分页面内容。

### 缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO（搜索引擎优化）不友好（网页中的内容爬虫是爬不到的）

## 4. HTTP协议

HTTP（hypertext transport protocol）协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。
约定, 规则

### 请求报文

重点是格式与参数

```
行      POST  /s?ie=utf-8  HTTP/1.1 
头      Host: atguigu.com
        Cookie: name=guigu
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
```

### 响应报文

```
行      HTTP/1.1  200  OK
头      Content-Type: text/html;charset=utf-8
        Content-length: 2048
        Content-encoding: gzip
空行    
体      <html>
            <head>
            </head>
            <body>
                <h1>尚硅谷</h1>
            </body>
        </html>
```

* 404：请求的资源不存在
* 403：没有权限访问
* 401：未授权
* 500：服务器内部错误
* 200：请求成功
* 301：永久重定向
* 302：临时重定向