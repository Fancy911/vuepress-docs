---
title: TypeScript编译
date: 2023/01/31
categories:
 - 前端
tags:
 - typescript
---

Js代码是可以直接在浏览器中运行的，而Ts必须经过编译这步，如果每次都手动自己去编译的话很麻烦。所以我们就可以做出一些自动化的配置。

## 自动编译某个文件

- 编译文件时，使用 `-w`指令后，TS编译器会**自动监视文件的变化，并在文件发生变化时对文件进行重新编译**。
- 示例：

```shell
tsc xxx.ts -w
```
- 但是这种，只能对`xxx.ts`这个单个文件进行编译，如果要对整个项目进行编译，就需要配置文件了。

## 自动编译整个项目

我们想要直接使用`tsc`指令能自动将当前项目下的所有ts文件编译为js文件。需要在根目录下创建一个ts的配置文件：`tsconfig.json`。
- `tsconfig.json`是一个`JSON`文件，添加配置文件后，只需 `tsc` 命令即可完成对整个项目的编译。(这个`json`文件里面是可以写注释的，正常的`json`文件是不允许写注释的)
- 只要有这个`tsconfig.json`文件，不管里面有没有写具体的配置项，就已经可以直接在命令行输入`tsc`命令进行所有当前目录下所有ts文件的编译了。
- 同理，如果想要**自动监视这些文件的变化**，使用`tsc -w`即可。
### `tsconfig.json`中的配置项
#### include（常用）

- 用于指定哪些目录下的ts文件需要被编译
- 默认值：["\*\*/\*"]
- 示例：
  ```json
  "include":["./src/**/*", "tests/**/*"]
  ```
::: tip
一个*代表任意文件，两个**代表任意目录
`"./src/**/*"`: 表示，根目录下的`src`目录下的任意目录下的任意文件，即`src`目录下的所有文件。
同理，
`"./tests/**/*"`: 表示，根目录下的`tests`目录下的所有文件
:::
#### exclude

- 定义需要排除在外不被编译的目录
- 默认值：`["node_modules", "bower_components", "jspm_packages"]`
- 示例：
  ```json
  "exclude": ["./src/hello/**/*"]
  ```
::: tip
上述示例中，`src`下`hello`目录下的文件都不会被编译
:::
#### extends（不常用）

- 定义被继承的配置文件（我们的配置文件叫`tsconfig.json`，比如我们需要其他配置文件的一些配置，又不想在`tsconfig.json`里重新写一遍，则可以使用该配置项）
- 示例：
  ```json
  "extends": "./configs/base"
  ```
::: tip
上述示例中，当前配置文件中会自动包含`config`目录下`base.json`中的所有配置信息
:::
#### files（不常用）

- 指定需要被编译文件的**列表（数组）**，只有需要编译的文件少时才会用到
- 示例：
  ```json
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
  ```
::: tip
上述示例中，files列表中的文件都会被TS编译器所编译
:::
#### `compilerOptions`（编译选项-重点）

- **编译选项**是配置文件中非常重要也比较复杂的配置选项
- 在`compilerOptions`中包含`多个子选项`，用来完成对`编译的配置`，我们主要就是学习这些子选项和它们的作用。

1. target（目标版本）
- 设置 ts 代码被编译为 js 的**目标版本**
- 可选值：`ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext`
  - 即使你写错了，报了错，报错信息会提示你可选的值
- 示例：
  ```json
  "compilerOptions": {
      "target": "ES6"
  }
  ```
::: tip
如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码
:::

2. module（模块）
- 指定编译后代码要使用的模块化规范
- 可选值：`CommonJS、UMD、AMD、System、ES2020、ESNext、None`
  - 同target一样，也是你写错了报错了，报错信息会提示你可选的值
- 示例：
  ```json
  "compilerOptions": {
      "module": "CommonJS"
  }
  ```

3. lib（库）（不常用）
- 指定项目代码运行时需要用到哪些库（宿主环境）
- 可选值：`ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......`
- 示例：
  ```json
  "compilerOptions": {
      "lib": ["ES6", "DOM"],
  }
  ```

4. rootDir
- 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过`rootDir`可以手动指定根目录
- 示例：
  ```json
  "compilerOptions": {
      "rootDir": "./src" // 指定src目录为根目录
  }
  ```
::: tip
如上设置，指的是将所有文件编译后的目录结构都以src为根目录
:::

5. outDir
- 指定编译后文件所在的目录
- 默认情况下，编译后的 js 文件会和 ts 文件位于相同的目录，设置 `outDir` 后可以改变编译后文件的位置
- 示例：
  ```json
  "compilerOptions": {
      "outDir": "dist"
  }
  ```
::: tip
如上设置，设置后编译后的 js 文件将会生成到 dist 目录
:::

