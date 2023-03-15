---
title: React-Redux
date: 2023/03/15
categories:
 - 前端
tags:
 - react
 - react-redux
---

之前我们说到，`redux`是一个专门用于做状态管理的JS库，它可以用在`react`, `angular`, `vue`等项目中, 但基本与`react`配合使用。

于是，我们就有了专属于`react`的`react-redux`库（facebook出品的官方库），它是`react`和`redux`的官方绑定库，它可以让我们更方便的使用`redux`。

<img src="./imgs/react-redux模型图.png">

## 理解

1. 一个`react`插件库
2. 专门用来简化`react`应用中使用`redux`
3. `react-redux`将所有组件分成两大类
    - UI组件
        1. 只负责 UI 的呈现，不带有任何业务逻辑
        2. 通过`props`接收数据(一般数据和函数)
        3. 不使用任何 `Redux` 的 `API`
        4. 一般保存在`components`文件夹下
    - 容器组件
        1. 负责管理数据和业务逻辑，不负责UI的呈现
        2. 使用 `Redux` 的 `API`
        3. 一般保存在`containers`文件夹下

## 常用API
1.	Provider：让所有组件都可以得到state数据
 
2.	connect：用于包装 UI 组件生成容器组件
 
3.	mapStateToprops：将外部的数据（即state对象）转换为UI组件的标签属性
 
4.	mapDispatchToProps：将分发action的函数转换为UI组件的标签属性

## 调试工具

Redux-Devtools

## 工具依赖

npm install --save-dev redux-devtools-extension




