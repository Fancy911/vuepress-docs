---
title: 模块暴露数据的两种方式
date: 2023/04/19
categories:
 - 后端
tags:
 - 模块化
 - exports
 - module.exports
---

模块暴露数据的方式有两种:

1. `module.exports = value`
2. `exports.属性名 = value`

::: tip
`module.exports` 和 `exports` 的区别:
1. `module.exports` 是真正的暴露对象，`exports` 只是 `module.exports` 的一个引用，但`module.exports` 和 `exports` 指向的是同一个对象。
    - `module.exports` 可以暴露任意类型的数据，`exports` 只能暴露对象
    - `exports` 只能通过 `.` 操作符来添加属性，`module.exports` 可以直接赋值
    ```js
    // exports 暴露数据 ✅
    exports.sing = sing;
    exports.dance = dance;

    // 不能使用 `exports = value`的形式暴露数据
    // exports = 'iloveyou' // ❌

    // module.exports 暴露数据 ✅
    module.exports = {
        sing,
        dance
    };
    
    // module.exports 可以暴露`任意`数据 以下这些都🉑️
    module.exports = 'iloveyou';
    module.exports = 521;
    ```
   
2. 从代码层面来说，模块内部 module 与 exports 的隐式关系是这样的:`exports = module.exports = {}`
    ```js
    console.log(module.exports === exports); // true
    ```
:::