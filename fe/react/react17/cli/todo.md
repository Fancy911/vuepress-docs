---
title: 实现一个TodoList
date: 2023/02/20
categories:
 - 前端
tags:
 - react
 - Todo
---

## 1. 将TodoList的静态页面写好
```bash
├── public
├── src
│    ├── componets
│    │     ├── Header
│    │     │     ├── index.jsx
│    │     │     └── index.css
│    │     ├── List
│    │     │     ├── index.jsx
│    │     │     └── index.css
│    │     ├── Item
│    │     │     ├── index.jsx
│    │     │     └── index.css
│    │     └── Footer
│    │     │     ├── index.jsx
│    │     │     └── index.css
│    ├── App.css
│    ├── App.jsx
│    └── index.js
```
::: warning
注意，react中，所有的`class`类名都要用`className`，`style`样式都要用`style={{}}`。
:::

## 2. 动态组件
1. 动态数据初始化
2. `Header组件`添加数据到`List组件`（通过`Header`给`父组件App`传递数据实现：`App`里传一个函数给`Header`，在`Header`里调用这个函数，实现子传父一个`todoObj`）
3. 给`Item组件`添加鼠标的移入移出事件，移入则显示删除按钮，移出则隐藏删除按钮
4. 给`Item组件`改变数据的状态（通过`Item`给`父组件List`传递数据实现：`List`里传一个函数给`Item`，在`Item`里调用这个函数，实现子传父一个`id`，然后再由`List子`传给`App父`，实现数据的改变）
5. 给`Footer组件`添加全选和全不选的功能（通过`Footer`给`父组件App`传递数据实现：`App`里传一个函数给`Footer`，在`Footer`里调用这个函数）
6. 给`Footer`组件添加清除已完成的功能（通过`Footer`给父组件App传递数据实现：App里传一个函数给`Footer`，在`Footer`里调用这个函数）

::: warning
- 动态初始化列表，如何确定将数据放在哪个组件的`state`中？
    - 某个组件使用：放在其自身的`state`中
    - 某些组件使用：放在他们共同的父组件`state`中（官方称此操作为：状态提升）
- 关于父子之间通信：
    1. 【父组件】给【子组件】传递数据：通过props传递
    2. 【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
- 注意`defaultChecked` 和 `checked`的区别，类似的还有：`defaultValue` 和 `value`
    - `defaultChecked`：默认选中,只在第一次渲染时生效
    - `checked`：选中状态，可以随时改变
- 状态在哪里，操作状态的方法就在哪里
:::

## 完整项目地址

[Github-React-TodoList](https://github.com/Fancy911/React-Learning-Demo-ALL/tree/main/React-todo-demo)