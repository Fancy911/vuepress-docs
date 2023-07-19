---
title: Axios简介
date: 2023/03/01
categories:
 - 前端
tags:
 - axios
 - json-server
---
## 前置知识
1. Promise
2. Ajax
## axios——Web数据交互方式

Axios，是一个基于`promise`的网络请求库，作用于`node.js`和`浏览器`中，它是`isomorphic `的(即同一套代码可以运行在`浏览器`和`node.js`中)。
- 在服务端它使用原生`node.js``http`模块, 向远端服务发送http请求
- 而在客户端 (浏览端) 则使用`XMLHttpRequest`，发送ajax请求。

> react/vue 官方都推荐使用 axios 发 ajax 请求

::: tip
axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范。

[官方文档](https://github.com/axios/axios)
:::

## axios特点

1. Make XMLHttpRequests from the browser
2. Make http requests from node.js
3. Supports the Promise API
4. Intercept request and response（翻译：拦截请求和响应）
5. Transform request and response data (翻译：转换请求和响应数据)
6. Cancel requests (翻译：取消请求)
7. Automatic transforms for JSON data (翻译：自动转换JSON数据)
8. Automatic data object serialization to multipart/form-data and x-www-form-urlencoded body encodings (翻译：自动将数据对象序列化为multipart/form-data和x-www-form-urlencoded主体编码)
9. Client side support for protecting against XSRF (翻译：客户端支持防御XSRF)

## 搭建一个[Json-Server](https://github.com/typicode/json-server)

新建一个项目文件夹，名为json-server。
### 1. 安装

```bash
npm install -g json-server
```

### 2. 在项目中创建一个`db.json`文件

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

### 3. 启动

```bash
json-server --watch db.json
```