---
title: React中的ajax请求
date: 2023/02/21
categories:
 - 前端
tags:
 - react
 - ajax
---
## 前置说明
1. React本身只关注于界面, 并不包含发送`ajax请求`的代码
2. 前端应用需要通过`ajax请求`与后台进行交互(`json`数据)
3. React应用中需要集成`第三方ajax库`(或`自己封装`)

## 常用的ajax请求库
1. `jQuery`: 比较重, 如果需要另外引入不建议使用
2. `axios`: 轻量级, 建议使用
    - 封装`XmlHttpRequest`对象的`ajax`
    - `promise`风格
    - 可以用在`浏览器端`和`node服务器端`

::: tip
可以先跳转至[异步请求](https://fancy911.github.io/vuepress-docs/docs/request/)学习一下`ajax`和`axios`，再进行下面的学习
:::