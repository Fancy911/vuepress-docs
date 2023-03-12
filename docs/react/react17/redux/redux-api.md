---
title: Redux的核心API
date: 2023/03/12
categories:
 - 前端
tags:
 - react
 - redux
---

## 1.createstore()
作用：创建包含指定reducer的store对象
## 2.store对象
1.	作用: redux库最核心的管理对象
2.	它内部维护着:
1)	state
2)	reducer
3.	核心方法:
1)	getState()
2)	dispatch(action)
3)	subscribe(listener)
4.	具体编码:
1)	store.getState()
2)	store.dispatch({type:'INCREMENT', number})
3)	store.subscribe(render)
## 3 applyMiddleware()
作用：应用上基于redux的中间件(插件库)
## 4. combineReducers()
作用：合并多个reducer函数
