---
title: Axios发送AJAX请求案例
date: 2023/02/22
categories:
 - 前端
tags:
 - react
 - ajax
 - axios
---

想具体了解`axios`的使用，可以参考[axios-Github官网](https://github.com/axios/axios)，并查看axios部分的文档，本小节只是简单的介绍一下axios是如何发送ajax请求的。

## get请求

```js
axios.get('/axios-server', {
    //url 参数
    params: {
        id: 100,
        vip: 7
    },
    //请求头信息
    headers: {
        name: 'lizhiwei',
        age: 25
    }
}).then(res => {
    console.log(res);
});
```

## post请求

```js
axios.post('/axios-server', 
    //请求体参数
    {
        username: 'admin',
        password: 'admin'
    },
    {
        // url参数
        params: {
            id: 100,
            vip: 7
        }, 
        //请求头参数
        headers: {
            height: 180,
            weight: 180,
        },
    }
).then(res => {});
```

## 通用请求

```js
axios({
    //请求方法
    method : 'POST',
    //url
    url: '/axios-server',
    //url参数
    params: {
        vip:10,
        level:30
    },
    //头信息
    headers: {
        a:100,
        b:200
    },
    //请求体参数
    data: {
        username: 'admin',
        password: 'admin'
    }
}).then(response=>{
    //响应状态码
    console.log(response.status);
    //响应状态字符串
    console.log(response.statusText);
    //响应头信息
    console.log(response.headers);
    //响应体
    console.log(response.data);
})
```

## 具体示例

- [客户端代码示例](https://github.com/Fancy911/ajax-learning-demo/tree/main/3.axios-ajax)
- [服务端代码示例](https://github.com/Fancy911/ajax-learning-demo/blob/main/server.js)