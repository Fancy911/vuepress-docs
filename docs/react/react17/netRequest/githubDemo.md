---
title: Github用户搜索案例
date: 2023/03/07
categories:
 - 前端
tags:
 - react
 - fetch
 - axios
 - 发布订阅
---

## 需求概览

实现一个如下图所示的搜索页面，输入关键字后，点击搜索按钮，可以显示所有相关用户。

<img src="./imgs/github项目.png" width="80%">

## 消息订阅与发布

什么是消息订阅与发布？

- 消息订阅：订阅者订阅消息
- 消息发布：发布者发布消息
- 消息订阅与发布：订阅者订阅消息，发布者发布消息，订阅者收到消息

在我们的项目中，就是List（下面展示用户列表区）订阅消息，Search（搜索区）发布消息。

[插件：`pubsub-js`](https://github.com/mroderick/PubSubJS)

1. 工具库: `PubSubJS`
2. 下载: `npm install pubsub-js --save`
3. 使用: 
    - `import PubSub from 'pubsub-js' //引入`
    - `PubSub.subscribe('msg', function(data){ }); //订阅`
    - `PubSub.publish('msg', data) //发布消息`

## 知识补充-`Fetch`

`Fetch`被称为下一代`Ajax`技术，·采用`Promise`方式来处理数据。

- [Github官方文档](https://github.github.io/fetch/)
- [思否博客介绍](https://segmentfault.com/a/1190000003810652)

### `Fetch`的优势

页面中需要向服务器请求数据时，基本上都会使用`Ajax`来实现。

`Ajax`的本质是使用`XMLHttpRequest`对象来请求数据，而`XMLHttpRequest`对象是通过事件的模式来实现返回数据的处理。

与`XMLHttpRequest`类似，`Fetch`允许你发出`AJAX`请求。区别在于`Fetch API`使用`Promise`方式，`Promise`是已经正式发布的`ES6`的内容之一，因此是一种简洁明了的`API`，比`XMLHttpRequest`更加简单易用。

::: tip
如果有人问你，不用`xhr`，还可以用什么方式发送`ajax`请求，你可以说：可以用`fetch`

`fetch`与`jquery`和`axios`的区别：
- `fetch`是原生的，不需要引入任何库
- 而`jquery`和`axios`都是第三方库，需要引入

可以简单理解，`fetch`是原生的，与`xhr`地位相当的，而`jquery`和`axios`是第三方库，是对`xhr`的封装
:::

### `Fetch`的基本使用

```js
// get请求
fetch(url).then( (response) => {
    return response.json()
})
.then(function(data) {
    console.log(data)
})
.catch(function(e) {
    console.log(e)
});

// post请求
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(res => res.json())
.catch(error => console.error('Error:', error))
```

### `Fetch`的缺陷

1. `Fetch`默认不会携带`cookie`，需要设置`credentials: 'include'`
2. `Fetch`默认不会携带`Content-Type`，需要设置`headers: {'Content-Type': 'application/json'}`
3. `Fetch`默认不会携带`Accept`，需要设置`headers: {'Accept': 'application/json'}`
4. `Fetch`默认不会携带`X-Requested-With`，需要设置`headers: {'X-Requested-With': 'XMLHttpRequest'}`
5. `Fetch`默认不会携带`Authorization`，需要设置`headers: {'Authorization': 'Bearer ' + token}`
6. `Fetch`默认不会携带`X-CSRF-TOKEN`，需要设置`headers: {'X-CSRF-TOKEN': csrfToken}`

`Fetch` 还不是 `W3C` 规范，因此原生支持率并不高。
幸运的是，引入下面这些 `polyfill` 后可以完美支持 `IE8+` ：
1. 由于 `IE8` 是 `ES3`，需要引入 `ES5`的 `polyfill`: `es5-shim, es5-sham`
2. 引入`Promise`的 `polyfill`: `es6-promise`
3. 引入`fetch`探测库：`fetch-detector`
4. 引入`fetch`的 `polyfill`: `fetch-ie8`
5. 可选：如果你还使用了 `jsonp`，引入 `fetch-jsonp`
6. 可选：开启 `Babel` 的 `runtime` 模式，使用 `async/await`

## 总结该项目
1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。
2. ES6小知识点：解构赋值+重命名
    ```js
    let obj = {a:{b:1}}
    const {a} = obj; //传统解构赋值
    const {a:{b}} = obj; //连续解构赋值
    const {a:{b:value}} = obj; //连续解构赋值+重命名
    ```
3. 消息订阅与发布机制
    1.先订阅，再发布（理解：有一种隔空对话的感觉）
    2.适用于任意组件间通信
    3.要在组件的`componentWillUnmount`中取消订阅
4. `fetch`发送请求（关注分离的设计思想）
```js
try {
    const response= await fetch(`/api1/search/users2?q=${keyWord}`)
    const data = await response.json()
    console.log(data);
} catch (error) {
    console.log('请求出错',error);
}
```

[完整项目:react-github-usersearch-demo](https://github.com/Fancy911/React-Learning-Demo-ALL/tree/main/ReactCli-GithubUserSearch)