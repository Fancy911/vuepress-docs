# 基本使用

**`Webpack` 是一个静态资源打包工具。**

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器段运行了。

我们将 `Webpack` 输出的文件叫做 `bundle`。

## 功能介绍

Webpack 本身功能是有限的:

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

## 开始使用

### 1. 资源目录

```
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
    │    ├── js # js文件目录
    │    │   ├── count.js
    │    │   └── sum.js
    │    └── main.js # 项目主文件
    └── public # 公共静态资源目录
         └── index.html
```

### 2. 创建文件

- count.js

```js
export default function count(x, y) {
  return x - y;
}
```

- sum.js

```js
export default function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
```

- main.js

```js
import count from "./js/count";
import sum from "./js/sum";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack</title>
</head>
<body>
    <h1>hello webpack</h1>
    <script src="../src/main.js"></script>
</body>
</html> 
```

> 可以在Vscode中安装Live Server插件，这样在index.html中右键点击Open with Live Server则可以直接在浏览器中打开。
> ![Live Server插件](/imgs/base/liveserver.png)
> ---
>
> webpack打包编译前，控制台会报错。如下图所示：
> ![编译前控制台](/imgs/base/编译后.png)
> 

### 3. 下载依赖

打开终端，来到项目根目录。运行以下指令：

- 初始化`package.json`

```
npm init -y
```

此时会生成一个基础的 `package.json` 文件。

**需要注意的是 `package.json` 中 `name` 字段不能叫做 `webpack`, 否则下一步会报错**

- 下载依赖

```
npm i webpack webpack-cli -D
```

### 4. 启用 Webpack

- 开发模式

```
npx webpack ./src/main.js --mode=development
```

- 生产模式

```
npx webpack ./src/main.js --mode=production
```

`npx webpack`: 是用来运行本地安装 `Webpack` 包的。

`./src/main.js`: 指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js`，还会将其依赖也一起打包进来。

`--mode=xxx`：指定模式（环境）。

### 5. 观察输出文件

默认 `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了

- 开发模式下打包出的dist/main.js

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

/***/ "./src/js/count.js":
/*!*************************!*\
  !*** ./src/js/count.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ count)\n/* harmony export */ });\nfunction count(x, y) {\r\n  return x - y;\r\n}\r\n\n\n//# sourceURL=webpack://webpack_code/./src/js/count.js?");

/***/ }),

/***/ "./src/js/sum.js":
/*!***********************!*\
  !*** ./src/js/sum.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ sum)\n/* harmony export */ });\nfunction sum(...args) {\r\n  return args.reduce((p, c) => p + c, 0);\r\n}\r\n\n\n//# sourceURL=webpack://webpack_code/./src/js/sum.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_count__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/count */ \"./src/js/count.js\");\n/* harmony import */ var _js_sum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/sum */ \"./src/js/sum.js\");\n\r\n\r\n\r\nconsole.log((0,_js_count__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2, 1));\r\nconsole.log((0,_js_sum__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(1, 2, 3, 4));\r\n\n\n//# sourceURL=webpack://webpack_code/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
```

--mode=development的确编译了ES6的模块化语法，但是ES6的箭头函数，三元运算符等是没有编译的
![编译后的dist/main.js中的内容](/imgs/base/mainjs.png)
开发环境下，仅能编辑ES6的模块化语法，并不能编译其他语法

- 开发模式下打包出的dist/main.js

```js
(()=>{"use strict";console.log(1),console.log([1,2,3,4].reduce(((o,e)=>o+e),0))})();
```

可以看出这两种打包方式，打出来的main.js是有鲜明对比的。

将`index.html`中引入的`<script src="../src/main.js"></script>`，改为`<script src="../dist/main.js"></script>`，再看浏览器，则不再报错。
![编译后控制台](/imgs/base/编译后.png)

## 小结

`Webpack` 本身功能比较少，只能处理 `js` 资源，一旦遇到 `css` 等其他资源就会报错。

所以我们学习 `Webpack`，就是主要学习如何处理其他资源。
