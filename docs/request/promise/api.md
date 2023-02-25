---
title: Promise的API
date: 2023/02/25
categories:
 - 前端
tags:
 - promise
 - promise.all
---

## Promise构造函数: `Promise (excutor) {}`
1. `executor` 函数: 执行器 `(resolve, reject) => {}`
    - resolve 函数: 内部定义成功时我们调用的函数 value => {}
    - reject 函数: 内部定义失败时我们调用的函数 reason => {}
- 说明: `executor` 会在 `Promise` 内部**立即同步调用**,异步操作在执行器中执行
::: tip
什么是同步调用? 什么是异步调用?
- 同步调用: 在当前任务执行完毕之前, 后续任务不会被调用
- 异步调用: 在当前任务执行完毕之前, 后续任务会被调用
那么，`executor`在`Promise`内部立即同步调用，是什么意思呢？
用以下代码举例：
```js
const promise = new Promise((resolve, reject) => {
    console.log('executor()')
    resolve('ok')
})
console.log('promise')
promise.then(value => {
    console.log(value)
})
```
输出结果：
```
executor()
promise
ok
```
可以看到，`executor()`在`promise`之前执行，这就是同步调用。而`promise.then()`是异步调用，因为`promise.then()`是在`promise`之后执行的。
:::

## 2. `Promise.prototype.then` 方法: `(onResolved, onRejected) => {}`
1. `onResolved` 函数: 成功的回调函数 `(value) => {}`
2. `onRejected` 函数: 失败的回调函数 `(reason) => {}`
- 说明: 指定用于得到成功 `value` 的成功回调和用于得到失败 `reason` 的失败回调
返回一个新的 `promise` 对象

## 3. `Promise.prototype.catch` 方法: `(onRejected) => {}`
1. `onRejected` 函数: 失败的回调函数 `(reason) => {}`
- 说明: `then()`的语法糖, 相当于: `then(undefined, onRejected)`
```js
let p = new Promise((resolve, reject) => {
    reject('error');
});

//执行 catch 方法
p.catch(reason => {
    console.log(reason);
});
```

## 4. `Promise.resolve` 方法: `Promise.resolve(参数)`
- 不同于之前写的`new Promise(resolve, reject) => {})`中的`resolve`函数。`Promise.resolve` 方法可以直接返回一个成功的`Promise`对象。
    - 如果传入的参数为 非`Promise`类型的对象, 则返回的结果为成功`promise`对象
        - `Promise.resolve(521)`
    - 如果传入的参数为`Promise`对象, 则参数的结果决定了`resolve`的结果
        - `Promise.resolve(new Promise((reject, resolve) => { reject('error') }))`
```js
let p1 = Promise.resolve(521);

// 如果传入的参数为 非Promise类型的对象, 则返回的结果为成功promise对象
// 如果传入的参数为 Promise 对象, 则参数的结果决定了 resolve 的结果
// 比如下面这个示例，传入的参数是一个失败的Promise对象，所以resolve的结果也是失败的
let p2 = Promise.resolve(new Promise((resolve, reject) => {
    // resolve('OK');
    reject('Error');
}));
console.log(p2); // Promise { [[promiseState]]: "rejected" [[PromiseResult]]: Error"}

p2.catch(reason => {
    console.log(reason); // Error
})
```

## 5. `Promise.reject` 方法: `Promise.reject(参数)` 
- 与上述`Promise.resolve`的理解类似，但不同的是返回一个失败的`promise`对象。
::: warning
但是，尽管你传入的是一个成功的 Promise 对象，Promise.reject返回的也是一个失败的状态，其结果就是传入的 Promise 对象的成功结果,也就是说，你不管传啥，它都是失败的，而且你传入什么，它失败的结果就是什么。
```js
let p3 = Promise.reject(new Promise((resolve, reject) => {
    resolve('OK');
}));

console.log(p3);
```
:::

## 6. `Promise.all` 方法: `Promise.all(arr)`
1. 和前面的`resolve`和`reject`方法都是`Promise`这个类的方法，而`all`方法是`Promise`的静态方法，所以它的用法也和前面的不同
2. `all`方法**接收一个数组**作为参数，数组中的**每个元素都是一个 `Promise` 对象**。
3. 只有当数组中所有的 `Promise` 对象都成功时，`all`方法才会成功，如果数组中有一个 `Promise` 对象失败，那么`all`方法就会失败。
```js
let p1 = new Promise((resolve, reject) => {
    resolve('OK');
})
let p2 = Promise.resolve('Success');
let p3 = Promise.resolve('Oh Yeah');
let p4 = Promise.reject('Error');

// 只有p1、p2、p3都成功时，all方法才会成功，
const resultSuccess = Promise.all([p1, p2, p3]);
console.log(resultSuccess);
// Promise { 
//    promiseState: 'fulfilled',
//    promiseResult: ['OK', 'Success', 'Oh Yeah']
// } 

const resultFail = Promise.all([p2, p3, p4]);
console.log(resultFail);
// Promise { 
//    promiseState: 'rejected',
//    promiseResult: 'Error' 这里就会直接展示失败那个Promise的结果
// } 
```

## 7. `Promise.race` 方法: `(promises) => {}`
与`all`方法类似，`race`方法也是接收一个数组作为参数，数组中的每个元素都是一个 `Promise` 对象。
只要数组中有一个 `Promise` 对象成功或失败，`race`方法就会成功或失败。
```js
let p1 = new Promise((resolve, reject) => {
    resolve('OK');
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
})
let p3 = Promise.resolve('Success');
let p4 = Promise.resolve('Oh Yeah');

const resultSuccess = Promise.all([p1, p3, p4]);
console.log(resultSuccess);
// Promise { 
//    promiseState: 'fulfilled',
//    promiseResult: 'OK' 成功的状态就是第一个成功的返回的结果，就是p1这个成功的结果
// } 

const resultSuc = Promise.all([p2, p3, p4]);
console.log(resultSuccess); // 这里的结果是p3的结果，因为p3是第一个成功的，而不再是p2
// Promise { 
//    promiseState: 'fulfilled',
//    promiseResult: 'Success'
// } 
```