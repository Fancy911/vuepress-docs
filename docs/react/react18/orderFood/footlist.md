---
title: FontAwesome图标字体
date: 2023/03/21
categories:
 - 前端
tags:
 - FontAwesome
 - react
 - 实战
---

在制作APP的过程中，我们使用到了 + - 商品数量的按钮，这些按钮都是使用的图片，但是图片的大小是固定的，如果我们需要改变按钮的大小，那么图片也需要重新制作，这样就会造成很多的图片资源，所以我们可以使用字体图标来代替图片，这样就可以实现按钮大小的改变，而不需要重新制作图片。

本节我们使用 FontAwesome 图标字体来实现 + - 按钮。

## FontAwesome图标字体

### 安装依赖

```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
或
yarn add @fortawesome/react-fontawesome@latest @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

### 组件中使用

```js
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // 引入FontAwesomeIcon组件
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";  // 引入图标
        
// 使用组件
<FontAwesomeIcon icon={faPlus}/>
<FontAwesomeIcon icon={faMinus}/>
```