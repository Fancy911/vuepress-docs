---
title: Promise基本使用
date: 2023/02/24
categories:
 - 前端
tags:
 - promise
---

## promise 的基本使用

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>基本使用</title>
    <!-- 引入 bootstrap 样式 -->
    <link crossorigin='anonymous' href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h2 class="page-header">Promise初体验</h2>
        <button class="btn btn-primary" id="btn">点击抽奖</button>
    </div>
    <script>
        //生成随机数
        function rand(m,n){
            return Math.ceil(Math.random() * (n-m+1)) + m-1;
        }
        /**
            点击按钮,  1s 后显示是否中奖(30%概率中奖)
                若中奖弹出    恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券
                若未中奖弹出  再接再厉
        */
        //获取元素对象
        const btn = document.querySelector('#btn');
        //绑定单击事件
        btn.addEventListener('click', function(){
            //定时器
            // setTimeout(() => {
            //     //30%  1-100  1 2 30
            //     //获取从1 - 100的一个随机数
            //     let n = rand(1, 100);
            //     //判断
            //     if(n <= 30){
            //         alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券');
            //     }else{
            //         alert('再接再厉');
            //     }
            // }, 1000);

            // Promise 形式实现
            // Promise是一个构造函数，可以 new Promise() 得到一个 Promise 的实例
            // 它需要接收一个函数作为参数，这个函数的两个参数分别是 resolve 和 reject
            // resolve 解决
            // reject  拒绝
            // resolve和reject都是函数类型的数据
            const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    //30%  1-100  1 2 30
                    //获取从1 - 100的一个随机数
                    let n = rand(1, 100);
                    //判断
                    if (n <= 30) {
                        resolve(n); // 调完这个resolve之后，会将promise对象的状态设置为『成功』
                    }
                    else {
                        reject(n); // 调完这个reject之后，会将promise对象的状态设置为『失败』
                    }
                }, 1000);
            });

            console.log(p);
            // 调用 then 方法，第一个回调是成功的回调，第二个回调是失败的回调
            // resolve 和 reject 传递的数据，都会传递给 then 的回调函数
            // value 是 resolve 传递的数据， reason 是 reject 传递的数据
            p.then((value) => {
                alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 ' + value);
            }, (reason) => {
                alert('再接再厉, 您的号码为 ' + reason);
            });

        });
    </script>
</body>
</html>
```
::: tip
更多示例请查看 [Promise基本使用]()
:::