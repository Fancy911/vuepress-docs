---
title: 数据代理
date: 2023/05/06
categories:
 - 前端
tags:
 - vue2.x
 - MVVM
 - Object.defineProperty
---

## 1.回顾Object.defineProperty方法

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>回顾Object.defineproperty方法</title>
	</head>
	<body>
		<script type="text/javascript" >
			let number = 18
			let person = {
				name:'张三',
				sex:'男',
			}
            // 通过Object.defineProperty方法给person对象添加age属性
            // 但这样添加的age属性是不可枚举的，且不可修改，不可删除，并且在控制台会看到它是半透明的颜色字样
            // Object.defineProperty(person,'age',{
			// 	value:18,
			// })

            // 如何让它能够被枚举，且可以修改，可以删除呢？
            // Object.defineProperty(person,'age',{
			// 	value:18,
            //     enumerable:true, //控制属性是否可以枚举，默认值是false
			// 	writable:true, //控制属性是否可以被修改，默认值是false
			// 	configurable:true //控制属性是否可以被删除，默认值是false
			// })

            // 使用getter和setter，让person的age属性可以被读取和修改，并和number变量保持同步
			Object.defineProperty(person,'age',{
				//当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
				get(){
					console.log('有人读取age属性了')
					return number
				},

				//当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
				set(value){
					console.log('有人修改了age属性，且值是',value)
					number = value
				}

			})
			// console.log(Object.keys(person))
			console.log(person)
		</script>
	</body>
</html>
```

## 2.什么是数据代理

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>何为数据代理</title>
	</head>
	<body>
		<!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）-->
		<script type="text/javascript" >
			let obj = {x:100}
			let obj2 = {y:200}

			Object.defineProperty(obj2,'x',{
				get(){
					return obj.x
				},
				set(value){
					obj.x = value
				}
			})
		</script>
	</body>
</html> 
```

## 3.Vue中的数据代理

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Vue中的数据代理</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
            1.Vue中的数据代理：
                通过 vm对象 来代理 data对象 中属性的操作（读/写）
            2.Vue中数据代理的好处：
                更加方便的操作data中的数据
            3.基本原理：
                通过 Object.defineProperty() 把data对象中所有属性添加到vm上。
                为每一个添加到vm上的属性，都指定一个getter/setter。
                在getter/setter内部去操作（读/写）data中对应的属性。
		 -->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>学校名称：{{name}}</h2>
			<h2>学校地址：{{address}}</h2>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
		
		const vm = new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
				address:'宏福科技园'
			}
		})
	</script>
</html>
```