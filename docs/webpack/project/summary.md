---
title: 总结
date: 2023/01/28
categories:
 - 前端
tags:
 - webpack
 - 脚手架
---

本章节我们学习到了：

1. 如何搭建 `React-Cli` 和 `Vue-Cli`。

2. 如何对脚手架进行优化。

3. 未来随着项目越来越大，还可以在优化的方案。

问题：我们前面讲的优化配置，并没有全部用上，比如多进程打包、Prefetch Preload、PWA等

- 多进程打包：
    - 项目较小时，没必要用，开销还会加大，导致打包速度变慢
- Prefetch Preload 和 PWA
    - 兼容性较差，一开始没有采用
    - 这几个技术我们可以根据不同的用户群来进行选择使用，看看主要针对的是什么浏览器。
