---
title: 提升打包构建速度
date: 2023/01/21
categories:
 - 前端
tags:
 - webpack
--- 
## HotModuleReplacement（热模块替换）

### 为什么

当我们不使用HMR时，开发时我们修改了**其中一个**模块代码，Webpack 默认会将**所有模块全部**重新打包编译，速度很慢。

所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。

### 是什么

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

### 怎么用

1. 基本配置

```js{7}
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```
::: warning
Webpack里 devServer中的hot字段默认就是true，可以不用特意设置。
:::

::: warning
此时 css 样式经过 style-loader 处理，天然已经具备 HMR 功能了。
但是 js 还不行。
:::

所以要为JS做以下配置。

2. JS 配置

```js{17-27}
// main.js
import count from "./js/count";
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./styl/index.styl";

const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);

// 判断是否支持HMR功能
if (module.hot) {
  // 一旦module.hot为true，说明开启了HMR功能
  // 这个后面函数的意思是：一旦count.js发生了变化触发了热模块替换，就会调用这个function，你可以在这个function中做一些操作。
  module.hot.accept("./js/count.js", function (count) {
    const result1 = count(2, 1);
    console.log(result1);
  });

  module.hot.accept("./js/sum.js");
}
```

如果我们的module很多呢？有成百个，那么就得写上百个重复的`module.hot.accept`，这样会很麻烦，所以实际开发我们会使用其他 loader 来解决。

比如：[vue-loader](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)。

## OneOf

### 为什么

打包时每个文件都会经过所有 loader 处理（一个接一个去test当前loader能否处理，而且通常，其实一个loader只负责处理一种文件，但是每次这个文件都要挨个去过所有loader），虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍，但没必要，比较慢。

### 是什么

顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了。

### 怎么用

