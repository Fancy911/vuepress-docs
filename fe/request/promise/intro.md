---
title: Promise简介
date: 2023/02/24
categories:
 - 前端
tags:
 - promise
---

## Promise是什么

- 抽象表达
1. Promise 是一门新的技术(ES6 规范)
2. Promise 是 JS 中进行异步编程的新解决方案
    > 备注:旧方案是单纯使用回调函数
---
- 具体表达
1. 从语法上来说: Promise 是一个构造函数
2. 从功能上来说: Promise 对象用来封装一个**异步操作**并可以获取其成功/
失败的结果值

::: tip
### 异步编程
* fs 文件操作
```js
require('fs').readFile('./index.html', (err,data)=>{})
```
* 数据库操作
* AJAX 
```js
$.get('/server', (data)=>{})
```
* 定时器 
```js
setTimeout(()=>{}, 2000);
```
:::

## 为什么要用Promise

### 指定回调函数的方式更加灵活

1. 旧的: 必须在启动异步任务前指定（可以去看原生ajax部分的内容）
2. promise: 启动异步任务 => 返回 promise 对象 => 给 promise 对象绑定回调函
数(甚至可以在异步任务结束后指定/多个)

### 支持链式调用, 可以解决回调地狱问题

1. 什么是回调地狱?
    - 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行的条件
2. 回调地狱的缺点? 
    - 不便于阅读
    - 不便于异常处理
    - <img src="./imgs/回调地狱.jpg">
3. 解决方案?
    - promise 链式调用
4. 终极解决方案?
    - async/await