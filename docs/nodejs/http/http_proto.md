---
title: HTTP协议
date: 2023/04/04
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

## 一、概念

HTTP (hypertext transport protocol)协议：超文本传输协议
- 是一种基于`TCP/IP`的`应用层`通信协议
- 用于客户端和服务端之间的通信
- 这个协议详细规定了<strong style="color:red">浏览器</strong> 和 <strong style="color:red">万维网服务器</strong> 之间互相通信的规则。 

- 协议中主要规定了两个方面的内容
    - 客户端: 用来向服务器发送数据，可以被称之为`请求报文`
    - 服务端: 向客户端返回数据，可以被称之为`响应报文`

## 二、HTTP请求报文

HTTP请求报文的组成如下：
    **- 请求行
    - 请求头
    - 空行
    - 请求体**

<img src="./imgs/报文.png">

### 1. HTTP请求行

<img src="./imgs/请求行.png">

- 请求方法
    - GET: 获取资源
    - POST: 传输实体主体
    - PUT: 传输文件
    - DELETE: 删除文件
    - HEAD: 获得报文首部
    - OPTIONS: 询问支持的方法
    - TRACE: 追踪路径
    - CONNECT: 要求用隧道协议连接代理
    - PATCH: 对资源应用部分修改
---
- 请求 URL (Uniform Resource Locator: 统一资源定位器)
    - 以`http://www.baidu.com:80/index.html?a=100&b=200#logo`为例
        - `http`: 协议( 还有`https`、`ftp`、`ssh`等)
        - `www.baidu.com`: 域名
        - `80`: 端口号
        - `/index.html`: 路径
        - `a=100&b=200`: 查询字符串 
        - `#logo`: 哈希(锚点链接)
---
- HTTP协议版本号
    - HTTP/1.0: 1996年发布
    - HTTP/1.1: 1999年发布
    - HTTP/2.0: 2015年发布
    - HTTP/3.0: 2018年发布s


### 2. HTTP请求头

<img src="./imgs/请求头.png">

｜请求头｜说明｜
｜:---:｜:---:｜
｜Host｜请求资源所在服务器的域名和端口号｜
｜Connection｜浏览器与服务器之间连接的类型｜
｜Cache-Control｜浏览器缓存机制｜
｜Upgrade-Insecure-Requests｜升级为安全请求｜
｜User-Agent｜发出请求的浏览器的相关信息｜
｜Accept｜浏览器能够处理的内容类型｜
｜Accept-Charset｜浏览器能够显示的字符集｜
｜Accept-Encoding｜浏览器能够处理的压缩编码｜
｜Accept-Language｜浏览器当前设置的语言｜
｜Authorization｜Web服务器对客户端的授权信息｜
｜Cookie｜当前请求携带的Cookie｜
｜Referer｜发出请求的页面地址｜


### 3. HTTP请求体

## 响应报文的组成

## 创建HTTP服务

