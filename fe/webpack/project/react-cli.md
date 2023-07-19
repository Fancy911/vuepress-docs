---
title: React 脚手架
date: 2023/01/27
categories:
 - 前端
tags:
 - webpack
 - react
 - 脚手架
---

## 开发模式配置（webpack.dev.js）

> 和之前讲的webpack配置部分对比不一样的加黑显示

```js{4,82-84,102,116-119,128}
const path = require("path"); // node中的path模块
const EslintWebpackPlugin = require("eslint-webpack-plugin"); // eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 处理html的插件
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // react热更新插件

// 返回处理样式的loader函数
const getStyleLoaders = (preProcessor) => {
    return [
      "style-loader",
      "css-loader",
      {
        // 处理css兼容性问题
        // 配合package.json中browserslist来指定兼容性
        loader: "postcss-loader",
        options: {
          postcssOptions: {
              plugins: ["postcss-preset-env"]
          },
        },
      },
      preProcessor,
    ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {
    path: undefined, // 打包后的文件存放的地方, 开发模式下不需要指定
    filename: "static/js/[name].js", // 打包后输出文件的文件名
    chunkFilename: "static/js/[name].chunk.js", // 代码分割后的文件名
    assetModuleFilename: "static/media/[hash:10][ext][query]", // 静态资源文件名
  },
  // 模块配置
  module: { 
    // 模块规则(配置 loader, 解析器等选项)
    rules: [ 
      // 处理css的loader
      {
          test: /\.css$/,
          use: getStyleLoaders(),
      },
      // 处理less的loader
      {
          test: /\.less$/,
          use: getStyleLoaders("less-loader"),
      },
      // 处理sass的loader
      {
          test: /\.s[ac]ss$/,
          use: getStyleLoaders("sass-loader"),
      },
      // 处理styl的loader
      {
          test: /\.styl$/,
          use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片的loader
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
            dataUrlCondition: { // 图片大小小于10kb的图片转为base64
                maxSize: 10 * 1024, // 10kb
            },
        },
      },
      // 处理字体的loader
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: "asset/resource",
      },
      // 处理js的loader, 用于处理js兼容性问题, 搭配babel.config.js使用
      // 此处需要注意：在react中，会有jsx文件，所以js和jsx文件都要经过babel-loader处理
      // 所以这个test的正则要同时包括js和jsx
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"), // 只处理src目录下的文件
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启缓存（和之前学过的cache: true稍微不太一样）
          cacheCompression: false, // 关闭缓存压缩，这样能提高打包速度
          plugins: [
            "react-refresh/babel", // 开启react热更新(HMR)
          ],
        },
      },
    ]
  },
  // 插件配置
  plugins: [
    // 清除打包后的文件夹
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // 指定检查的目录
      exclude: "node_modules", // 排除检查的文件夹
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // 指定缓存文件存放的位置
    }),
    // 处理html的插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板文件
    }),
    new ReactRefreshWebpackPlugin(), // 激活js的HMR
  ],
  // 优化配置
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 代码分割的范围
    },
    // 运行时代码分割配置
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  // webpack解析模块时，会加载这个选项
  resolve: {
    // 自动补全文件扩展名（以jsx文件来解释，就是当webpack遇到jsx文件时，就会以jsx文件自动补全文件扩展名）
    extensions: [".jsx", ".js", ".json"], // 从左到右依次解析（先看jsx文件可不可以解析，不可以在用js，在用json）
  },
  mode: "development", // 模式配置
  devtool: "cheap-module-source-map", // 开发环境下的source-map配置
  // 开发服务器配置
  devServer: {
    host: "localhost", // 服务器的ip地址
    port: 8082, // 服务器的端口号
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新，需要注意的是，这里的热更新是指css的热更新，js的热更新需要在plugins中配置react-refresh-webpack-plugin这个插件
    historyApiFallback: true, // 解决单页应用路由刷新404问题
  },
}
```
::: details
新增内容介绍
1. `@pmmmwh/react-refresh-webpack-plugin`: React热更新插件（**devServer里的hot字段配置的是css的热更新，js的热更新需要在plugins中配置react-refresh-webpack-plugin这个插件**）
  - 未使用该插件前，我们的js文件并不支持HMR，当我们更新了某个js/jsx文件后，还是整体都刷新了，而不是具体的某个更改的文件，故我们需要开启这个插件功能来支持js的HMR。