```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  module: {
    rules: [
      {
        // 每个文件只能匹配一个loader
        oneOf: [
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
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

生产模式也是如此配置。

## Include/Exclude（包含/排除）

### 为什么

开发时我们需要使用第三方的库或插件，所有文件都下载到 **node_modules** 中了。而这些文件都是已经编译过的，不需要再编译可以直接import使用的。

所以我们在对 js 文件处理时，**要排除 node_modules 下面的文件**。

### 是什么

- include

包含，只处理 xxx 文件

- exclude

排除，除了 xxx 文件以外其他文件都处理

### 怎么用

```js{60-62,73}
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  module: {
    rules: [
      {
        oneOf: [
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
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他的不处理
            // （注意：include和exclude只能用一种）
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 这里的exclude是默认值（不写也是有这个效果的）
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

生产模式也是如此配置。

::: tip
为什么只针对JS文件做处理呢？样式文件是没做处理的。
1. 开发时，我们很少引入其他第三方的样式，都是自己写样式，自然也就不需要排除了。
2. 就算我们引入了一些样式，比如bootstrap，那我们也希望这个引入的样式和我们自己的样式打包在一起，没必要去做排除。
:::

## Cache（缓存）

### 为什么

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。（而开发时，js文件的占比是最大的）

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

### 是什么

所以，Cache 就可以用来对 Eslint 检查 和 Babel 编译结果进行缓存，这样，之后只有那些有变化的 js 文件才会经过 Eslint 检查 和 Babel 编译，没有变化的，就可以用之前的缓存。

::: warning
Cache提升的是第二次第三次第四次……的打包速度，第一次时由于还没缓存，还是正常的速度。
:::

### 怎么用

```js{63-66,77-82}
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  module: {
    rules: [
      {
        oneOf: [
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
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 关闭缓存文件压缩，缓存文件不要压缩
            },
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
      cache: true, // 开启eslint缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
```
- 我们可以运行一下npm run build看一下情况，可以看到node_modules里的.cache文件夹下已经有了缓存文件。
<img :src="$withBase('/imgs/senior/缓存.png')" alt="cache缓存信息">

开发模式下使用方式一致。
## Thead

### 为什么

当项目越来越庞大时，打包速度越来越慢，甚至于需要一个下午才能打包出来代码。这个速度是比较慢的。

我们想要继续提升打包速度，其实就是要**提升 js 的打包速度**，因为其他文件都比较少。

而对 js 文件处理主要就是 eslint 、babel、**Terser** 三个工具，所以我们要提升它们的运行速度。
> Terser工具可能是第一次听说，但它确实一直在被使用，只是说是我们看不见的。
>
> 我们之前提到过：“生产模式下，js代码会被自动压缩”。
>
> 就是因为webpack内部的这个Terser插件，帮我们压缩JS代码。只要是生产模式，这个插件就会被激活，从而压缩js代码。 

我们可以开启多进程（比如之前是单进程，先eslint处理js，再babel，再Terser，那么现在可以利用多进程，让这三个插件同时处理js文件）同时处理 js 文件，这样速度就比之前的单进程打包更快了。

### 是什么

多进程打包：开启电脑的多个进程同时干一件事，速度更快。

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。**

### 怎么用

我们启动进程的数量就是我们 CPU 的核数。

1. 如何获取 CPU 的核数，因为每个电脑都不一样。

```js
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```

2. 下载包

```
npm i thread-loader -D
```

3. 使用
- 生产模式下的配置

```js{1,7,9,87-104,121,134,136-147}
const os = require("os"); // nodejs的核心模块，用来获取系统信息
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length; // 获取当前系统的cpu核心数

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
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
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
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              // 注意，多进程打包要写在babel-loader之前
              // 因为是从右到左，从下到上执行的，所以要先执行babel-loader，然后对babel做多进程处理
              {
                loader: "thread-loader", // 开启多进程打包
                options: {
                  // 有几个进程, threads是上面获取的cpu核心数
                  workers: threads,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 关闭缓存文件压缩，缓存文件不要压缩（压缩反而会浪费时间）
                },
              }
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
      cache: true, // 开启eslint缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程打包和进程数量
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  // 优化
  optimization: {
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new CssMinimizerPlugin(),  // 压缩css
      new TerserWebpackPlugin({  // 压缩js
          parallel: threads, // 开启多进程打包
      })
      // 放到plugins中也可以
      // 只是压缩的内容一般来说是放在optimization中的minimizer中的
    ]
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
- 开发模式下的配置
::: warning
由于开发模式下的js不需要压缩，所以就也不需要配置Terser了。
:::

```js{1,6,89-104,122}
const os = require("os"); // nodejs的核心模块，用来获取系统信息
const path = require('path');  //nodejs和核心模块，专门用来处理路径问题
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const threads = os.cpus().length; // 获取当前系统的cpu核心数

module.exports = {
    // 入口 （要求是相对路径）
    entry: './src/main.js',
    // 输出
    output: {
        // 文件的输出路径（这里要求是绝对路径）
        // __dirname: nodejs的变量，代表当前文件所在的文件夹目录
        path: undefined,
        filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
        // 每次打包前清除 dist 目录
        // 原理：在打包之前，先path整个目录清空，再进行打包
        clean: true, 
    },
    // 加载器
    module: {
        rules: [
            {
                // 每个文件只能匹配一个loader
                oneOf: [
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
                    {
                        test: /\.less$/,
                        // loader: xxx, // 不能使用loader，因为loader:只能使用一个loader
                        use: [  // use: 可以使用多个loader
                        // compiles Less to CSS
                            'style-loader',
                            'css-loader',
                            'less-loader', // 将less文件编译成css文件
                        ],
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
                            // 小于10kb的图片会被base64处理
                            // 优点：减少请求数量
                            // 缺点：体积会变得大一点
                            dataUrlCondition: {
                                maxSize: 10 * 1024  // 10kb
                            }
                        },
                        generator: {
                            // 将图片文件输出到 static/imgs 目录中
                            // 将图片文件命名 [hash:8][ext][query]
                            // [hash:8]: hash值取8位
                            // [ext]: 使用之前的文件扩展名
                            // [query]: 添加之前的query参数
                            filename: "static/imgs/[hash:8][ext][query]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|map4|map3|avi)$/,
                        // type: "asset"时，会对小于10kb的文件进行base64处理
                        // 字体文件是不需要转的，使用type: "asset/resource"时，不会进行base64处理，直接输出，相当于file-loader
                        type: "asset/resource",
                        generator: {
                            filename: "static/media/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.js$/,
                        // 排除node_modules文件夹不处理
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程打包
                                options: {
                                    // 有几个进程, threads是上面获取的cpu核心数
                                    workers: threads,
                                },
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false, // 关闭缓存文件压缩，缓存文件不要压缩（压缩反而会浪费时间）
                                },
                            }
                        ],
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录 (就是说哪些文件需要进行eslint检查)
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 排除node_modules文件夹
            cache: true, // 开启eslint缓存
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads, // 开启多进程打包和进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板：以 public/index.html 为模板创建文件 （如果不写这个，打包到dist中的html文件没有我们之前在public/index.html中写的那些内容）
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
    ],
    // 开发服务器的配置
    devServer: {
        // 开发服务器的配置
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器的端口号
        open: true, // 是否自动打开浏览器
    },
    // 模式
    mode: 'development', // 开发模式
    // source-map: 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
    devtool: "cheap-module-source-map",
}
```

我们目前打包的内容都很少，所以因为启动进程开销原因，使用多进程打包实际上会显著的让我们目前打包时间变得很长。
当打包的内容达到一定量时，多进程打包的优化能力就会显现出来。
