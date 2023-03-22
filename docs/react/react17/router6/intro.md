---
title: 概述
date: 2023/03/18
categories:
 - 前端
tags:
 - react
 - react-router6
---

1. React Router 以三个不同的包发布到 npm 上，它们分别为：
    1. react-router: 路由的核心库，提供了很多的：组件、钩子。
    2. <strong style="color:#dd4d40">**react-router-dom:**</strong> <strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
    3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。
---
2. 与React Router 5.x 版本相比，改变了什么？

    1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。
    2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。
    3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。
    4. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>
    ......