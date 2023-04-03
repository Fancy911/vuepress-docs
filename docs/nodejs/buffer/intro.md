---
title: Buffer介绍
date: 2023/04/03
categories:
 - 前端
 - 后端
tags:
 - buffer
---

## 1.概念

Buffer中文翻译为【缓冲区】，是一个类似于Array的<strong style="color:red">对象</strong>，用于表示固定长度的字节序列

换句话说，Buffer就是一段固定长度的内存空间，用于处理<strong style="color:red">二进制数据</strong>。

## 2.特点

1. Buffer**大小固定**且无法调整
2. Buffer性能较好，可以直接对计算机内存进行操作
3. Buffer中的每个元素的大小为1字节(byte) [8 bit = 1 byte]