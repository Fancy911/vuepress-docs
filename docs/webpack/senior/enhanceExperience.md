---
title: 提升开发体验
date: 2023/01/21
categories:
 - 前端
tags:
 - webpack
---
## SourceMap

### 为什么

开发时我们运行的代码是经过 webpack(开发环境) 编译后的，例如下面这个样子：

```js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".box2 {\\n  width: 100px;\\n  height: 100px;\\n  background-color: deeppink;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),
// 其他省略
```

所有 css 和 js 合并成了一个文件，并且多了其他代码。此时如果代码运行出错那么提示代码错误位置我们是看不懂的。一旦将来开发代码文件很多，那么很难去发现错误出现在哪里。

比如，当我们把`sum.js`写错一下

```js{2}
export default function sum(...args) {
  return args.reduce((p, c) => p + c, 0)();
}
```
此时看它的console控制台报错信息
<img :src="$withBase('/imgs/senior/只报编译后的文件错误处.png')" alt="只报编译后的文件错误处">
然后点进去看`Sources`里的`main.js`的报错信息，报的是非常不具体的，而且是在编译后的文件里报的错误，对开发者非常的不友好。
<img :src="$withBase('/imgs/senior/报错.png')" alt="console报错信息">

所以我们需要更加准确的错误提示，来帮助我们更好的开发代码。

### 是什么

SourceMap（源代码映射）：是一个用来生成**源代码**与**构建后代码**一一映射的文件的方案。

它会生成一个 `xxx.map` 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 `xxx.map` 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。 

### 怎么用

通过查看[Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/)可知，SourceMap 的值有很多种情况.

但实际开发时我们只需要关注两种情况即可：

- 开发模式：`cheap-module-source-map`

  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射

```js{4}
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

- 生产模式：`source-map`
  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢

```js{4}
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```
::: warning
改了配置之后要重启服务才可以生效
:::

- 开发环境（只报了行错误）
<img :src="$withBase('/imgs/senior/错误位置.png')" alt="错误位置">
<img :src="$withBase('/imgs/senior/行.png')" alt="错误位置">

- 生产环境（行和列错误都报，同时也能看到`/dist/static/js`下生成了一个`main.js.map`文件）
<img :src="$withBase('/imgs/senior/列.png')" alt="错误位置">
