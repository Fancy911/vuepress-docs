---
title: Redux的核心API
date: 2023/03/12
categories:
 - 前端
tags:
 - react
 - redux
---

## 核心API

### 1.createstore()
作用：创建包含指定`reducer`的`store`对象
### 2.store对象
1.	作用: `redux`库最核心的管理对象
2.	它内部维护着:
    - `state`
    - `reducer`
3.	核心方法:
    - `getState()`: 得到内部state
    - `dispatch(action)`: 分发action, 触发reducer调用, 产生新的state
    - `subscribe(listener)`: 注册监听, 当产生新的state时, 自动调用
4.	具体编码:
    - `store.getState()`
    - `store.dispatch({type:'INCREMENT', number})`
    - `store.subscribe(render)`

### 3.applyMiddleware()
作用：应用上基于`redux`的中间件(插件库)
比如: `redux-thunk`、`redux-logger`、`redux-promise`等
### 4.combineReducers()
作用：合并多个`reducer`函数

## redux异步编程
理解:
1. redux默认是不能进行异步处理的, 
2. 某些时候应用中需要在redux中执行异步任务(ajax, 定时器)
``` bash
npm install --save redux-thunk
```
