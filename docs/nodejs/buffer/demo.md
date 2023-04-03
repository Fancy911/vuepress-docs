---
title: Buffer示例
date: 2023/04/03
categories:
 - 前端
 - 后端
tags:
 - buffer
---

## 创建buffer

`Buffer.` 是不需要导入就可以直接使用的，是个全局变量

### 1.`Buffer.alloc`

```js
// 创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为0
let buf_1 = Buffer.alloc(10); 
console.log(buf_1) // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
```
- 用`alloc`这种方式创建的`Buffer`，每一个二进制位都会**归零**。
   
### 2.`Buffer.allocUnsafe`
```js
// 创建了一个长度为 10 字节的 Buffer
let buf_2 = Buffer.allocUnsafe(10);
console.log(buf_2) // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
```
- 为什么叫`unsafe`呢？因为，`buffer`中可能存在旧的数据, 没有像`alloc`创建出来的`buffer`一样会全都归零，可能会影响执行结果，所以叫`unsafe`

### 3.`Buffer.from`
  
```js
// 通过字符串创建 Buffer, 会将hello这个字符串转换成 二进制的buffer
let buf_3 = Buffer.from('hello');
console.log(buf_3); // 结果是 <Buffer 68 65 6c 6c 6f>

// 通过数组创建 Buffer
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4); // 结果是 <Buffer 69 6c 6f 76 65 79 6f 75>
```
 
## Buffer操作

### 1.`Buffer`与字符串的转化

我们可以借助 `toString()` 方法将`Buffer`转为字符串

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString()); // iloveyou
```

::: tip
`toString()`默认是按照 `utf-8` 编码方式进行转换的。
:::

### 2.`Buffer`的读写

`Buffer` 可以直接通过 `[]` 的方式对数据进行处理。

```js
let buf_3 = Buffer.from('hello');

// 读取
console.log(buf_3[0]); // 104, 此时是10进制的表示方式
console.log(buf_3[0].toString(2)); // 01101000，使用toString(2)，进行数字的进制转换，转为2进制

// 修改
buf_3[0] = 95; // 改成了95对应的Ascii码表中的字符串，变成了_

// 查看字符串结果
console.log(buf_3.toString()); // _ello
```

::: tip
注意:
1. 如果修改的数值超过 **255** ，则超过8位数据(2进制时的8位数)会被舍弃(舍弃的是高位) 
```js
buf[0] = 361; 
// 361 的 二进制是： 0001 0110 1001 ，它就会被舍弃成 ——> 0110 1001
```
2. 一个`utf-8`的字符 一般 占3个字节，比如“你好”，输出成`buffer`，就会占6个字节
:::