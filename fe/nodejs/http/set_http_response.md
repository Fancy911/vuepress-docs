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

## HTTP响应报文练习

需求：搭建HTTP服务器，响应一个4行3列的表格，并且要求表格有<strong style="color:red>隔行换色效果</strong>，且<strong style="color:red>点击</strong>单元格能够<strong style="color:red>高亮显示</strong>

```js
//导入 http 模块
const http = require('http');

//创建服务对象
const server = http.createServer((request, response) => {
    response.end(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    td{
                        padding: 20px 40px;
                    }
                    table tr:nth-child(odd){
                        background: #aef;
                    }
                    table tr:nth-child(even){
                        background: #fcb;
                    }
                    table, td{
                        border-collapse: collapse;
                    }
                </style>
            </head>
            <body>
                <table border="1">
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td></td><td></td><td></td></tr>
                </table>
                <script>
                    //获取所有的 td
                    let tds = document.querySelectorAll('td'); //遍历
                    tds.forEach(item => {
                        item.onclick = function(){
                            this.style.background = '#222';
                        } 
                    })
                </script>
            </body>
        </html>
    `); //设置响应体
});
//监听端口, 启动服务 
server.listen(9000, () => {
    console.log('服务已经启动....') 
});
```

::: tip
我们发现，这样去写响应体页面非常的麻烦，不管是在里面写样式，还是写脚本，都非常的麻烦，没有高亮提示，那我们应该怎么办呢？
:::

---

我们可以，在外部，写一个html文件，然后在服务端，使用`fs`读取这个文件，然后把读取到的内容，作为响应体返回给浏览器

```js
const http = require('http'); //导入 http 模块
const fs = require('fs'); //导入 fs 模块

//创建服务对象
const server = http.createServer((request, response) => {
    // 读取文件
    let html = fs.readFileSync(__dirname + './table.index.html'); 
    // 小问题：read读出来的是一个buffer，也可以直接传给end方法嘛？是的，可以直接传给end方法
    response.end(html); //设置响应体
});

server.listen(9000, () => {
    console.log('服务已经启动....')
});
```

读取的这个html文件，就是我们之前写的那个html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        td{
            padding: 20px 40px;
        }
        table tr:nth-child(odd){
            background: #aef;
        }
        table tr:nth-child(even){
            background: #fcb;
        }
        table, td{
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <table border="1">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
    </table>
    <script>
        //获取所有的 td
        let tds = document.querySelectorAll('td'); //遍历
        tds.forEach(item => {
            item.onclick = function(){
                this.style.background = '#222';
            } 
        })
    </script>
</body>
</html>
```
