---
title: 模块化简介
date: 2023/04/19
categories:
 - 后端
tags:
 - 模块化
---

## 1.什么是模块化与模块

将一个复杂的程序文件依据一定规则(规范)拆分成多个文件的过程称之为模块化。

其中拆分出的 **每个文件就是一个模块** ，模块的内部数据是私有的，不过模块可以暴露内部数据以便其他模块使用。

## 2.什么是模块化项目
编码时是按照模块一个一个编码的，这个项目就是一个模块化的项目

## 3.模块化优点

1. 减少命名冲突的可能
2. 高复用性
3. 高维护性

## 4.Demo
可以通过下面的操作步骤，快速体验模块化

### 创建me.js
```js
// 声明函数 
function dance(){
    console.log('跳舞....'); 
}

function sing(){
    console.log('唱歌....'); 
}
// 暴露数据 
module.exports = {
    dance,
    sing
};
```
### 创建index.js

```js
// 导入模块
const me = require('./me.js');

//输出 me
console.log(me); // 是一个对象：{ dance: [Function: dance], sing: [Function: sing] }

me.dance(); // 跳舞....
me.sing(); // 唱歌....
```