---
title: Vue简介
date: 2023/05/05
categories:
 - 前端
tags:
 - vue2.x
---

Vue —— 动态构建用户界面的渐进式JavaScript框架

作者: 尤雨溪

## 1.官网

- 英文官网: https://vuejs.org/
- 中文官网: https://cn.vuejs.org/

::: tip
官网是很好的学习素材，也拥有丰富的资源，尽情探索吧！
:::

## 2.特点

1. 遵循 MVVM 模式
2. 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
3. 它本身只关注 UI, 也可以引入其它第三方库开发项目
---
4. 借鉴 Angular 的模板和数据绑定技术
5. 借鉴 React 的组件化和虚拟 DOM 技术

## 3.代码讲解

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>初识Vue</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			初识Vue：
				1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
				2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
				3.root容器里的代码被称为【Vue模板】；
				4.Vue实例和容器是一一对应的；如果你想用两个容器，就写两个id选择器，写两个vue实例；
				5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
				6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
				7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

				注意区分：js表达式 和 js代码(语句)
						1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
									(1). a
									(2). a+b
									(3). demo(1)
									(4). x === y ? 'a' : 'b'

						2.js代码(语句)
									(1). if(){}
									(2). for(){}
		-->

		<!-- 准备好一个容器 -->
		<div id="demo">
			<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
		</div>

		<script type="text/javascript" >
			Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

			//创建Vue实例
			new Vue({
                // el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
				el:'#demo',  // el:'#demo' 等价于 el:document.getElementById('demo')，类选择器也可以使用，如：el:'.demo'，但是一般选择使用id选择器。

                // data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
				data:{ 
					name:'atguigu',
					address:'北京'
				}
			})

		</script>
	</body>
</html>
```