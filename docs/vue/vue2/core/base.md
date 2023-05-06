---
title: 模版语法与数据绑定
date: 2023/05/05
categories:
 - 前端
tags:
 - vue2.x
---

## 1.模板语法

- 插值语法
    - 功能：用于解析标签体内容。
    - 写法：`{{xxx}}`，`xxx`是js表达式，且可以直接读取到data中的所有属性。
- 指令语法
    - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
	- 举例：`v-bind:href="xxx"` 或  简写为 `:href="xxx"`，`xxx`同样要写js表达式，且可以直接读取到`data`中的所有属性。
	- 备注：`Vue`中有很多的指令，且形式都是：`v-????`，此处我们只是拿`v-bind`举个例子。

## 2.数据绑定

- 单向绑定：`v-bind`，`{{}}`
    ```html
    <!-- 普通写法 -->
    <input type="text" v-bind:value="name"><br/>
    <!-- 简写 -->
    <input type="text" :value="name"><br/>
    ```
- 双向绑定：`v-model`
    ```html
    <!-- 普通写法 -->
    <input type="text" v-model:value="name"><br/>
    <!-- 简写 -->
    <input type="text" v-model="name"><br/>
    ```

什么时候使用双向绑定？

- 表单元素（`input`、`textarea`、`select`）：用户输入或选择的内容，最终都会赋值给`data`中的某个属性，这种情况就应该使用双向绑定。
- 其他元素：一般不使用双向绑定。