6. outFile
- 将所有的文件编译后合并为一个js文件
- 设置`outFile`后，会将所有的全局作用域中的代码会合并到同一个文件中。
- 如果`module`制定了`None`、`System`或`AMD`（只支持这三种module），则会将模块一起合并到文件之中
- 示例：,
  ```json
  "compilerOptions": {
      "outFile": "dist/app.js", //表示将编译后的 js 文件都合并到app.js文件中
  }
  ```

7. allowJs（6和7通常一起用）
- 是否对 js 文件编译，默认值为`false`

8. checkJs
- 是否对js文件进行代码语法规范检查，默认值为`false`
- 示例：
  ```json
  "compilerOptions": {
      "allowJs": true, // 允许编译js文件
      "checkJs": true,// 对js文件进行语法规范检查
  }
  ```

9. removeComments
- 编译后是否删除注释内容，默认值：`false`
- 示例：
  ```json
  "compilerOptions": {
      "removeComments": true，// 编译后的文件里就不再包括注释
  }
  ```

10. noEmit（不常用）
- 不生成编译后的文件，默认值：`false`，不想编译ts代码的时候可以设置为`true`
- 示例：
  ```json
  "compilerOptions": {
      "noEmit": true，// 不生成编译后的文件
  }
  ```

11. noEmitOnError
- 与`noEmit`相比更为常用，它是在当 ts 文件有错误的情况下不进行编译，让编译更加严格，避免出现错误的代码
- 默认值：`false`
- 示例：
  ```json
  "compilerOptions": {
      "noEmitOnError": true，// 当ts文件有错误的情况下不进行编译
  }
  ```

12. 严格检查

在 js 中，我们只需要在代码第一行，写上`"use strict";`

ts 中，可以参考如下配置。

- strict：默认值`fasle`
  - 所有严格检查的总开关
  - 启用所有的严格检查的默认值为`true`，设置后相当于开启了所有的严格检查
- alwaysStrict：默认值`fasle`
  - 用于设置编译后的文件是否总是以严格模式对代码进行编译
  - `"alwaysStrict": true`: 设置编译后的文件使用严格模式
- noImplicitAny：默认值`fasle`
  - 为`true`时禁止隐式的`any`类型（声明一个变量不指定类型的时候就是隐式的any，详情可以翻看前面类型那小节）
- noImplicitThis：默认值`fasle`
  - 什么是类型不明确的`false`？比如一个函数里的`this`，是和这个函数的调用方式有关的：
    1. 函数以对象的方法调用，那么`this`就是这个对象；
    2. 函数以函数的形式调用，那么`this`就是`window`；
    3. 函数以构造函数的形式调用，那么`this`就是这个构造函数的实例
    
    那么比如在函数里打印一个`this`，那这个`this`其实是类型不明确的
  - 为true时禁止类型不明确的`this`
- strictBindCallApply
  - 严格检查`bind`、`call`和`apply`的参数列表
- strictFunctionTypes
  - 严格检查函数的类型
- strictNullChecks：默认值`fasle`
  - 为`true`时进行严格的空值`null`检查 
- strictPropertyInitialization
  - 严格检查属性是否初始化

- noFallthroughCasesInSwitch
  - 检查`switch`语句包含正确的`break`
- noImplicitReturns
  - 检查函数没有隐式的返回值
- noUnusedLocals
  - 检查未使用的局部变量
- noUnusedParameters
  - 检查未使用的参数
- allowUnreachableCode
  - 检查不可达代码
  - 可选值：
    `true`:忽略不可达代码
    `false`:不可达代码将引起错误
## 一个简单的tsconfig.json文件

```json
{
  "include": [
    "./src/**/*"
  ],
  /*
    compilerOptions 编译器的选项
  */
  "compilerOptions": {
    // target 用来指定ts被编译为的ES的版本
    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext'
    "target": "es2015",
    // module 指定要使用的模块化的规范
    // 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'
    "module": "es2015",
    // lib用来指定项目中要使用的库
    // "lib": ["es5", "dom", "es2015.promise", "es2015.iterable"]

    // outDir 用来指定编译后文件所在的目录
    "outDir": "./dist",

    // 将代码合并为一个文件
    // 设置outFile后，所有的全局作用域中的代码会合并到同一个文件中
    //"outFile": "./dist/app.js"

    // 是否对js文件进行编译，默认是false
    // "allowJs": true,
    // 是否检查js代码是否符合语法规范，默认是false
    // "checkJs": true,
    // 是否移除注释
    "removeComments": true,
    // 不生成编译后的文件
    "noEmit": false,
    // 当有错误时不生成编译后的文件
    "noEmitOnError": true,
    // 所有严格检查的总开关
    "strict": true,
    // 用来设置编译后的文件是否使用严格模式，默认false
    "alwaysStrict": true,
    // 不允许隐式的any类型
    "noImplicitAny": true,
    // 不允许不明确类型的this
    "noImplicitThis": true,
    // 严格的检查空值
    "strictNullChecks": true
  }
}
```