---
title: 架木板游戏
date: 2023/02/07
categories:
 - 前端
tags:
 - typescript
 - 游戏
 - cocos
---

## 1. 架木板核心玩法介绍
<img src='./imgs/image.png' width="45%">
<img src='./imgs/image1.png' width="45%">

有点类似于微信的跳一跳。

### a.独立开发者如何获取素材和资源
通过爬取别人apk里面的资源弄出来。

### b.如何找游戏

七麦数据：把各国畅销榜的游戏列出。
- .ipa（苹果）
- 谷歌商店：apk （安卓）

这个游戏是用什么游戏引擎做的？
- 大部分游戏是Unity做的
- AssetStudioGUI.exe ： 3D模型(fbx文件)、字体、声音、UI、Shader能抓出来

### c.架木板的逻辑
生成楼宇 ——> 按住屏幕 ——> 木板生长 ——> 手指离开屏幕后 ——> 木板倒下
- ——> 如果木板的长度够 ——> 就能走到下一个楼宇
- ——> 如果木板的长度不够 ——> 那么游戏结束

## 游戏引擎和TypeScript介绍就略了