---
title: fs读取文件
date: 2023/04/03
categories:
 - 前端
 - 后端
tags:
 - fs
---

文件读取顾名思义，就是通过程序从文件中取出其中的数据，我们可以使用如下几种方式:

| 方法             | 说明     |
| ---------------- | -------- |
| readFile         | 异步读取 |
| readFileSync     | 同步读取 |
| createReadStream | 流式读取 |


## 1.`readFile`异步读取

- 语法: `fs.readFile(path[, options], callback)`
- 参数说明:
    ```bash
    path 文件路径 
    options 选项配置 
    callback 回调函数
    ```
- 返回值: `undefined`
- 代码示例:
    ```js
    //导入 fs 模块
    const fs = require('fs');

    fs.readFile('./座右铭.txt', (err, data) => { 
        if(err) throw err;
        console.log(data); // 输出的是 Buffer 类型
        console.log(data.toString()); // 转换成字符串
    });

    // 读取文件时，可以指定编码格式
    fs.readFile('./座右铭.txt', 'utf-8',(err, data) => { 
        if(err) throw err;
        console.log(data);
    });
    ```

## 2.`readFileSync`同步读取

- 语法: `fs.readFileSync(path[, options])`
- 参数说明:
    ```bash
    path 文件路径 
    options 选项配置 
    ```
- 返回值: `string | Buffer`
- 代码示例:
    ```js
    //导入 fs 模块
    const fs = require('fs');
    
    let data = fs.readFileSync('./座右铭.txt');
    let data2 = fs.readFileSync('./座右铭.txt', 'utf-8');
    ```

## 3.`createReadStream`流式读取

- 语法: `fs.createReadStream(path[, options])`
- 参数说明:
    ```bash
    path 文件路径 
    options 选项配置 （可选）
    ```
- 返回值: `Object`
- 代码示例:
    ```js
    //创建读取流对象
    let rs = fs.createReadStream('./观书有感.txt'); 
    
    //每次取出 64k 数据后执行一次 data 回调 
    rs.on('data', data => {
        console.log(data);
        console.log(data.length);
    });

    //读取完毕后, 执行 end 回调 rs.on('end', () => {
    console.log('读取完成') })
    ```

## 4. 读取文件应用场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git 查看日志
- 上传文件
- 查看聊天记录