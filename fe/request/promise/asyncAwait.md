---
title: async 与 await
date: 2023/02/26
categories:
 - 前端
 - 经典面试题
tags:
 - async await
 - promise
---

## mdn 文档
- [async_function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

## `async`函数
1. 函数的返回值为`promise`对象
```js
async function fn() {
    return 1;
}
let p = fn();

console.log(p); // Promise { 1 } , 可知，p是一个 promise 对象
```

2. `promise`对象的结果由`async函数`执行的返回值决定（这一点和`then()`的返回结果的规律是一模一样的）
    - 如果返回的是一个`promise`对象, 结果就是这个`promise`对象的结果，状态也是这个`promise`对象的状态
    ```js
    async function fn() {
        return new Promise((resolve, reject) => {
            resolve('OK');
        });
    }

    let p = fn();

    console.log(p); 
    // 输出结果：
    // Promise { 
    //     fulfilled,
    //     'OK'
    // }
    ```
    - 如果返回的是一个`非Promise`类型的数据, 结果就是一个成功的`Promise`对象，且结果就是这个数据 
    ```js
    async function fn() {
        return 1;
    }

    let p = fn();

    console.log(p); 
    // 输出结果
    // Promise { 
    //     fulfilled,
    //     1
    // }
    ```

    - 如果抛出异常, 结果就是一个失败的`Promise`对象, 且结果就是抛出的异常
    ```js
    async function fn() {
        throw new Error('出错了');
    }

    let p = fn();

    console.log(p);
    // 输出结果
    // Promise {
    //     rejected,
    //     出错了
    // }
    ```

## `await`表达式
`await`右侧的表达式一般为`promise`对象, 但也可以是其它的值

1. 如果表达式是`promise`对象, `await`返回的是`promise`成功的值
2. 如果表达式是其它值, 直接将此值作为`await`的返回值

## 注意
1. `await`**必须**写在`async`函数中, 但`async`函数中可以没有`await`。
2. 如果`await`的`promise`失败了, 就会抛出异常, 需要通过 `try...catch` 捕获处理
- 示例1:
```js
await 1; // 报错，直接这样写是不行的
```

- 示例2:
```js
async function fn() {
    // 1. await右侧是一个promise对象的情况
    // 则这个await表达式的返回值就是promise成功的值
    let p = new Promise((resolve, reject) => {
        resolve('OK');
    })

    let result = await p;
    console.log(result); // OK

    // 2. await右侧是一个失败的状态的promise对象的情况
    // 需要通过try...catch捕获处理，否则会报错
    let p2 = new Promise((resolve, reject) => {
        reject('No');
    })
    
    try{
        let result1 = await p2;
    }catch(e) {
        console.log(e); // No
    }

    // 3. 如果await右侧不是promise对象, 则直接将此值作为await的返回值
    let result2 = await 521;
    console.log(result2); // 521
}
```

## `async`与`await`结合使用

### 读取文件小需求

实现一个小需求场景，读取resource文件夹⬇下
- 1.html
- 2.html
- 3.html

这三个文件的文件内容，读取完之后做一个拼接

#### 原生`fs`读取实现

```js
const fs = require('fs');

fs.readFile('./resource/1.html', (err, data1) => {
    if (err) throw err;
    fs.readFile('./resource/2.html', (err, data2) => {
        if (err) throw err;
        fs.readFile('./resource/3.html', (err, data3) => {
            if (err) throw err;
            // 连接这三个文件
            console.log(data1 + data2 + data3);
        }
    }
})
```

#### `async`与`await`的实现形式
```js
const fs = require('fs');
const util = require('util');
// 这个util中的promisify方法可以将文件转化为一个Promise对象
const mineReadFile = util.promisify(fs.readFile);

async function main() {
    try {
        let data1 = await mineReadFile('./resource/1.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log( data1 + data2 + data3);
    } catch(e) {
        console.log(e);
    }
}
```
对比很鲜明，`async`和`await`这种方式，根本看不到回调函数，非常简洁，方便的多。

但它内部的执行其实是异步的。

### `async`和`await`实现`ajax`请求
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>async与await结合发送AJAX</title>
</head>
<body>
    <button id="btn">点击获取图片</button>
    <script>
        //axios
        function sendAJAX(url){
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.open("GET", url);
                xhr.send();
                //处理结果
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        //判断成功
                        if(xhr.status >= 200 && xhr.status < 300){
                            //成功的结果
                            resolve(xhr.response);
                        }else{
                            reject(xhr.status);
                        }
                    }
                }
            });
        }

        //图片接口地址 https://api.apiopen.top/api/getImages
        let btn = document.querySelector('#btn');

        btn.addEventListener('click',async function(){
            //获取段子信息
            let imgs = await sendAJAX('https://api.apiopen.top/api/getImages');
            console.log(imgs);
        });
    </script>
</body>
</html>
```
