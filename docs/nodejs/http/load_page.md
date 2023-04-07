---
title: 网页资源加载的基本过程
date: 2023/04/07
categories:
 - 计算机网络
tags:
 - http协议
 - 网络
---

<img src="./imgs/load.png">

网页资源的加载都是循序渐进的:
- 首先获取 HTML 的内容，然后解析 HTML 
- 再发送其他资源的请求，如 CSS，Javascript，图片等。 

<strong style="color:red">理解了这个内容对于后续的学习与成长有非常大的帮助</strong>

::: warning
思考一个小问题：我们上节课写的响应一个HTML页面的服务，其中，HTML文件中还包含了JS、CSS代码，我们能够将JS和CSS代码也拆成单独的文件吗？

### index.css
```css
td {
  padding: 20px 40px;
}

table tr:nth-child(odd) {
  background: rgb(179, 165, 201);
}

table tr:nth-child(even) {
  background: #fcb;
}

table,
td {
  border-collapse: collapse;
}
```

### index.js
```js
//获取所有的 td
let tds = document.querySelectorAll('td');

//遍历
tds.forEach(item => {
    item.onclick = function () {
        this.style.background = '#222';
    }
})
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <table border="1">
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>
<script src="./index.js"></script>
</body>
</html>
```

然后，我们还是用同样的方式，读取html文件并返回

### server.js
```js
const http = require('http'); //导入 http 模块
const fs = require('fs'); //导入 fs 模块

//创建服务对象
const server = http.createServer((request, response) => {
    // 读取文件
    let html = fs.readFileSync(__dirname + './table.index.html'); 
    response.end(html); //设置响应体
});

server.listen(9000, () => {
    console.log('服务已经启动....')
});
```

这样，你会发现，我们的页面中的CSS和JS代码都没有生效，只有html的表格结构渲染出来了。这是为什么呢？

因为，我们上面服务中回调函数的写法，相当于是，不论你是请求的是HTML、CSS、JS，都是返回的HTML文件，这样就导致了，CSS和JS代码没有生效。那我们如何解决这个问题呢？

<strong style="color:red">我们可以根据请求的资源（请url路径）的不同，返回不同的内容，这样就可以解决这个问题了。</strong>

### 更改后的server.js

```js
const http = require('http'); //导入 http 模块
const fs = require('fs'); //导入 fs 模块

//创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求的路径
    let {pathname} = new URL(request.url, 'http://localhost:9000');
    // 根据请求的路径，返回不同的内容
    // 如果请求的是 / ，则返回 index.html
    if (pathname === '/') {
        let html = fs.readFileSync(__dirname + './index.html'); 
        response.end(html); //设置响应体
    } else if (pathname === '/index.css') {
        let css = fs.readFileSync(__dirname + './index.css'); 
        response.end(css); //设置响应体
    } else if (pathname === '/index.js') {
        let js = fs.readFileSync(__dirname + './index.js'); 
        response.end(js); //设置响应体
    } else {
        // 如果请求的是其他路径，则返回 404
        response.statusCode = 404;
        response.end('<h1>404 Not Found</h1>');
    }
});

server.listen(9000, () => {
    console.log('服务已经启动....')
});
```
:::