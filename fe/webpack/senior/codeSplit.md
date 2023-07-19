---
title: Code Split（代码分割）
date: 2023/01/24
categories:
 - 前端
tags:
 - webpack 
---
## 为什么

打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

所以我们需要将打包生成的文件进行**代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件（我们希望，A页面有A页面的js，B页面有B页面的js）**，这样加载的资源就少，速度就更快。

## 是什么

代码分割（Code Split）主要做了两件事：

1.  分割文件：将打包生成的文件进行分割，生成多个 js 文件。
2.  按需加载：需要哪个文件就加载哪个文件（某个页面需要用哪个文件，就进行自动加载这个文件）。

## 怎么用

代码分割实现方式有不同的方式，为了更加方便体现它们之间的差异，我们会分别创建新的文件来演示

### 1. 多入口-demo1

1. 文件目录

```
├── public
├── src
|   ├── app.js
|   └── main.js
├── package.json
└── webpack.config.js
```

2. 下载包

```
npm i webpack webpack-cli html-webpack-plugin -D
```

3. 新建文件

内容无关紧要，主要观察打包输出的结果

- app.js

```js
console.log("hello app");
```

- main.js

```js
console.log("hello main");
```

4. 配置

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // 比如app依赖的资源，它会被打包成一个模块，这个模块就是chunk
    // 比如main依赖的资源，它会被打包成一个模块，这个模块也是chunk
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clear: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
};
```

5. 运行指令

```
npx webpack
```

此时在 dist 目录我们能看到输出了两个 js 文件。
<img :src="$withBase('/imgs/senior/多入口.png')" alt="打包出来了多个js文件">

总结：配置了几个入口，至少输出几个 js 文件。

### 2. 提取重复代码-demo2

如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。

**我们需要提取多入口的重复代码**，只打包生成一个 js 文件，其他文件引用它就好。

1. 修改文件

- app.js

```js
import { sum } from "./math";

console.log("hello app");
console.log(sum(1, 2, 3, 4));
```

- main.js

```js
import { sum } from "./math";

console.log("hello main");
console.log(sum(1, 2, 3, 4, 5));
```

- math.js

```js
export const sum = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
```

2. 修改配置文件

```js{28-67}
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  // 优化部分
  optimization: {
    // 代码分割配置：对所有打包出来的chunk进行分割。
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值：我们不需要写，了解即可
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2, // 只要被引用两次以上就打包到一起
          priority: -20,
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        },
      },
    },
  },
};
```

3. 运行指令

```
npx webpack
```

此时我们会发现生成 3 个 js 文件，其中有一个就是提取的公共模块。

### 3. 按需加载，动态导入-demo3

如果页面上有一个按钮，点击它则执行一个计算操作；不点击它，这个计算操作就不执行。 
- 对于这个页面来说，一开始，这个按钮并没有被点击，所以这个计算操作并不会执行。 
- 点击后才执行。
所以，对于页面来说，是不是可以先不加载这个计算操作所依赖的js文件呢？而是点击时才加载这个js文件呢？

想要实现按需加载，动态导入模块。还需要额外配置：

1. 修改文件

- main.js

```js
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // import 动态导入：会将动态导入的文件代码分割（拆分成单独模块），在需要使用的时候自动加载
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js")
    .then((res) => {
      console.log("模块加载成功", res.default(2, 1));
    })
    .catch((err) => {
      console.log("模块加载失败", err);
    });
};
```

- app.js

```js
console.log("hello app");
```

- public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Split</title>
  </head>
  <body>
    <h1>hello webpack</h1>
    <button id="btn">计算</button>
  </body>
</html>
```

2. 运行指令

```
npx webpack
```

我们可以发现，一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了。

### 4. 单入口-回到我们的默认代码中来演示

我们会使用单入口+代码分割+动态导入方式来进行配置。更新之前的配置文件。

开发时我们可能是单页面应用（SPA），只有一个入口（单入口）。那么我们需要：

- 1. 为我们的webpack.prod.js配置文件增加以下配置

```js{6-9}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 省略代码 ……
  optimization: {
    chunks: "all", // 对所有模块都进行分割
    // 其他配置均为默认配置，可以省略不写
  },
};
```

- 2. 给public/index.html 添加一个按钮
```html{23}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack</title>
</head>
<body>
    <h1>hello webpack5</h1>
    <!-- 准备一个使用样式的 DOM 容器 -->
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <!-- 使用字体图标 -->
    <span class="iconfont icon-aixin"></span>
    <span class="iconfont icon-bianji"></span>
    <span class="iconfont icon-Dyanjing"></span>
    <span class="iconfont icon-caidan"></span>
    <!-- 添加一个按钮 -->
    <button id="btn">计算</button>
    <!-- 引入打包后的js文件，才能看到效果 -->
    <!-- 手动引入的不需要了，我们通过插件自动引入 -->
    <!-- <script src="../dist/static/js/main.js"></script> -->
</body>
</html> 
```

