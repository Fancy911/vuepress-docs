---
title: React脚手架中的代理配置
date: 2023/03/07
categories:
 - 前端
tags:
 - react
 - proxy
---

## 前置说明

前端代码启动在3000端口，后端代码启动在5000端口，直接发送请求的话，会出现跨域问题，所以需要配置代理。

## 方法1：配置`package.json`

- 在`package.json`中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：
1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。如果还想请求其他服务器的资源，那么就不支持了。
3. 工作方式：上述方式配置代理，当请求了3000端口不存在的资源时，那么该请求会转发给5000端口 （优先匹配前端自己就有的资源）


## 方法2：`setupProxy.js`文件

1. 第一步：创建代理配置文件

```
在src下创建配置文件：src/setupProxy.js，注意，setupProxy.js这个名字不要写错
```

2. 编写setupProxy.js配置具体代理规则：

```js
const proxy = require('http-proxy-middleware') // 引入代理中间件，react脚手架已经为我们安装好了这个库

module.exports = function(app) {
    app.use(
        // proxy接收两个参数：
        // 1. 请求前缀，比如：/api1是需要被转发的请求前缀，表示所有带有 /api1 前缀的请求都会转发给5000
        // 2. 配置对象
        proxy('/api1', 
            {  
                target: 'http://localhost:5000', // 配置转发目标地址(能返回数据的服务器地址)
                changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
                /*
                    changeOrigin设置为true时，服务器收到的请求头中的 host为：localhost:5000
                    changeOrigin设置为false时，服务器收到的请求头中的 host为：localhost:3000
                    changeOrigin默认值为false，但我们一般将changeOrigin值设为true，
                    但不管是true还是false，最终都是由后台服务器来决定是否重写host，
                    所以，如果后台服务器没有重写host，那么前端配置的changeOrigin值是什么都无所谓
                    都不影响我们的请求
                */
                pathRewrite: {'^/api1': ''} // 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置！！！)
            }
        ),
        proxy('/api2', { 
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
        })
    )
}
```

说明：
1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。