---
title: path模块
date: 2023/01/31
categories:
 - 前端
 - 服务端
tags:
 - nodejs
---

NodeJs包含：内置模块，自定义模块（自己书写的模块），第三方模块(使用npm管理工具安装使用的模块)、

本章节介绍常用的NodeJS包含的内置模块。

## path模块

- path模块提供了用于处理文件和目录的路径的实用工具。
- 可以使用以下方式访问它：
    ```js
    const path = require('path');
    ```

### 示例代码

- `pathDemo.js`

```js
// 引入path模块
const path = require('path');

// 两个特殊的变量🌟
console.log(__dirname); // 当前执行的文件绝对路径，不包含文件名(常用)： /Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code
console.log(__filename); // 当前执行的文件绝对路径，包含文件名： /Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code/pathDemo.js

// 打印出来当前这个文件名的后缀名，比如 pathDemo.js 这个打印出来的就是 .js
let extname = path.extname(__filename);
console.log("后缀名：", extname); 

// 获取指定文件名, 比如 pathDemo.js 这个打印出来的就是 pathDemo.js
let basename = path.basename(__filename); 
console.log("文件全名：", basename); 

// 获取指定文件名当前所在的绝对的路径
// 即，获取pathDemo.js这个文件所在的绝对路径 /Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code
let dirname = path.dirname(__filename);
console.log("filename这个文件的绝对路径：", dirname);

// 综合上述内容的一个对象：获取路径解析成一个字符串的对象
let parse = path.parse(__filename); 
console.log("一个文件信息对象：", parse);
// {
//   root: '/',
//   dir: '/Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code',
//   base: 'pathDemo.js',
//   ext: '.js',
//   name: 'pathDemo'
// }

// ===========================================================
// 重要：拼接操作(可以拿到某一个文件的路径的完整态) 拼接路径
// 多一层目录，就多一个参数
// __dirname是 /Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code 
// 拼接了module和m1.js，就成为 /Users/lizhiwei09/Desktop/node.js笔记+代码/node02/code/module/m1.js
let fullPath = path.join(__dirname, 'module', 'm1.js')
console.log(fullPath);
```