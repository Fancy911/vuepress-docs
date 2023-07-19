---
title: fs文件路径
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

## 路径

fs 模块对资源进行操作时，路径的写法有两种: 

- 相对路径

| 写法 | 说明 |
| ---- | ---- |
| ./座右铭.txt  | 当前目录下的座右铭.txt           |
| 座右铭.txt    | 等效于上面的写法                 |
| ../座右铭.txt | 当前目录的上一级目录中的座右铭.txt |


- 绝对路径

| 写法 | 说明 |
| ---- | ---- |
| D:/Program Files/座右铭.txt | windows 系统下的绝对路径 |
| /usr/bin/座右铭.txt | Linux 系统下的绝对路径 |
 
::: warning
相对路径中所谓的<strong style="color: red">当前目录</strong> ，指的是<strong style="color: red">命令行的工作目录</strong> ，而并非是文件的所在目录 所以当命令行的工作目录与文件所在目录不一致时，会出现一些 `BUG`
:::

## `__dirname`

- `__dirname` 与 `require` 类似，都是`Node.js`环境中的**'全局'变量**
- `__dirname` 保存着 <strong style="color: red">当前文件所在目录的绝对路径</strong> ，可以使用 `__dirname` 与文件名拼接成绝对路径

```js
let data = fs.readFileSync(__dirname + '/data.txt');
console.log(data); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```
::: tip
使用 fs 模块的时候，尽量使用` __dirname`将路径转化为绝对路径，这样可以避免相对路径产生的 `Bug`
:::
