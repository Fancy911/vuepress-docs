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

<img src="./imgs/redux原理图.png"/>

## redux的三个核心概念

### action
1.	动作的对象
2.	包含2个属性
    - `type`：标识属性, 值为字符串, 唯一, 必要属性
    - `data`：数据属性, 值类型任意, 可选属性
3.	例子：
    ```json
    { 
        type: 'ADD_STUDENT',
        data: {
            name: 'tom',
            age:18
        } 
    }
    ```
::: warning
action, 有同步和异步两种
- 同步action: 对象
- 异步action: 函数
:::

### reducer
1.	用于初始化状态、加工状态。
2.	加工时，根据旧的`perState`和`action`， 产生新的`state`的纯**函数**。
### store
1.	将`state`、`action`、`reducer`联系在一起的对象
2.	如何得到此对象?
    ```js
    import {createStore} from 'redux'
    import reducer from './reducers'
    const store = createStore(reducer)
    ```
3.	此对象的功能?
    - `getState()`: 得到`state`
    - `dispatch(action)`: 分发`action`, 触发`reducer`调用, 产生新的`state`
    - `subscribe(listener)`: 注册监听, 当产生了新的`state`时, 自动调用