---
title: 实现静态页面的样式
date: 2023/02/06
categories:
 - 前端
tags:
 - typescript
 - 面向对象
 - 游戏
---

## 实现样式

在`src/style/index.less`中实现静态页面的样式，先按设计图将整体的布局搭建出来，然后再对每个元素进行样式的调整。实现好一个完全静态的页面，然后再在后续的Ts中增加对页面中的元素进行交互。

```less
// 设置变量
@bg-color: #fff3b7;

// 清除默认样式
* {
    // 使盒子模型的宽高包含padding和border
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #7371babb;
    margin: 70px auto; // 上下左右居中
}
h1 {
    font-family: Hannotate  SC;
    text-align: center;
    color: #fff;
    font-size: 38px;
    font-weight: 600;
    margin-bottom: 10px;
}

// 设置主窗口的样式
#main {
    width: 320px;
    height: 450px;
    background-color: @bg-color;
    margin: 0px auto; // 上下左右居中
    border: 10px solid #333; // 边框
    border-radius: 20px; 

    // 开启弹性盒模型
    display: flex;
    // 设置主轴方向
    flex-direction: column;
    // 设置副轴的对齐方式
    align-items: center;
    // 设置主轴的对齐方式
    justify-content: space-around;

    // 游戏舞台
    #stage {
        width: 274px;
        height: 344px;
        border: 2px solid #333; // 边框
        position: relative; // 开启相对定位

        #snake {
            &>div {
                width: 10px;
                height: 10px;
                background-color: #333;
                border: 1px solid @bg-color;
                // 开启绝对定位：蛇是相对于stage定位的
                position: absolute;
            }
        }

        #food {
            width: 10px;
            height: 10px;
            // 开启绝对定位：食物也是相对于stage定位的
            position: absolute;
            left: 40px;
            top: 100px;
            display: flex;
            flex-flow: row wrap; // 设置弹性盒子的排列方式：行排列，自动换行
            justify-content: space-between; // 设置主轴的对齐方式
            align-items: space-between; // 设置副轴的对齐方式

            &>div{
                width: 4px;
                height: 4px;
                background-color: #333;

                transform: rotate(45deg); // 使我们的食物的4个小方块旋转一下
                // border: 1px solid @bg-color;
            }
        }
    }
    // 游戏积分面板
    #score-panel {
        font: bold 20px "Comic Sans MS";
        width: 264px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
```

## 引入样式
在`src/index.ts`中引入样式文件，这样就可以在页面中看到我们的样式了。

```ts
import './style/index.less';
```