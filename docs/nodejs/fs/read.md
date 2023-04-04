---
title: fs文件读取
date: 2023/04/03
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
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
    // 导入 fs 模块
    const fs = require('fs');

    // 创建读取流对象
    let rs = fs.createReadStream('./观书有感.txt'); 
    
    // 绑定data事件： chunk：块 ，读取到的数据
    // 每次读取到的数据长度是 64kb
    rs.on('data', chunk => {
        console.log(chunk);
        console.log(chunk.length); // 读取到的数据长度，单位是字节 是 65536 字节 => 64kb
    });

    //读取完毕后, 执行 end 回调（可选事件，不是必选的） 
    rs.on('end', () => {
        console.log('读取完成') 
    })
    ```
## 4.读取文件应用场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git 查看日志
- 上传文件
- 查看聊天记录

## 5.文件复制案例

- 需求：复制【资料】文件夹下的【笑看风云.mp4】

### 实现方式1: `readFileSync` + `writeFileSync`

```js
// 导入 fs 模块
const fs = require('fs');

// 读取文件
let data = fs.readFileSync('./资料/笑看风云.mp4')
// 写入文件
fs.writeFileSync('./资料/笑看风云-2.mp4', data)

// 查看占用内存
console.log(process.memoryUsage()); // { rss: 110710784, …… }  110710784字节 = 110.7MB
```
### 实现方式2: 流式操作

```js
// 导入 fs 模块
const fs = require('fs');

// 创建读取流对象
let rs = fs.createReadStream('./资料/笑看风云.mp4');
// 创建写入流对象
let ws = fs.createWriteStream('./资料/笑看风云-3.mp4');

// 绑定 data 事件：相当于每次读取到 64kb 的数据，就写入一次
// rs.on('data', chunk => {
//     // 写入文件
//     ws.write(chunk);
// });
// rs.on('end', () => {
//     // 关闭写入流
//     ws.end();
//     console.log(process.memoryUsage()); // { rss: 43106304, …… }  43106304 字节 = 43.1MB

// ======以上写法，可以简写成如下写法======
rs.pipe(ws);
rs.on('end', () => {
    console.log(process.memoryUsage());
});
```
- 流式操作会比第一种方式会更好的：速度快、节省内存
    - **节省内存**：读取文件时，每次读取到的数据长度是 64kb，而不是一次性读取完毕，所以不会占用太多内存
    - **速度快**：而且，一般来说，读取文件的速度是比写入文件的速度快的，所以，还没有写入完毕，就可以继续读取下一次的数据，这样就会更快