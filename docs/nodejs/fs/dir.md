---
title: fs文件夹操作
date: 2023/04/04
categories:
 - 前端
 - 后端
tags:
 - fs
 - node内置模块
---

借助Node.js的能力，我们可以对文件夹进行`创建`、`读取`、`删除`等操作

| 方法                                 | 说明                |
| ----------------------------------- | -----------------  |
| mkdir / mkdirSync                   | 异步 / 同步创建文件夹 |
| readdir / readdirSync               | 异步 / 同步读取文件夹 |
| rmdir / rmdirSync                   | 异步 / 同步删除文件夹 |

## `mkdir/mkdirSync` 创建文件夹

- 语法:
    ```js
    fs.mkdir(path[, options], callback)
    fs.mkdirSync(path[, options])
    ```
- 参数说明:
    ```bash
    path 文件夹路径
    options 选项配置( 可选 )
    callback 操作后的回调
    ```
- 示例代码:

```js
// 异步创建page文件夹
fs.mkdir('./page', err => { 
    if(err) throw err; 
    console.log('创建成功');
});

// 递归异步创建，多层级
// 必须要加上 { recursive: true } 这个配置选项
fs.mkdir('./a/b/c', { recursive: true }, err => {
    if(err) throw err;
    console.log('递归创建成功'); 
});

// 递归同步创建文件夹
fs.mkdirSync('./x/y/z', {recursive: true});
```

## `readdir/readdirSync` 读取文件夹

- 语法:
    ```js
    fs.readdir(path[, options], callback)
    fs.readdirSync(path[, options])
    ```
- 参数说明:
    ```bash
    path 文件夹路径
    options 选项配置( 可选 )
    callback 操作后的回调
    ```
- 示例代码:
    ```js
    //异步读取
    fs.readdir('./论语', (err, data) => {
        if(err) throw err;
        console.log(data); // [ '座右铭.txt', '我的座右铭.txt' ] - 读取出来的是文件夹中的文件列表数组
    });

    //同步读取
    let data = fs.readdirSync('./论语'); 
    console.log(data);
    ```
## `rmdir/rmdirSync` 删除文件夹

- 语法:
    ```js
    fs.rmdir(path[, options], callback)
    fs.rmdirSync(path[, options])
    ```
- 参数说明:
    ```bash
    path 文件夹路径
    options 选项配置( 可选 ) 
    callback 操作后的回调
    ```
- 示例代码:
    ```js
    // 异步删除文件夹 
    fs.rmdir('./page', err => {
        if(err) throw err;
        console.log('删除成功'); 
    });

    // 异步递归删除文件夹，与创建文件夹时的配置选项一致，需要加上 { recursive: true }
    // 这样就能把a文件夹下的所有文件和文件夹都删除了
    // 否则是无法删除的，会报错，说文件夹不为空
    /* fs.rmdir('./a', {recursive: true}, err => {
        if(err) {
            console.log(err);
        }
        console.log('递归删除') 
    }); */

    // ======== 现在已经不建议使用rmdir这种方式了，建议使用rm ========
    fs.rm('./a', {recursive: true}, err => {
        if(err) {
            console.log(err);
        }
        console.log('递归删除') 
    });

    // 同步递归删除文件夹
    fs.rmdirSync('./x', {recursive: true})
    ```