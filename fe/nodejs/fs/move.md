---
title: fs文件移动与重命名
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

文件移动与重命名就是将 **文件** 从一个 **路径** 移动到另一个 **路径**。

在 Node.js 中，我们可以使用 `rename` 或 `renameSync` 来**移动**或**重命名** 文件或文件夹

| 方法                        | 说明     |
| --------------------------- | -------- |
| rename                      | 异步移动 |
| renameSync                  | 同步移动 |


- 语法: 
    ```js
    fs.rename(oldPath, newPath, callback)
    fs.renameSync(oldPath, newPath)
    ```
- 参数说明:
    ```bash
    oldPath 文件当前的路径
    newPath 文件要移动到的新路径 or 文件的新名称
    callback 回调
    ```
- 代码示例:
    ```js
    // require 是 Node.js 环境中的'全局'变量，用来导入模块
    const fs = require('fs');

    // 将当前文件夹下的『座右铭.txt』文件移动到当前文件夹下的『座右铭2.txt』文件中
    fs.rename('./座右铭.txt', './座右铭2.txt', err => {
        if(err){
            console.log(err);
            return; 
        }
        console.log('移动 ｜ 重命名成功'); 
    });

    fs.renameSync('./座右铭.txt', './论语/我的座右铭.txt');
    ```