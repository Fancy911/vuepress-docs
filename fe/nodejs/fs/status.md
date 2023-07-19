---
title: fs查看资源状态
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

在Node.js中，我们可以使用 `stat` 或 `statSync` 来查看资源的详细信息 

- 语法:
    ```js
    fs.stat(path[, options], callback)
    fs.statSync(path[, options])
    ```
- 参数说明:
    ```bash
    path 文件夹路径
    options 选项配置( 可选 ) 
    callback 操作后的回调
    ```
- 示例代码:
    ```js
    // 异步获取状态
    fs.stat('./data.txt', (err, data) => {
        if(err) throw err;
        console.log(data); // 打印出文件的详细信息, 如: 文件大小, 创建时间, 修改时间等
        /* 
            结果值对象结构:
            - size 文件体积
            - birthtime 创建时间
            - mtime 最后修改时间 
            - atime 最后访问时间 
         */ 
        console.log(data.isFile()); // 判断是否是文件, 返回布尔值
        console.log(data.isDirectory()); // 判断是否是文件夹, 返回布尔值
    });

    // 同步获取状态
    let data = fs.statSync('./data.txt');
    ```