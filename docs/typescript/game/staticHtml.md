---
title: 实现整个游戏的静态页面
date: 2023/02/06
categories:
 - 前端
tags:
 - typescript
 - 面向对象
 - 游戏
---

在`src/index.html`中实现项目静态页面

## 实现思路
1. 在`body`中创建一个`h1`标签作为游戏的标题
2. 创建一个`div`作为游戏的主容器`id="main"`
    - 在`main`中创建一个`div`作为游戏的舞台`id="stage"`
        - 在`stage`中创建`id="snake"`的`div`作为蛇
        - 在`stage`中创建`id="food"`的`div`作为食物
    - 在`main`中创建一个`div`作为游戏的分数`id="score-panel"`
        - 一个`div`作为分数`id="score"`
        - 一个`div`作为等级`id="level"`

## 实现代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ts贪吃蛇</title>
</head>
<body>
    <h1>贪吃蛇</h1>

    <!-- 创建游戏的主容器 -->
    <div id="main">
        <!-- 设置游戏的主舞台 -->
        <div id="stage">
            <!-- 设置蛇的容器 -->
            <div id="snake">
                <!-- 蛇是一节一节方块组成的，每吃到一个事物，小方块多一个，每一个div就是蛇的一节身体 -->
                <div></div>
            </div>
            <!-- 设置食物 -->
            <div id="food">
                <!-- 通过4个小div设置食物的造型 -->
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
          
        <!-- 设置游戏的积分面板 -->
        <div id="score-panel">
            <div>
                SCORE: <span id="score">0</span>
            </div>
            <div>
                LEVEL: <span id="level">1</span>
            </div>
        </div>
    </div>
</body>
</html>
```