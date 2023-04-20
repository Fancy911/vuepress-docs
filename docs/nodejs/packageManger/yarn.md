---
title: Yarn
date: 2023/04/20
categories:
 - 后端
tags:
 - 包管理工具
 - yarn
---

## 1.简介
yarn 是由 Facebook 在 2016 年推出的新的 Javascript 包管理工具，官方网址: [https://yarnpkg.com/](https://yarnpkg.com/)

## 2.特点

`yarn`官方宣称的一些特点
- 速度超快: `yarn`缓存了每个下载过的包，所以再次使用时无需重复下载。同时利用并行下载以最大化资源利用率，因此安装速度更快。
- 超级安全: 在执行代码之前，`yarn`会通过算法校验每个安装包的完整性。
- 超级可靠: 使用详细、简洁的锁文件格式和明确的安装算法，`yarn`能够保证在不同系统上无差异的工作。

## 3.安装

我们可以使用 `npm` 安装 `yarn`
```bash
npm i -g yarn
```

## 4.使用

| 命令 | 说明 |
| --- | --- |
| `yarn init` | 初始化项目 |
| `yarn add <package>` 安装包(生产依赖) <br /> <br /> `yarn add <package> --dev` 安装开发依赖包 <br /> <br />  `yarn global add <package>` 安装全局包 | 安装包 |
| `yarn remove <package>` 删除包(生产依赖) <br /> <br /> `yarn remove <package> --dev` 删除开发依赖包 <br /> <br />  `yarn global remove <package>` 删除全局包 | 删除包 |
| `yarn` | 安装项目依赖 |
| `yarn <别名>` | 运行命令别名，与`npm`相比，`yarn`不需要添加`run` |

::: warning
如果使用 `yarn` 全局安装包时不可用，可以通过`yarn global bin`来查看全局安装包的位置，并配到环境变量里
:::

## 5.配置淘宝镜像

可以通过如下命令配置淘宝镜像
```bash
yarn config set registry https://registry.npmmirror.com/
```
可以通过 `yarn config list` 查看 `yarn `的配置项

## 6.如何选择`npm`与`yarn`

大家可以根据不同的场景进行选择
1. 个人项目
    - 如果是个人项目，**哪个工具都可以** ，可以根据自己的喜好来选择
2. 公司项目
    - 如果是公司要根据项目代码来选择，可以**通过锁文件**判断项目的包管理工具
        - npm的锁文件为`package-lock.json`
        - yarn的锁文件为`yarn.lock`

::: warning
包管理工具不要混着用，切记，切记，切记
:::