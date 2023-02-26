---
title: 手写Promise（有难度）
date: 2023/02/25
categories:
 - 前端
 - 经典面试题
tags:
 - promise
---

手写Promise，也叫Promise的自定义封装。

## 实现步骤
1. 初始化Promise函数对象：初始化状态、结果值、回调函数
2. 初始化reject和resolve函数，并实现 1.状态的改变 2.结果值的设置 3.回调函数的调用
3. 实现throw抛出异常改变状态的功能
4. 实现Promise对象的状态只能改变一次的功能
5. 实现then方法执行回调的功能
6. 实现异步任务下的回调的执行：callbacks[]
7. 实现指定多个回调执行的功能
8. 同步修改状态和异步修改状态的处理，then的回调处理。
9. 实现catch方法的功能
10. 实现Promise.resolve方法
11. 实现Promise.reject方法
12. 实现Promise.all方法
13. 实现Promise.race方法
14. 实现then的异步链式调用
15. 改造为ES6的class语法

[完整的手写的Promise代码](https://github.com/Fancy911/Promise-Learning/tree/main/2-%E6%89%8B%E5%86%99Promise)