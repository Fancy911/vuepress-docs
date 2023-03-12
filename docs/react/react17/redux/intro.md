---
title: Redux简介
date: 2023/03/12
categories:
 - 前端
tags:
 - react
 - redux
---

##  redux理解
### 1.学习文档
1. [英文文档](https://redux.js.org/)
2. [中文文档](http://www.redux.org.cn/)
3. [Github](https://github.com/reactjs/redux)
### 2.`redux`是什么
1.	`redux`是一个专门用于做状态管理的JS库(**不是react插件库**)。
2.	它可以用在`react`, `angular`, `vue`等项目中, 但基本与`react`配合使用。

作用: 集中式管理`react`应用中多个组件**共享**的状态。
### 3.什么情况下需要使用`redux`

1.	某个组件的状态，需要让其他组件可以随时拿到（**共享**）。
2.	一个组件需要改变另一个组件的状态（通信）。

总体原则：能不用就不用, 如果不用比较吃力才考虑使用。
### 4.redux工作流程

<img src="./imgs/redux原理图.png" width="80%"/>
