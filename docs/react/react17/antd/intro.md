---
title: React组件库antd
date: 2023/03/12
categories:
 - 前端
tags:
 - react
 - Ant Design
---

ant-design(国内蚂蚁金服)
1. [官网](https://ant.design/index-cn)
2. [Github](https://github.com/ant-design/ant-design/)

material-ui(国外)
1. [官网](http://www.material-ui.com/#/)
2. [Github](https://github.com/callemall/material-ui)


## antd的按需引入+自定主题

### 1.安装依赖

```bash
yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
```

### 2.修改`package.json`

```json
....
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
....
```

### 3.根目录下创建`config-overrides.js`

```js
//配置具体的修改规则
const { override, fixBabelImports,addLessLoader} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': 'green' },
        }
    }),
);
```
> 按需引入后，就不再需要在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'`应该删掉