2. `resolve`：文件解析
  - 当webpack解析模块时，会加载这个选项
  - 从左到右依次解析（先看jsx文件可不可以解析，不可以在用js，在用json）
  - 自动补全文件扩展名（以jsx文件来解释，就是当webpack遇到jsx文件时，就会以jsx文件自动补全文件扩展名）
3. `historyApiFallback`：[devServer.historyApiFallback](https://webpack.docschina.org/configuration/dev-server/#devserverhistoryapifallback)
  - 解决前端路由刷新404问题
::: 

### 安装开发模式依赖

- 插件和样式loader依赖
```bash
npm i eslint-webpack-plugin html-webpack-plugin style-loader css-loader postcss-loader postcss-preset-env less-loader sass-loader sass stylus-loader -D
```

- babel和eslint相关依赖
```bash
npm i babel-loader @babel/core babel-preset-react-app eslint-config-react-app -D
```

- devServer和webpack相关依赖
```bash
npm i webpack-dev-server webpack webpack-cli -D
```

- react相关（不需要安装到开发依赖中，是运行时的依赖，所以没有-D）
```bash
npm i react react-dom react-router-dom
```

- react热更新插件
```bash
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

## 生产模式配置（webpack.prod.js）

> 对比开发模式不一样的部分加黑显示

```js{4-10,15,34-38,86-89,106-123,135-168,175-176}
const path = require("path"); // node中的path模块
const EslintWebpackPlugin = require("eslint-webpack-plugin"); // eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 处理html的插件

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取样式成为单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // css压缩
const TerserWebpackPlugin = require("terser-webpack-plugin"); // js压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 图片压缩

const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件插件

// 返回处理样式的loader函数
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"]
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname,'../dist'), // 打包后的文件存放的地方
    filename: "static/js/[name].[contenthash:10].js", // 打包后输出文件的文件名
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js", // 代码分割后的文件名
    assetModuleFilename: "static/media/[hash:10][ext][query]", // 静态资源文件名
    clean: true, // 每次打包前清除dist目录
  },
  // 模块配置
  module: { 
    // 模块规则(配置 loader, 解析器等选项)
    rules: [ 
      // 处理css的loader
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      // 处理less的loader
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      // 处理sass的loader
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      // 处理styl的loader
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片的loader
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { // 图片大小小于10kb的图片转为base64
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
      // 处理字体的loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      // 处理js的loader, 用于处理js兼容性问题, 搭配babel.config.js使用
      // 此处需要注意：在react中，会有jsx文件，所以js和jsx文件都要经过babel-loader处理
      // 所以这个test的正则要同时包括js和jsx
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"), // 只处理src目录下的文件
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启缓存（和之前学过的cache: true稍微不太一样）
          cacheCompression: false, // 关闭缓存压缩，这样能提高打包速度
        },
      },
    ]
  },
  // 插件配置
  plugins: [
    // 清除打包后的文件夹
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // 指定检查的目录
      exclude: "node_modules", // 排除检查的文件夹
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // 指定缓存文件存放的位置
    }),
    // 处理html的插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板文件
    }),
    new MiniCssExtractPlugin({ // 提取css成为单独的文件
      filename: "static/css/[name].[contenthash:10].css", // 提取后的文件名
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css", // 代码分割后的文件名
    }),
    // 复制public文件夹下的文件到dist文件夹下
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 指定要复制的源目录
          to: path.resolve(__dirname, "../dist"), // 复制到的目的目录
          globOptions: {
            // 忽略index.html文件
            // 我们不需要再复制index.html了
            ignore: ["**/index.html"], 
          },
        },
      ],
    })
  ],
  // 优化配置
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 代码分割的范围
    },
    // 运行时代码分割配置
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    // 压缩配置
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(), 
      // 压缩js配置
      new TerserWebpackPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  // webpack解析模块时，会加载这个选项
  resolve: {
    // 自动补全文件扩展名（以jsx文件来解释，就是当webpack遇到jsx文件时，就会以jsx文件自动补全文件扩展名）
    extensions: [".jsx", ".js", ".json"], // 从左到右依次解析（先看jsx文件可不可以解析，不可以在用js，在用json）
  },
  mode: "production", // 模式配置
  devtool: "source-map", // 生产环境下的source-map配置
}
```
::: details
新增内容介绍
1. `CopyWebpackPlugin`: 复制插件
  - 在项目的`public`目录下，`index.html`(`html`资源)是原封不动的输出到`dist`目录下的，并没有进行解析打包。
  - 除了`html`文件之外，将来我们开发的脚手架中，`public`目录下肯定不止放 `ico` 文件和 `html` 文件，还会放一些其他的公共资源。
  - 而我们当前打包的时候都打包不过去，我们需要解决这个问题。
    - 解决方式：我们需要把`public`目录下的东西，原封不动复制到dist目录下即可
    - 需要使用到一个`webpack`插件：`copy-webpack-plugin`
:::

### 安装生产模式依赖
- css：提取css为单独文件和css压缩
```bash
npm i mini-css-extract-plugin css-minimizer-webpack-plugin -D
```

- 图片压缩
```bash
npm i image-minimizer-webpack-plugin imagemin -D

