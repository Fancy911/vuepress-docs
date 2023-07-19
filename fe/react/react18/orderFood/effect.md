---
title: useEffect副作用
date: 2023/03/29
categories:
 - 前端
tags:
 - effect
 - useEffect
 - react
---

React组件有**部分逻辑**都可以直接编写到**组件的函数体**中的，比如：
- 对数组调用`filter`、`map`等方法
- 判断某个组件是否显示等。

但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。

例如，如果直接**将修改state的逻辑**编写到了组件之中，就会导致组件**不断的循环渲染**，直至调用次数过多内存溢出。
（汉堡APP的[购物车Cart组件](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/components/Cart/index.jsx)中有说明）

## `React.StrictMode`

编写`React`组件时，我们要极力的避免组件中出现那些会产生“副作用”的代码。

同时，如果你的`React`使用了严格模式，也就是在`React`中使用了`React.StrictMode`标签，那么`React`会非常“智能”的去检查你的组件中是否写有副作用的代码，当然这个智能是加了引号的，我们来看看`React`官网的文档是如何说明的：

> Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:
> - Class component constructor, render, and shouldComponentUpdate methods
> - Class component static getDerivedStateFromProps method
> - Function component bodies
> - State updater functions (the first argument to setState)
> - Functions passed to useState, useMemo, or useReducer

上文的关键字叫做`“double-invoking”`，即**重复调用**，这句话是什么意思呢？

大概意思就是，`React`并不能自动替你发现副作用，但是它会想办法让它显现出来，从而让你发现它。

那么它是怎么让你发现副作用的呢？

`React`的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，以下函数会被调用两次:
- 类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法
- 类组件的静态方法 `getDerivedStateFromProps`
- 函数组件的函数体
- 参数为函数的`setState`
- 参数为函数的`useState`, `useMemo`, 或 `useReducer`

重复的调用会使副作用更容易凸显出来，你可以尝试着在函数组件的函数体中调用一个`console.log`你会发现它会**执行两次**，如果你的浏览器中安装了`React Developer Tools`，第二次调用会**显示为灰色**。

## 使用`Effect`——`useEffect`

为了解决这个问题React专门为我们提供了钩子函数`useEffect()`，`Effect`的翻译过来就是副作用，专门用来处理那些不能直接写在组件内部的代码。

哪些代码不能直接写在组件内部呢？像是：获取数据、记录日志、检查登录、设置定时器等。简单来说，就是那些和组件渲染无关，但却有可能对组件产生副作用的代码。

### 第一个参数-回调函数

```jsx
useEffect(didUpdate);
```

`useEffect()`需要一个函数作为参数，你可以这样写：

```jsx
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
});
```

`useEffect()`中的回调函数会在组件每次渲染完毕之后执行，这也是它和写在函数体中代码的最大的不同，函数体中的代码会在组件渲染前执行，而`useEffect()`中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染。

通过使用这个`Hook`，我设置了`React`组件在渲染后所要执行的操作。`React`会将我们传递的函数保存（我们称这个函数为`effect`），并且在DOM更新后执行调用它。`React`会确保`effect`每次运行时，DOM都已经更新完毕。

### 第二个参数-`useEffect`的依赖项数组

组件每次渲染effect都会执行，这似乎并不总那么必要。因此在`useEffect()`中我们可以限制`effect`的执行时机，在`useEffect()`中可以**将一个数组作为第二个参数传递**，像是这样：

```jsx
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
}, [a, b]);
```
上例中，数组中有两个变量`a`和`b`，设置以后`effect`只有在变量`a`或`b`发生变化时才会执行。这样即可限制`effect`的执行次数。

也可以直接传递一个空数组，如果依赖项是一个空数组`[]`，那么`effect`只会执行一次。


### 清除`Effect`——`useEffect`的返回值

组件的每次重新渲染`effect`都会执行，有一些情况里，两次`effect`执行会互相影响。

比如，在`effect`中设置了一个定时器，总不能每次`effect`执行都设置一个新的定时器，所以我们需要在一个`effect`执行前，清除掉前一个`effect`所带来的影响。

要实现这个功能，可以在`effect`中将一个函数作为返回值返回，像是这样：

```jsx
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
    
    return () => {
        /* 这个函数会在下一次effect执行钱调用 */
    };
});
```

`effect`返回的函数，会在下一次`effect`执行前调用，我们可以在这个函数中清除掉前一次`effect`执行所带来的影响。

## 使用Effect实现的APP的代码页面展示

- [Cart购物车组件](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/components/Cart/index.jsx)
- [Filter搜索框组件](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/components/Filter/index.jsx)