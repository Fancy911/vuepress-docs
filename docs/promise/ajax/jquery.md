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

```js
$.get(url, [data], [callback], [type])
```
- `url`: 请求的 URL 地址。
- `data`: 请求携带的参数。
- `callback`: 载入成功时回调函数。
- `type`: 设置返回内容格式，`xml, html, script, json, text, _default`。

```js
$.get('http://localhost:8000/jquery-server', {a:100, b:200}, function(data){
    console.log(data); // 这个data就是服务器返回的数据，响应体
},'json');
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
$.post('http://localhost:8000/jquery-server', {a:100, b:200}, function(data){
    console.log(data); // 这个data就是服务器返回的数据，响应体
},'json');
```

## 通用请求
```js
$.ajax({
    url: url,
    type: type,
    data: data,
    dataType: 'json',
    timeout: 5000,
    success: function (data) {
        console.log(data)
    },
    error: function () {
        console.log('请求失败')
    }
})
```
更多通用ajax请求的参数请参考[官方文档](https://www.jquery123.com/jQuery.ajax/)