cnpm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```

- 文件复制插件：copy-webpack-plugin
```bash
npm i copy-webpack-plugin -D
```

## 其他配置
### package.json

::: details
1. package.json中修改了`scripts`
```js
"scripts": {
  "start": "npm run dev",
  "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js",
  "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
},
```
- 另外，需要格外注意的是：`cross-env NODE_ENV=development` 和 `cross-env NODE_ENV=production`
- 正常情况下，我们只需要写`"dev": "webpack serve --config ./config/webpack.config.js"`即可，但是这样运行会报错，如下图所示：
- <img :src="$withBase('/imgs/project/运行时报错.png')">
- 意思是，我们没有指定babel配置的环境变量（虽然说webpack.config.js中也配置了mode，但那只是运行代码时的模式指示）。
- 故，我们需要安装`cross-env`这个插件（`npm install --save-dev cross-env`），并在`"scripts"`的`dev`和`build`命令的配置中，指定环境变量。

2. 此外，还增加了`browserslist`配置，用于配合postcss-loader处理兼容性问题：
```js
"browserslist": ["last 2 version", "> 1%", "not dead"]
```
:::

```json
{
  "name": "react-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.5",
    "babel-loader": "^8.2.5",
    "babel-preset-react-app": "^10.0.1",
    "copy-webpack-plugin": "^10.2.4",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "css-minimizer-webpack-plugin": "^3.4.1",
    "eslint-config-react-app": "^7.0.1",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "^5.5.0",
    "image-minimizer-webpack-plugin": "^3.2.3",
    "imagemin": "^8.0.1",
    "imagemin-gifsicle": "^7.0.0",
    "imagemin-jpegtran": "^7.0.0",
    "imagemin-optipng": "^8.0.0",
    "imagemin-svgo": "^10.0.1",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.5.0",
    "react-refresh": "^0.13.0",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "stylus-loader": "^6.2.0",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  },
  "dependencies": {
    "antd": "^4.20.2",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-router-dom": "^6.3.0"
  },
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```
### .eslintrc.js
```js
module.exports = {
  extends: ["react-app"], // 因为我们搭建的是react脚手架，所以需要继承 react 官方规则
  parserOptions: { // 解析器选项
    babelOptions: { // babel选项
      presets: [ // 预设
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
};
```
### babel.config.js
关于babel对于react的预设，详情可参考 [babel-preset-react-app](https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js)
```js
module.exports = {
  presets: ["react-app"], // 因为我们搭建的是react脚手架，使用的是react语法，所以需要使用react预设才能正常编译。
};
```
::: tip
之前，我们在考虑兼容性问题时，还使用了core.js，但在此处，会发现不再需要了。
- 因为react-app这个预设里面就包内置了这些兼容性处理的这些配置
- runtime也是一样的被react-app内置了
:::

## 合并开发和生产配置(webpack.config.js)

```js{14-16,22,41-44,97-99,117-138,149,190-191,}
const path = require("path"); // node中的path模块
const EslintWebpackPlugin = require("eslint-webpack-plugin"); // eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 处理html的插件

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取样式成为单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // css压缩
const TerserWebpackPlugin = require("terser-webpack-plugin"); // js压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 图片压缩

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // react热更新插件：开发模式下用

const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件

// 运行时，曾在package.json的script字段中定义了cross-env环境变量是development还是production
// 于是，我们可以通过获取cross-env中定义好的process.env.NODE_ENV来判断当前是开发环境还是生产环境
const isProduction = process.env.NODE_ENV === "production";

// 返回处理样式的loader函数
const getStyleLoaders = (preProcessor) => {
  return [
    // 生产环境下使用MiniCssExtractPlugin.loader, 开发环境下使用style-loader
    isProduction ? MiniCssExtractPlugin.loader : "style-loader", 
    "css-loader",
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
          postcssOptions: {
              plugins: ["postcss-preset-env"]
          },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined, // 打包后的文件存放的地方, 开发模式下不需要指定
    // 生产模式下需要使用contenthash
    filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
    chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
  },
  // 模块配置
  module: { 
    // 模块规则(配置 loader, 解析器等选项)
    rules: [ 
      // 处理css的loader
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      // 处理less的loader
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      // 处理sass的loader
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      // 处理styl的loader
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片的loader
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { // 图片大小小于10kb的图片转为base64
              maxSize: 10 * 1024, // 10kb
          },
        },
      },
      // 处理字体的loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      // 处理js的loader, 用于处理js兼容性问题, 搭配babel.config.js使用
      // 此处需要注意：在react中，会有jsx文件，所以js和jsx文件都要经过babel-loader处理
      // 所以这个test的正则要同时包括js和jsx
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"), // 只处理src目录下的文件
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启缓存（和之前学过的cache: true稍微不太一样）
          cacheCompression: false, // 关闭缓存压缩，这样能提高打包速度
          plugins: [
            !isProduction && "react-refresh/babel", // 如果不是生产环境，就使用react-refresh/babel插件
          ].filter(Boolean),
        },
      },
    ]
  },
  // 插件配置
  plugins: [
    // 清除打包后的文件夹
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // 指定检查的目录
      exclude: "node_modules", // 排除检查的文件夹
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // 指定缓存文件存放的位置
    }),
    // 处理html的插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板文件
    }),
    isProduction &&
      new MiniCssExtractPlugin({ // 提取css成为单独的文件
          filename: "static/css/[name].[contenthash:10].css", // 提取后的文件名
          chunkFilename: "static/css/[name].[contenthash:10].chunk.css", // 代码分割后的文件名
      }),
    isProduction &&
      // 复制public文件夹下的文件到dist文件夹下
      new CopyWebpackPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, "../public"), // 指定要复制的源目录
                  to: path.resolve(__dirname, "../dist"), // 复制到的目的目录
                  globOptions: {
                      // 忽略index.html文件
                      // 我们不需要再复制index.html了
                      ignore: ["**/index.html"], 
                  },
              },
          ],
      }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  // 优化配置
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 代码分割的范围
    },
    // 运行时代码分割配置
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimize: isProduction, // 是否压缩: 生产环境下才压缩，下面的minimizer才会生效
    // 压缩配置
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(), 
      // 压缩js配置
      new TerserWebpackPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  // webpack解析模块时，会加载这个选项
  resolve: {
    // 自动补全文件扩展名（以jsx文件来解释，就是当webpack遇到jsx文件时，就会以jsx文件自动补全文件扩展名）
    extensions: [".jsx", ".js", ".json"], // 从左到右依次解析（先看jsx文件可不可以解析，不可以在用js，在用json）
  },
  mode: isProduction ? "production" : "development", // 模式配置
  devtool: isProduction ? "source-map" : "cheap-module-source-map", // source-map配置
  // 开发服务器配置
  devServer: {
    host: "localhost", // 服务器的ip地址
    port: 3001, // 服务器的端口号
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新，需要注意的是，这里的热更新是指css的热更新，js的热更新需要在plugins中配置react-refresh-webpack-plugin这个插件
    historyApiFallback: true, // 解决单页应用路由刷新404问题
  },
}
```

### 修改运行指令 package.json

```json{8-9}
{
  "name": "react-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
  },
  // 省略
}
```

## 优化配置（配置AntD组件库 + oneOf + splitChunk优化）

```js{19-33,48,65-83,88}
// 省略代码
// .........
// 返回处理样式的loader函数
const getStyleLoaders = (preProcessor) => {
    return [
        // 生产环境下使用MiniCssExtractPlugin.loader, 开发环境下使用style-loader
        isProduction ? MiniCssExtractPlugin.loader : "style-loader", 
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"]
                },
            },
        },
        preProcessor && {
            loader: preProcessor, // 处理less/sass/styl的loader
            options: 
                // 如果是less-loader, 则需要配置lessOptions
                // 主题色文档：https://ant.design/docs/react/customize-theme-cn#Ant-Design-%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F
                preProcessor === "less-loader" 
                    ? { 
                        lessOptions: {
                            modifyVars: { // 修改antd的默认主题色
                                "@primary-color": "#1DA57A",
                            },
                            javascriptEnabled: true, // 需要配置这个才能修改主题色
                        },
                    } : {},
        },
    ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: { 
    // 省略...
  },
  // 模块配置
  module: { 
      // 模块规则(配置 loader, 解析器等选项)
      rules: [ 
        {
          // 用oneOf包裹一下loader们：只能匹配上一个 loader, 剩下的就不匹配了。
          oneOf: [
            // 省略loader...
          ]
        }
      ]
  },
  // 插件配置
  plugins: [
    // 省略代码...
  ].filter(Boolean),
  // 优化配置
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 代码分割的范围
      // 根据项目情况，看需要把什么模块单独打包成单个文件
      // 在我们这个项目中，我们把react、antd、剩下的node_modules单独打包
      cacheGroups: {
        // 将react react-dom react-router-dom一起打包成一个js文件
        react: {
            test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
            name: "chunk-react",
            priority: 40, // 优先级: react > antd > node_modules
        },
        // antd单独打包
        antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: "chunk-antd",
            priority: 30,
        },
        // 剩下的node_modules打包成一个js文件
        libs: {
            test: /[\\/]node_modules[\\/]/,
            name: "chunk-libs",
            priority: 20,
        },
      }
    },
    // 省略其他优化配置...
  },
  performance: false, // 关闭性能提示，提升打包速度
}
```

::: details
1. 下载AntDesign依赖
```bash
npm i antd@4.24.2
```
❗️此处有个坑：如果直接通过`npm i antd`安装antd依赖，默认是装5.x.x版本的antd，会导致找不到`antd/dist/antd.less`，所以我们通过指定低版本，来解决该问题。

在getStyleLoaders修改less样式主题色后，可以看到原来的蓝色主题变成了当前设置的绿色主题
<img :src="$withBase('/imgs/project/主题换色.png')" width="30%">

2. 增加了splitChunks的cacheGroups
- 可以看到打包出来的文件中多了chunk-antd、chunk-react、chunk-libs
<img :src="$withBase('/imgs/project/代码分割打包优化.png')" width="40%">

3. 增加了performance: false。
- 如果不增加这个配置，则会报很多warning，配置后则不会再显示
<img :src="$withBase('/imgs/project/未配置性能分析关闭.png')" width="70%">
<img :src="$withBase('/imgs/project/关闭后.png')" width="70%">
:::

## 完整React-cli项目地址
[React-cli：Github地址](https://github.com/Fancy911/React-cli/tree/main)

### React-cli项目中问答
1. 问：`src/main.js`中的`createRoot`是什么？

答：createRoot是react 18新的渲染方式

2. 问：为什么我们在`src/main.js`中引入的是`react-dom/client`而不是`react-dom`？

答：因为`react-dom/client`是`react-dom`的子集，它只包含了我们需要的一些方法，而`react-dom`包含了所有的方法，所以我们只需要引入`client`就可以了。

3. 问：为什么我们总是引入`react`呢？

答：因为在`react`中，使用的都是`jsx`语法，我们需要引入`react`来使用`jsx`语法。`jsx`语法是`react`的语法糖，它会被`babel`转换成`React.createElement()`方法，即`jsx`会被`babel`转化成`js`语法。然后通过`React.createElement()`方法来创建虚拟`DOM`对象，然后通过`ReactDOM.render()`方法来渲染虚拟`DOM`。

4. `React Router6`中的路由懒加载是什么？

答：路由懒加载：当我们访问某个路由的时候，才去加载对应的组件，这样可以提高性能。路由懒加载可以体现在`splitChunks`中：当我们点击`Home`组件时，它只加载`home`的相关`js`，点击`About`组件时，它只加载`about`的相关`js`。

5. `React Router6`中的路由懒加载是如何使用的？

答：在`App.jsx`中`import { lazy, Suspense } from "react"`。其中：
- `lazy函数`：用来实现路由懒加载，它接收一个函数作为参数，这个函数返回一个Promise对象，这个Promise对象的结果是一个组件，即lazy函数用于定义路由懒加载的组件。
- `Suspense组件`：用于显示加载中的内容，`Suspense`包裹住`Routes`。

6. `React Router6`中的`Routes`和`Route`是什么？

答：
- `Routes`组件是用来包裹Route组件的
- `Route`组件是用来配置路由的，它有两个属性：`path`和`element`，`path`是路由的路径，`element`是要显示的组件
（原来的版本中`element`是`component`，现在已经被替换了）