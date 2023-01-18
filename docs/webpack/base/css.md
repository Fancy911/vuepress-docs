---
title: 处理样式资源
date: 2023/01/15
categories:
 - 前端
tags:
 - webpack
---

本章节我们学习使用 Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源

## 介绍

Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源
如果未安装css loader等，直接引入css文件进行打包，会报错。
<img :src="$withBase('/imgs/base/csserror.png')" alt="css打包报错" width="80%">

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用

官方文档找不到的话，可以从社区 Github 中搜索查询

[Webpack 官方 Loader 文档](https://webpack.docschina.org/loaders/)

## 处理 Css 资源

### 1. 下载包

```:no-line-numbers
npm i css-loader style-loader -D
```

注意：需要下载两个 loader

### 2. 功能介绍

- `css-loader`：负责将 Css 文件编译成 Webpack 能识别的模块
- `style-loader`：会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容

此时样式就会以 Style 标签的形式在页面上生效

### 3. 配置

```js{11-21}
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      // loader的配置
      {
          // 匹配以.css结尾的文件
          test: /\.css$/,  
          // 使用哪些loader进行处理
          // 执行顺序：从右到左，从下到上
          use: [
              "style-loader", // 将js中css通过创建style标签，将js中的样式资源插入进行，添加到head中生效
              "css-loader", // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          ],
      },  
    ],
  },
  plugins: [],
  mode: "development",
};
```

### 4. 添加 Css 资源

- src/css/index.css

```css
.box1 {
  width: 100px;
  height: 100px;
  background-color: pink;
}
```

- src/main.js

```js{3-4}
import count from "./js/count";
import sum from "./js/sum";
// 引入 Css 资源，Webpack才会对其打包
import "./css/index.css";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

配置好`webpack.config.js`之后，运行`npx webpack`进行打包。会发现`dist`中没有打包后的`css文件`，因为`css`打包到`js文件`里面了。

此时，在浏览器中运行`index.html`代码，会发现已经动态创建了一个`<style>`标签。
<img :src="$withBase('/imgs/base/stylehead.png')" alt="head" width="60%">

- public/index.html

为了更好的显示这个`style`，在`index.html`中创建一个dom容器`box1`

```html{12-13}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5</title>
  </head>
  <body>
    <h1>Hello Webpack5</h1>
    <!-- 准备一个使用样式的 DOM 容器 -->
    <div class="box1"></div>
    <!-- 引入打包后的js文件，才能看到效果 -->
    <script src="../dist/main.js"></script>
  </body>
</html>
```

### 5. 运行指令

```:no-line-numbers
npx webpack
```

打开 index.html 页面查看效果
<img :src="$withBase('/imgs/base/box1.png')" alt="css页面效果" width="50%">

## 处理 Less 资源

### 1. 下载包

```:no-line-numbers
npm install less less-loader --save-dev
```

### 2. 功能介绍

- `less-loader`：负责将 Less 文件编译成 Css 文件

### 3. 配置

```js{15-24}
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ],
      },
      {
        test: /\.less$/,
        // loader: xxx, (不能使用loader，因为loader:只能使用一个loader)
        use: [  // use: 可以使用多个loader
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader', // 将less文件编译成css文件
        ],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

### 4. 添加 Less 资源

- src/less/index.less

```css
.box2 {
  width: 100px;
  height: 100px;
  background-color: deeppink;
}
```

- src/main.js

```js{5}
import count from "./js/count";
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/index.css";
import "./less/index.less";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

- public/index.html

```html{12}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5</title>
  </head>
  <body>
    <h1>Hello Webpack5</h1>
    <div class="box1"></div>
    <div class="box2"></div>
    <script src="../dist/main.js"></script>
  </body>
</html>
```

### 5. 运行指令

```:no-line-numbers
npx webpack
```

打开 index.html 页面查看效果

## 处理 Sass 和 Scss 资源

### 1. 下载包

```:no-line-numbers
npm i sass-loader sass -D
```

注意：需要下载两个

### 2. 功能介绍

- `sass-loader`：负责将 Sass 文件编译成 css 文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译

### 3. 配置

```js{21-24}
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

### 4. 添加 Sass 资源

- src/sass/index.sass

```css
/* 可以省略大括号和分号 */
.box3
  width: 100px
  height: 100px
  background-color: hotpink
```

- src/sass/index.scss

```css
.box4 {
  width: 100px;
  height: 100px;
  background-color: lightpink;
}
```

- src/main.js

```js{6-7}
import count from "./js/count";
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

- public/index.html

```html{13-14}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5</title>
  </head>
  <body>
    <h1>Hello Webpack5</h1>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <script src="../dist/main.js"></script>
  </body>
</html>
```

### 5. 运行指令

```:no-line-numbers
npx webpack
```

打开 index.html 页面查看效果

## 处理 Styl 资源

### 1. 下载包

```:no-line-numbers
npm install stylus stylus-loader --save-dev
```

### 2. 功能介绍

- `stylus-loader`：负责将 Styl 文件编译成 Css 文件

### 3. 配置

```js{25-32}
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader", 
          "css-loader", 
          "stylus-loader", //负责将 Styl 文件编译成 Css 文件
        ],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

### 4. 添加 Styl 资源

- src/styl/index.styl

```css
/* 可以省略大括号、分号、冒号 */
.box 
  width 100px 
  height 100px 
  background-color pink
```

- src/main.js

```js{9}
import { add } from "./math";
import count from "./js/count";
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./styl/index.styl";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

- public/index.html

```html{16}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5</title>
  </head>
  <body>
    <h1>Hello Webpack5</h1>
    <!-- 准备一个使用样式的 DOM 容器 -->
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <script src="../dist/main.js"></script>
  </body>
</html>
```

### 5. 运行指令

```:no-line-numbers
npx webpack
```

打开 index.html 页面查看效果
