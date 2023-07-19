---
title: GET和POST请求
date: 2023/04/07
categories:
 - 计算机网络
tags:
 - get
 - post
 - 请求方法
---

GET 和 POST 是 HTTP 协议请求的两种方式。

- GET 主要用来获取数据，POST 主要用来提交数据
- GET 带参数请求是将参数缀到 URL 之后，在地址栏中输入 url 访问网站就是 
- GET 请求， POST 带参数请求是将参数放到请求体中
- POST 请求相对 GET 安全一些，因为在浏览器中参数会暴露在地址栏 
- GET 请求大小有限制，一般为 2K，而 POST 请求则没有大小限制

还有很多具体的区别，这里推荐一篇知乎问答：[GET 和 POST 到底有什么区别？](https://www.zhihu.com/question/28586791)
 
## 常见场景

### GET 请求的情况:

- 在地址栏直接输入 url 访问 
- 点击a链接
- link 标签引入 cs
- script 标签引入 js
- img 标签引入图片
- form 标签中的 method 为 get (不区分大小写) 
- ajax 中的 get 请求

### POST 请求的情况

- form 标签中的 method 为 post(不区分大小写)
- AJAX 的 post 请求