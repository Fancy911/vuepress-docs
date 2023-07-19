---
title: 知识拓展—Fetch
date: 2023/03/07
categories:
 - 前端
tags:
 - react
 - fetch
 - axios
 - 发布订阅
---

`Fetch`被称为下一代`Ajax`技术，·采用`Promise`方式来处理数据。

- [Github官方文档](https://github.github.io/fetch/)
- [思否博客介绍](https://segmentfault.com/a/1190000003810652)

## `Fetch`的优势

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

## `Fetch`的基本使用

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

## `Fetch`的缺陷

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

## 实战举例

### 发送delete请求
```js
fetch('http://localhost:1337/api/students/3',{
    method:'delete'
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
```

### 发送post请求：
```js
fetch('http://localhost:1337/api/students', {
    method: 'post',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        data: {
            name: '沙和尚',
            age: 38,
            gender: '男',
            address: '流沙河'
        }
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
```

### 发送put请求
```js
fetch('http://localhost:1337/api/students/5', {
    method: 'put',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        data: {
            age: 48,
        }
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
```