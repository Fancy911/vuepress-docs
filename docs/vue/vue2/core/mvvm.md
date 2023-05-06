---
title: MVVM模型
date: 2023/05/06
categories:
 - 前端
tags:
 - vue2.x
 - MVVM
---

1. M: 模型（Model）：对应data中的数据
2. V: 视图（View）：对应模板（template）
3. VM: 视图模型（ViewModel）：Vue实例对象

<img src="./imgs/mvvm.png">

<img src="./imgs/mvvm2.png">

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>理解MVVM</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			MVVM模型
				1. M：模型(Model) ：data中的数据
				2. V：视图(View) ：模板代码
				3. VM：视图模型(ViewModel)：Vue实例
			观察发现：
				1.data中所有的属性，最后都出现在了vm身上。
				2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h1>学校名称：{{name}}</h1>
			<h1>学校地址：{{address}}</h1>
			<h1>测试一下1：{{1+1}}</h1>
			vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
			<h1>测试一下2：{{$options}}</h1>
			<h1>测试一下3：{{$emit}}</h1>
			<h1>测试一下4：{{_c}}</h1>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			// data中的数据，最后都出现在了vm身上
			data:{
				name:'尚硅谷',
				address:'北京',
				a: 1
			}
		})
		console.log(vm)
	</script>
</html>
```