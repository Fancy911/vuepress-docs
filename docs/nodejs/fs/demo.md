---
title: fs综合案例-批量重命名文件
date: 2023/04/03
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

我们要对文件夹中的文件列表，进行重命名，1-文件名 这种 改成01-文件名。
```js
[
    '1-座右铭1.txt',
    '2-座右铭2.txt',
    '3-座右铭3.txt',
    '4-座右铭4.txt',
    '5-座右铭5.txt',
    '6-座右铭6.txt',
    '7-座右铭7.txt',
    '8-座右铭8.txt',
    '9-座右铭9.txt',
    '10-座右铭10.txt',
    '11-座右铭11.txt',
    '12-座右铭12.txt',
]
```

```js
// 导入 fs 模块
const fs = require('fs');

// 读取code文件夹中的文件列表
const files = fs.readdirSync('./code');

// 遍历文件列表数组
files.forEach( item => {
    // 拆分文件名和后缀
    let data = item.split('-');

    let [num, name] = data; 

    // 分情况重命名，1-9的前面加0
    if( Number(num) < 10 ) {
        num = '0' + num;
    }

    // 创建新的文件名
    let newName = num + '-' + name;

    // 重命名
    fs.renameSync(`./code/${item}`, `./code/${newName}`)
})
```