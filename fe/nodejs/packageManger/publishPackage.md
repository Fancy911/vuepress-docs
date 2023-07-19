---
title: 发布自己的npm包
date: 2023/04/20
categories:
 - 后端
tags:
 - 包管理工具
 - npm
---

## 1.创建与发布

我们可以将自己开发的工具包发布到 **npm服务** 上，方便自己和其他开发者使用，操作步骤如下:
1. 创建文件夹，并创建文件`index.js`，在文件中声明函数，使用`module.exports`暴露函数，`index.js`内容示例:
```js
function add(a,b){
    return a+b;
}
module.exports = add;
```
2. `npm`初始化工具包，`package.json`填写包的信息(包的名字是唯一的)
```bash
npm init
```
3. 注册`npm`账号[https://www.npmjs.com/signup](https://www.npmjs.com/signup)
4. 激活账号(<span style="color:red">一定要激活账号</span>)
5. 修改为官方的官方镜像 (命令行中运行 `nrm use npm` )
6. 命令行下`npm login`填写相关用户信息
7. 命令行下`npm publish`提交包

## 2.更新包

后续可以对自己发布的包进行更新，操作步骤如下：
1. 更新包中的代码
2. 测试代码是否可用
3. 修改 `package.json` 中的版本号 
4. 发布更新: `npm publish`

## 3.删除已发布的包

执行如下命令删除包
```bash
npm unpublish --force
```
::: tip
删除包需要满足一定的条件，[https://docs.npmjs.com/policies/unpublish](https://docs.npmjs.com/policies/unpublish)
- 你是包的作者
- 发布小于 24 小时
- 大于 24 小时后，没有其他包依赖，并且每周小于 300 下载量，并且只有一个维护者
:::