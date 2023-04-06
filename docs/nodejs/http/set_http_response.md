---
title: 设置HTTP响应报文
date: 2023/04/06
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

| 作用 | 语法 |
| :--- | :--- |
| 设置响应状态码 | `response.statusCode` |
| 设置响应状态描述 | `response.statusMessage`  ( 用的非常少 ) |
| 设置响应头 | `response.setHeader('头名','头值'` |
| 设置响应体 | `response.write('xx')   response.end('Hello HTTP server');` |

::: tip
多个同名响应头设置：
```js
response.setHeader('test', ['1', '2', '3']);
```
这样就能在响应头中设置多个同名的响应头
test: 1
test: 2
test: 3
:::

`write` 和 `end` 的两种使用情况:
1. `write` 和 `end` 的结合使用, 响应体相对分散 

- 一般来说，我们在write里设置了响应体的，就不会再在end里设置响应体了

```js  
response.write('xx');
response.write('xx');
response.write('xx');
response.end(); // 每一个请求，在处理的时候必须要执行 end 方法的
```

2. 单独使用`end`方法, 响应体相对集中

```js
response.end('xxx');
```