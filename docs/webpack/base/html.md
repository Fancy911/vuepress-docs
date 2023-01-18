---
title: 处理 Html 资源
date: 2023/01/15
categories:
 - 前端
tags:
 - webpack
---
为什么要处理`html`?

当前，我们每次打包完js资源后，都是手动引入的。
<img :src="$withBase('/imgs/base/html.png')" alt="手动引入的js资源" width="60%">

那么，如果之后打包出的js资源名不叫`main.js`或者有多个js资源文件，多个css文件，如果手动一个个把这些文件引进来，这样是很费劲的，依赖关系和目录写错了都会有问题，很麻烦。

所以我们希望，能够在`html`中，自动引入打包后的资源，这样会非常方便。

## 1. 下载包

```:no-line-numbers
npm i html-webpack-plugin -D
```
[HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/#root)

## 2. 配置

- webpack.config.js

```js{3,68-72}
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true, // 自动将上次打包目录资源清空
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
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
    new HtmlWebpackPlugin({
      // 模板：以 public/index.html 为模板创建文件（如果不写这个，打包到dist中的html文件没有我们之前在public/index.html中写的那些内容）
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  mode: "development",
};
```

## 3. 修改 index.html

去掉引入的 js 文件，因为 HtmlWebpackPlugin 会自动引入

```html
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
    <div class="box5"></div>
    <i class="iconfont icon-arrow-down"></i>
    <i class="iconfont icon-ashbin"></i>
    <i class="iconfont icon-browse"></i>
  </body>
</html>
```

## 4. 运行指令

```:no-line-numbers
npx webpack
```

此时 dist 目录就会输出一个 index.html 文件，并保留了之前我们在public/index.html中写的内容。并且自动引入了打包生成的js等资源

<img :src="$withBase('/imgs/base/html2.png')" alt="自动引入后dist/index.html" width="60%">
