---
title: fs文件删除
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

在Node.js中，我们可以使用 `unlink` 或 `unlinkSync` 来删除文件

- 语法:
    ```js
    fs.unlink(path, callback)
    fs.unlinkSync(path)
    ```
- 参数说明:
    ```bash
    path 文件路径
    callback 操作后的回调 
    ```
- 代码示例:
    ```js
    const fs = require('fs');

    fs.unlink('./test.txt', err => { 
        if(err) throw err; 
        console.log('删除成功');
    });

    fs.unlinkSync('./test2.txt');
    ```