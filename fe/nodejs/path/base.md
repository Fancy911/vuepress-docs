---
title: path模块
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - path
 - node内置模块
---

`path` 模块提供了<strong style="color:red">操作路径</strong>的功能，我们将介绍如下几个较为常用的几个 API:

| API | 说明 |
| --- | ---- |
| path.resolve | 将多个路径解析成一个绝对路径 (`常用`) |
| path.sep | 获取操作系统的路径分隔符 |
| path.parse | 将路径解析成一个对象 |
| path.basename | 获取路径中的文件名 |
| path.dirname | 获取路径中的目录名 |
| path.extname | 获取路径中的文件扩展名 |


```js
const path = require('path'); 

// sep ：获取路径分隔符
console.log(path.sep);  // windows下： \ 反斜线  ||  Linux下： / 斜线

// resolve ：拼接绝对路径, 会是规范的反斜线\
console.log(path.resolve(__dirname, 'test')); // D:\program file\nodejs\test

// parse ：解析路径
let pathname = 'D:/program file/nodejs/node.exe'; 
console.log(path.parse(pathname));
/* 
    { 
        root: 'D:/',
        dir: 'D:/program file/nodejs',
        base: 'node.exe', 
        ext: '.exe', 
        name: 'node' 
    } 
*/

// basename ：获取路径基础名称 
console.log(path.basename(pathname)) // node.exe

// dirname ：获取路径的目录名
console.log(path.dirname(pathname)); // D:/program file/nodejs

// extname ：获取路径的扩展名
console.log(path.extname(pathname)); // .exe
```

