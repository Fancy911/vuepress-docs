---
title: jQuery中的AJAX案例
date: 2023/02/22
categories:
 - 前端
tags:
 - react
 - ajax
 - jquery
---

## get请求

没有请求体参数。

```js
$.get(url, [data], [callback], [type])
```
- `url`: 请求的 URL 地址。
- `data`: 请求时携带的参数，get没有请求体参数，所以即便是在data中传递了参数，本质也会体现为url中的查询字符串参数。
- `callback`: 载入成功时回调函数。
- `type`: 设置返回内容格式，`xml, html, script, json, text, _default`。

```js
$.get(
    'http://localhost:8000/jquery-server', 
    {a:100, b:200}, 
    function(data){
        console.log(data); // 这个data就是服务器返回的数据，响应体
    },
    'json'
);

// 也可以这样写
$.get(
    'http://localhost:8000/jquery-server?a=100&b=200', 
    function(data){
        console.log(data);
    },
    'json'
);

// 这两种写法是等价的
```

## post请求
```js
$.post(url, [data], [callback], [type])
```
- `url`: 请求的 URL 地址。
- `data`: 请求携带的参数。
- `callback`: 载入成功时回调函数。
- `type`: 设置返回内容格式，`xml, html, script, json, text, _default`。

```js
$.post(
    'http://localhost:8000/jquery-server', 
    {a:100, b:200}, 
    function(data){
        console.log(data); // 这个data就是服务器返回的数据，响应体
    },
    'json'
);
```

## 通用请求
```js
$.ajax({
    url: url, // 请求地址
    type: type, // 请求类型
    data: data, // 请求体参数，只有post请求才有
    dataType: 'json', // 返回的数据格式
    timeout: 5000, // 超时时间
    success: function (data) { // 请求成功的回调函数
        console.log(data)
    },
    error: function () { // 请求失败的回调函数
        console.log('请求失败')
    }
})
```
更多通用ajax请求的参数请参考[官方文档](https://www.jquery123.com/jQuery.ajax/)

## 总结：ajax传递参数的方式

1. query查询字符串传参：get请求的参数是通过url中的查询字符串传递的，所以我们可以直接在url中拼接参数。
2. 请求体传参：post请求的参数是通过请求体传递的，所以我们需要在data中传递参数。

## 具体示例

- [客户端代码示例](https://github.com/Fancy911/ajax-learning-demo/tree/main/2.jquery-ajax)
- [服务端代码示例](https://github.com/Fancy911/ajax-learning-demo/blob/main/server.js)