- 3. 在src/js/main.js中动态引入math.js文件中的mul模块。
```js{15-24}
import count from "./js/count";
import sum from "./js/sum";
// 想要webpack打包资源，必须引入该资源
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.scss";
import "./sass/index.sass";
import "./styl/index.styl";

const result = count(2, 1);
console.log(result);
console.log(sum(1, 2, 3, 4, 5));

document.getElementById("btn").onclick = function () {
  // 懒加载：当文件需要使用时才加载
  // eslint不支持动态导入语法，所以需要配置一下
  import('./js/math')
      .then(({ default: mul }) => {
          console.log(mul(3, 3));
      })
      .catch(() => {
          console.log("文件加载失败");
      });
}

// 判断是否支持热模块更新功能
if(module.hot){
  // 一旦module.hot为true，说明开启了HMR功能
  module.hot.accept("./js/count.js",function(){
      console.log("count.js模块更新了");
  })
}
```
> 
> ### eslint 配置
>
> - 下载包
>
> ```
> npm i eslint-plugin-import -D
> ```
>
> - 配置
>
> ```js{9}
> // .eslintrc.js
> module.exports = {
>   // 继承 Eslint 规则
>   extends: ["eslint:recommended"],
>   env: {
>     node: true, // 启用node中全局变量
>     browser: true, // 启用浏览器中全局变量
>   },
>   plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
>   parserOptions: {
>     ecmaVersion: 6,
>     sourceType: "module",
>   },
>   rules: {
>     "no-var": 2, // 不能使用 var 定义变量
>   },
> };
> ```
- 4. `npm run build`打包，发现打包出来了多个js文件。运行代码，查看控制台也能看到console的3*3乘法输出结果。

<img :src="$withBase('/imgs/senior/mul按需打包.png')">
<img :src="$withBase('/imgs/senior/计算结果.png')" width="43%">

- 5. 打开network可以看到，只有当点击了“计算”按钮时，才会加载这个`587.main.js`文件。

<img :src="$withBase('/imgs/senior/按需加载.gif')">


### 5. 给动态导入文件取名称

前面，我们打包出来的mul模块的按需导入的代码，自动生成了一个`587.main.js`这样一个名字。
显然，这样的名字没有含义，当我们打包出来的文件越来越多时，就会很难知道这个文件是什么作用。

1. 修改文件

- src/main.js

```js{14-18}
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./styl/index.styl";

const result2 = sum(1, 2, 3, 4);
console.log(result2);

document.getElementById("btn").onClick = function () {
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
};

// 以下代码生产模式下会删除
if (module.hot) {
  module.hot.accept("./js/sum.js", function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
```

- webpack.prod.js
```js{11-12}
module.exports = {
  // 入口 （要求是相对路径）
  entry: './src/main.js',
  // 输出
  output: {
    // 文件的输出路径（这里要求是绝对路径）
    // __dirname: nodejs的变量，代表当前文件所在的文件夹目录
    path: path.resolve(__dirname, '../dist'), // 绝对路径
    // 入口文件打包输出的文件名
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // 给打包输出的其他文件命名
    chunkFilename: "static/js/[name].js",
    // 每次打包前清除 dist 目录
    // 原理：在打包之前，先path整个目录清空，再进行打包
    clean: true, 
  },
  // 省略代码
  ……
```
- `npm run build`打包看打包结果
<img :src="$withBase('/imgs/senior/命名.png')">

### 6. 统一命名配置
我们希望，打包输出的js，css，图片等，形成一个统一的命名规范。

- webpack.prod.js配置修改

```js{36-38,71-78,83-85,132-134}
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式，改成chunk命名，可以兼容多入口时的情况。
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式，加chunk后缀，可以更好的区分哪个是主文件
    assetModuleFilename: "static/media/[name].[hash][ext]", // 统一对图片、字体等资源命名方式做处理（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].css", // 因为将来也可能多入口打包，所以采用chunk写法
      chunkFilename: "static/css/[name].chunk.css", //如果有动态导入css时，也需要有chunk后缀的文件
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
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
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```

- 运行`npm run build`打包，观察打包输出 js 文件名称。
<img :src="$withBase('/imgs/senior/统一命名.png')" width="40%">