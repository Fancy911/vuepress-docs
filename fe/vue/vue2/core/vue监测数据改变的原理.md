---
title: Vue监测数据改变的原理
date: 2023/05/09
categories:
 - 前端
tags:
 - vue2.x
 - 监测数组改变
 - 监测对象改变
 - Vue.set()
---

## 1.问题 & 现象

```html{39}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>更新时的一个问题</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>人员列表</h2>
			<button @click="updateMei">更新马冬梅的信息</button>
			<ul>
				<li v-for="(p,index) of persons" :key="p.id">
					{{p.name}}-{{p.age}}-{{p.sex}}
				</li>
			</ul>
		</div>

		<script type="text/javascript">
			Vue.config.productionTip = false
			
			const vm = new Vue({
				el:'#root',
				data:{
					persons:[
						{id:'001',name:'马冬梅',age:30,sex:'女'},
						{id:'002',name:'周冬雨',age:31,sex:'女'},
						{id:'003',name:'周杰伦',age:18,sex:'男'},
						{id:'004',name:'温兆伦',age:19,sex:'男'}
					]
				},
				methods: {
					updateMei(){
						// this.persons[0].name = '马老师' //奏效
						// this.persons[0].age = 50 //奏效
						// this.persons[0].sex = '男' //奏效
						// this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
						this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'}) // 奏效，Vue封装了常用的数组方法，可以直接使用，可以触发视图更新
					}
				}
			}) 
		</script>
</html>
```

## Vue监测**对象数据**改变的原理

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Vue监测数据改变的原理</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
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
				address:'北京',
				student:{
					name:'tom',
                    // 我们下面自己实现的监测数据改变的方法，只能监测到一层数据的改变，如果是多层数据的改变，就不行了
                    // 而Vue内部实现的监测数据改变的方法，通过递归，可以监测到多层数据的改变，为每一层的数据都加上了getter和setter
					age:{
						rAge:40,
						sAge:29,
					},
				}
			}
		})
	</script>
</html>
```

### 模拟一个最简单的数据监测

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<script type="text/javascript">
			let data = {
				name:'尚硅谷',
				address:'北京',
			}

			// 创建一个监视的实例对象，用于监视data中属性的变化
			const obs = new Observer(data)		
			console.log(obs)	

			// 准备一个vm实例对象
			let vm = {}
			vm._data = data = obs

			function Observer(obj){
				// 汇总对象中所有的属性形成一个数组
				const keys = Object.keys(obj)
				// 遍历
				keys.forEach((k)=>{
					Object.defineProperty(this,k,{
						get(){
							return obj[k]
						},
						set(val){
							console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
							obj[k] = val
						}
					})
				})
			}
		</script>
	</body>
</html>
```
### Vue.set()方法

在讲解Vue的数据监测原理之前，我们先来看一个Vue提供的方法：`Vue.set()`，这个方法可以用来给对象添加属性，也可以用来给数组添加元素。

#### 给对象添加新属性触发视图更新

为什么需要用这个方法来给对象添加属性呢？

因为，在vue中，如果直接给对象添加属性，那么这个属性是不会被监测的，也就是说，如果这个属性的值发生了改变，那么页面是不会重新渲染的。

比如下面的例子：

```js
let student = {
    name:'tom',
    age:18,
}
```

如果我想让页面呈现学生的这些属性，那么我可以这样写：

```html
<h3>姓名：{{student.name}}</h3>
<h3>年龄：{{student.age}}</h3>
```

但是如果，我现在想直接新增一个sex属性 `student.sex = '男'` ，然后把模板改写为

```html
<h3>姓名：{{student.name}}</h3>
<h3>年龄：{{student.age}}</h3>
<h3 v-if="student.sex">性别：{{student.sex}}</h3>
```

是不会触发视图的重新渲染的。我们必须通过Set方法`this.$set(this.student,'sex','男')`，来为这个student对象添加sex属性，才会触发视图的更新。

#### 改变数组元素值触发视图更新

假设有一个属性，是数组形式

```js
data() {
    return {
        hobby: ['吃饭','睡觉','打豆豆']
    }
}

<h3>兴趣：{{ hobby }}</h3>
```

通过`hobby[1] = '学习'` 这种方式，是触发不了视图的更新的，就需要使用Set函数。 `this.$set(this.hobby, 1, '学习')`，这样就可以触发视图的更新了。

## Vue监测**数组数据**改变的原理

我们知道，能使原数组发生改变的方法有这么几个：
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
而 Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新

## Vue监视数据的原理总结

1. vue会监视data中所有层次的数据。

2. 如何监测对象中的数据？
    - 通过setter实现监视，且要在new Vue时就传入要监测的数据。
        - (1).对象中后追加的属性，Vue默认不做响应式处理
        - (2).如需给后添加的属性做响应式，请使用如下API：
            `Vue.set(target，propertyName/index，value)` 或  `vm.$set(target，propertyName/index，value)`

3. 如何监测数组中的数据？
    - 通过包裹数组更新元素的方法实现，本质就是做了两件事：
        - (1).调用原生对应的方法对数组进行更新。
        - (2).重新解析模板，进而更新页面。

4. 在Vue修改数组中的某个元素一定要用如下方法：
    1. 使用这些API: `push()、pop()、shift()、unshift()、splice()、sort()、reverse()`
    2. `Vue.set()` 或 `vm.$set()`

- 特别注意：`Vue.set()` 和 `vm.$set()` 不能给vm或vm的 **根数据对象** 添加属性！！！

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>总结数据监视</title>
		<style>
			button{
				margin-top: 10px;
			}
		</style>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h1>学生信息</h1>
			<button @click="student.age++">年龄+1岁</button> <br/>
			<button @click="addSex">添加性别属性，默认值：男</button> <br/>
			<button @click="student.sex = '未知' ">修改性别</button> <br/>
			<button @click="addFriend">在列表首位添加一个朋友</button> <br/>
			<button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
			<button @click="addHobby">添加一个爱好</button> <br/>
			<button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
			<button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
			<h3>姓名：{{student.name}}</h3>
			<h3>年龄：{{student.age}}</h3>
			<h3 v-if="student.sex">性别：{{student.sex}}</h3>
			<h3>爱好：</h3>
			<ul>
				<li v-for="(h,index) in student.hobby" :key="index">
					{{h}}
				</li>
			</ul>
			<h3>朋友们：</h3>
			<ul>
				<li v-for="(f,index) in student.friends" :key="index">
					{{f.name}}--{{f.age}}
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			data:{
				student:{
					name: 'tom',
					age: 18,
					hobby: ['抽烟','喝酒','烫头'],
					friends:[
						{ name:'jerry', age:35 },
						{ name:'tony', age:36 }
					]
				}
			},
			methods: {
				addSex(){
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				},
				addFriend(){
					this.student.friends.unshift({name:'jack',age:70})
				},
				updateFirstFriendName(){
					this.student.friends[0].name = '张三' // 此处是可以直接修改的，因为操作的是friend数组中，第一个对象的，对象的属性，所以能直接修改引起重新渲染
				},
				addHobby(){
					this.student.hobby.push('学习') // 对于数组而言，就必须使用vue封装好的这几个方法，才能引起视图重新渲染
				},
				updateHobby(){
					// this.student.hobby.splice(0,1,'开车')
					// Vue.set(this.student.hobby,0,'开车')
					this.$set(this.student.hobby,0,'开车')
				},
				removeSmoke(){
					this.student.hobby = this.student.hobby.filter((h)=>{
						return h !== '抽烟'
					})
				}
			}
		})
	</script>
</html>
```