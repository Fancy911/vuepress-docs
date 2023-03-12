---
title: 路由的相关理解
date: 2023/03/08
categories:
 - 前端
 - 经典面试题
tags:
 - react
 - 路由
 - spa
 - history对象
---

## SPA是什么？

1. SPA：`Single Page Application`，单页面应用。
2. 整个应用只有一个完整的页面。
3. 点击页面中的链接不会刷新页面，只会做页面的局部更新。
4. 数据都需要通过`ajax`请求获取, 并在前端异步展现。

单页面，但可以多个组件，组件之间的切换就是路由的作用。
## 什么是路由？

1. 一个路由就是一个映射关系`(key:value)`
2. `key`为路径, `value`可能是`function（后端路由）`或`component（前端路由）`

## 路由分类

###	后端路由

- 理解： `value`是`function`, 用来处理客户端提交的请求。
- 注册路由： 
    ```js
    router.get(path, function(req, res))
    ```
- 工作过程：当`node`接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
### 前端路由

- 浏览器端路由，`value`是`component`，用于展示页面内容。
- 注册路由: 
    ```js
    <Route path="/test" component={Test}>
    ```
- 工作过程：当浏览器的`path`变为`/test`时, 当前路由组件就会变为`Test`组件

## 前端路由的基石-`histroy`

> JS由DOM、BOM、ECMAScript组成
> `history`就是BOM中的一个对象，用来管理浏览器的历史记录，提供了一些操作历史记录的方法。

`History`对象保存了当前窗口访问过的所有页面网址。

`History`的结构是一个**栈**结构，最新访问的网址在栈顶，最早访问的网址在栈底。
### 1.`History`对象的常用属性

- `window.history.length`：当前窗口访问过的网址数量（包括当前网页）
- `window.history.state`：`History`堆栈最上层的状态值（详见下文）
```js
// 当前窗口访问过多少个网页
window.history.length // 1
 
// History 对象的当前状态
// 通常是 undefined，即未设置
window.history.state // undefined
```
### 2.`History`对象的常用方法

- `back()`：移动到上一个网址，等同于点击浏览器的后退键。（对于第一个访问的网址，该方法无效果）
- `forward()`：移动到下一个网址，等同于点击浏览器的前进键。（对于最后一个访问的网址，该方法无效果）
- `go()`：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址.
    - 比如`go(1)`相当于`forward()`
    - `go(-1)`相当于`back()`。
    - 如果参数超过实际存在的网址范围，该方法无效果；
    - 如果不指定参数，默认参数为`0`，相当于刷新当前页面。
- `push()`: 添加一个新的历史记录
- `replace()`: 替换当前的历史记录

```js
history.back(); // 后退
history.forward(); // 前进
history.go(-2); // 回退两个页面
history.go(0); // 刷新当前页面

history.push(url); // 添加一个新的历史记录
history.replace(url); // 替换当前的历史记录

history.listen((location, action) => {
  // location 是一个类似 window.location 的对象
  console.log(action, location.pathname, location.state)
})
```
其它方法：详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History)
### 两种History模式
#### 1. `hash`模式

这种方式其实本质是**锚点**的变化，不需要后端配合。

- `hash`模式是`URL`中的`#`后面的内容，如`http://localhost:3000/#/test`中的`#/test`就是`hash`。
- `hash`模式不会向服务器发送请求，只会在`URL`中添加`#`后面的内容。
- `hash`模式的`URL`中的`#`后面的内容称为`hash`，`hash`的变化不会引起页面的刷新。
- `#`后面的内容被认为是`hash`（前台资源），不会作为资源发送给后端服务器。

#### 2. `history`模式

这种方式是`HTML5`新增的`API`，需要后端配合。

- `history`模式是`URL`中的`/`后面的内容，如`http://localhost:3000/test`中的`/test`就是`history`。
- `history`模式会向服务器发送请求，会向服务器发送请求，服务器会根据请求的`URL`返回对应的页面。
- `history`模式的`URL`中的`/`后面的内容称为`path`，`path`的变化会引起页面的刷新。