---
title: 生命周期
date: 2023/05/11
categories:
 - 前端
tags:
 - vue2.x
 - lifeCircle
---

生命周期：
1. 又名：生命周期回调函数、生命周期函数、生命周期钩子。
2. 是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
4. 生命周期函数中的this指向是vm 或 组件实例对象。

## 生命周期流程

<img src="./imgs/生命周期.png">

1. 初始化显示
    * beforeCreate() 
    * created()
    * beforeMount() 
    * mounted()
2. 更新状态: this.xxx = value
    * beforeUpdate() 
    * updated()
3.  销毁 vue 实例: vm.$destory()
    * beforeDestory()
    * destoryed()

## 常用的生命周期方法

- mounted(): 发送 ajax 请求, 启动定时器等异步任务
- beforeDestory(): 做收尾工作, 如: 清除定时器

- 关于销毁Vue实例
    1. 销毁后借助Vue开发者工具看不到任何信息。
    2. 销毁后自定义事件会失效，但原生DOM事件依然有效。
    3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。