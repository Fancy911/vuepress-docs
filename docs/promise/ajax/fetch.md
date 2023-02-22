---
title: Fetch函数发送AJAX请求案例
date: 2023/02/22
categories:
 - 前端
tags:
 - react
 - ajax
 - fetch
---

fetch函数是`window`对象的一个方法，用于发送`ajax`请求。本节只是简单的介绍一下`fetch`函数的使用，具体的`fetch`函数的使用可以参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。

## 基本使用
```js
fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
    //请求方法
    method: 'POST',
    //请求头
    headers: {
        name:'atguigu'
    },
    //请求体
    body: 'username=admin&password=admin'
}).then(response => {
    // return response.text(); // 如果服务器返回的是文本字符串，直接使用text()方法
    return response.json(); // 如果服务器返回的是json字符串，可以使用json()方法将其转换为js对象
}).then(response=>{
    console.log(response);
});
```

## 具体示例

- [客户端代码示例](https://github.com/Fancy911/ajax-learning-demo/tree/main/4.fetch-ajax)
- [服务端代码示例](https://github.com/Fancy911/ajax-learning-demo/blob/main/server.js)