---
title: 使用Webpack打包Ts代码
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - webpack
---

在实际开发中，我们往往不只是用`tsconfig.json`来进行编译配置，还需要使用**构建工具**对代码进行打包，TS同样也可以结合构建工具一起使用。

下边以`webpack`为例介绍一下如何结合构建工具使用TS。

## webpack+Ts项目搭建步骤
### 1.初始化项目
创建package.json文件
- 进入项目根目录，执行命令 ```npm init -y```

### 2.下载构建工具

```shell
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin
```
共安装了7个包
- webpack: 构建工具webpack
- webpack-cli: webpack的命令行工具
- webpack-dev-server: webpack的开发服务器
- typescript: ts编译器
- ts-loader: ts加载器，用于在webpack中编译ts文件
- html-webpack-plugin: webpack中的html插件，用于生成html文件
- clean-webpack-plugin: webpack中的清除插件，每次构建都会先清除目录

### 3. 根目录下创建`webpack`的配置文件`webpack.config.js`

```javascript
const path = require('path'); // 引入path模块
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin：用来打包html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入clean-webpack-plugin：用来清除dist目录

module.exports = {
  optimization:{
    minimize: false // 关闭代码压缩，可选
  },
  entry: "./src/index.ts", // 指定入口文件
  devtool: "inline-source-map", // 用来设置调试模式，这里是内联模式，还有其他模式：https://www.webpackjs.com/configuration/devtool/
  devServer: { // 用来设置webpack-dev-server
    contentBase: './dist' // 指定托管的根目录
  },
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: "bundle.js",
  },
  // 用来设置引入模块时的文件后缀名
  resolve: {
    extensions: [".ts", ".js"]
  },
  // 指定打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件：通过这个正则来匹配文件
        test: /\.ts$/,
        // 要使用的loader
        use: {
          loader: "ts-loader"     
        },
        exclude: /node_modules/ // 排除node_modules目录
      }
    ]
  },
  // 配置Webpack插件
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前清除dist目录
    new HtmlWebpackPlugin({
      // 用来打包html文件
      // title: "这是一个自定义的title"
      template: "./src/index.html" // 指定模板文件
    }),
  ]
}
```
### 4.配置Ts编译规范：根目录下创建tsconfig.json，配置可以根据自己需要

```json
{
  "compilerOptions": {
    "target": "ES2015", // 指定编译后的代码版本：es2015就是es6
    "module": "ES2015", // 指定编译后的模块化方案
    "strict": true // 开启严格模式
  }
}
```
### 5.修改package.json添加如下配置

```json
{
  ...略...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open chrome.exe" // 启动开发服务器，能够实时监控代码变化
  },
  ...略...
}
```

### 6. `npm run build`打包编译

在src下创建ts文件，并在并命令行执行`npm run build`对代码进行编译，或者执行`npm start`来启动开发服务器

## 5、Babel-兼容性处理（预设配置）

经过一系列的配置，使得TS和webpack已经结合到了一起。

除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

### 1. 安装依赖包
```shell
npm i -D @babel/core @babel/preset-env babel-loader core-js
```
共安装了4个包，分别是：
- @babel/core: babel的核心工具,用来编译代码
- @babel/preset-env: babel的预定义环境,用来编译ES6,ES7,ES8等语法
- @babel-loader: babel在webpack中的加载器,用来加载babel
- core-js: core-js用来使老版本的浏览器支持新版ES语法,如Promise,Set,Map等
### 2. 修改webpack.config.js配置文件

```js{14-19,27-48}
const path = require('path'); // 引入path模块
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin：用来打包html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入clean-webpack-plugin：用来清除dist目录

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
  entry: "./src/index.ts", // 指定入口文件
  // 指定打包文件所在目录
  output: {
      // 指定打包文件的目录
      path: path.resolve(__dirname, 'dist'),
      // 打包后文件的文件
      filename: "bundle.js",
      // webpack打包出来的文件会自动生成这个箭头函数:(()=>{var t={巴拉巴拉的}}，这个最开头的箭头函数是不经过babel处理的
      // 但是ie11不支持箭头函数，所以会报错
      // 所以需要告诉webpack不使用箭头函数
      environment:{
        arrowFunction: false, // 不使用箭头函数，会使用es5的function函数   
      }
  },
  module: {
    // 指定要加载的规则:loader们
    rules: [
      {
        // test指定的是规则生效的文件：通过这个正则来匹配文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            loader:"babel-loader",
            // 设置babel
            options: {
              // 预设：指示babel做怎样的兼容性处理
              presets:[
                [
                  "@babel/preset-env",
                  {
                    targets:{ // 要兼容的目标浏览器
                        "chrome":"58",
                        "ie":"11"
                    },
                    "corejs":"3",  // 指定corejs的版本
                    "useBuiltIns":"usage" // 使用corejs的方式: "usage" 表示按需加载
                  }
                ]
              ]
            }
          },
          'ts-loader', // 用来处理ts文件
        ],
        // 要排除的文件
        exclude: /node-modules/
      }
    ]
  },
  // 配置Webpack插件
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前清除dist目录
    new HTMLWebpackPlugin({ // 用来打包html文件
      // title: "这是一个自定义的title"
      template: "./src/index.html" // 指定模板文件
    }),
  ],
  devtool: "inline-source-map", // 用来设置调试模式，这里是内联模式，还有其他模式：https://www.webpackjs.com/configuration/devtool/
  resolve: { // 用来设置引入模块时的文件后缀名
    extensions: ['.ts', '.js']
  },
  devServer: { // 用来设置webpack-dev-server
    contentBase: './dist' // 指定托管的根目录
  }
};
```

如此一来，使用ts编译后的文件将会再次被`babel`处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的`targets`中指定要兼容的浏览器版本。