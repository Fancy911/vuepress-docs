---
title: Vue脚手架复习
date: 2023/05/15
categories:
 - 前端
tags:
 - vue2.x
 - vue-cli
---

## 1.脚手架文件结构
```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

## 2.main.js中的render函数

- main.js：是整个项目的入口文件。

- 曾分析main.js这个入口文件应该这样写：

    ```js
    import App from './App.vue'

    new Vue({
        el:'#root',
        template: `<App></App`,
        components:{App}
    })
    ```

但是在脚手架中，却是如下的样子，这是为什么呢？

```js
import Vue from 'vue' //引入Vue
import App from './App.vue' //引入App组件，它是所有组件的父组件

Vue.config.productionTip = false //关闭vue的生产提示

//创建Vue实例对象---vm
new Vue({
	el:'#app',
	//render函数完成了这个功能：将App组件放入容器中
    render: h => h(App),
}) 
```

如果我们执意按照我们的思路去写```template: `<App></App`, components:{App}```，控制台就会报以下的错:

> You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. 意思是：你正在使用vue的运行时版本，模板编译器不可用。要么预编译模板为渲染函数，要么使用编译器包含的版本。

这是因为，我们在main.js中使用了`import Vue from 'vue'`，而这个`vue`是`vue.runtime.xxx.js`，它是vue的运行时版本，它不包含模板解析器，所以不能使用`template`这个配置项。

1. `vue.js`与`vue.runtime.xxx.js`的区别：
    - `vue.js`是完整版的Vue。包含：核心功能 + 模板解析器。
    - `vue.runtime.xxx.js`是运行版的Vue。只包含：核心功能；没有模板解析器。
2. 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用`template`这个配置项，需要使用`render`函数接收到的`createElement`函数去指定具体内容。

脚手架中的这行代码：`render: h => h(App)`，完整版写法是:
```js
render: function(createElement){
    return createElement(App)
}
```
可以看出，这个`render`函数接收一个`createElement`函数作为参数，然后通过调用`createElement`函数，将`App`组件传入，从而将`App`组件渲染到页面上。`render: h => h(App)`是上述写法的箭头函数写法。

## 3.vue.config.js配置文件

1. 使用`vue inspect > output.js`可以查看到Vue脚手架的默认配置。
2. 使用`vue.config.js`可以对脚手架进行个性化定制，详情见：[https://cli.vuejs.org/zh](https://cli.vuejs.org/zh)

## 4.ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在**html标签**上获取的是**真实DOM元素**，应用在**组件标签**上是**组件实例对象（vc）**
3. 使用方式：
    - 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    - 获取：```this.$refs.xxx``` (可以通过控制台打印`this.$refs.xxx`来查看获取到的是什么)

## 5.props配置项

1. 功能：让组件接收外部传过来的数据
2. 传递数据：
```vue
<Demo name="xxx" :age="18"/>
```
::: tip
如果要传数字类型的数据，不能写成`age="18"`，这样会被Vue解析成字符串类型，

所以我们可以借助`v-bind`指令，因为`v-bind`指令会被vue解析**表达式**，所以我们写成`:age="18"`，这样就可以传递数字类型的数据了。
:::

3. 接收数据：
    - 第一种方式（只接收）：
    ```js
    props:['name', 'age']
    ```

    - 第二种方式（限制类型）：
    ```js
    props:{ 
        name:String,
        age:Number
    }
    ```

    - 第三种方式（限制类型、限制必要性、指定默认值）：
    ```js
    props:{
        name:{
            type:String, //类型
            required:true, //必要性
            default:'老王' //默认值
        },
        age:{
            type:Number,
            required:true,
            default:18
        }
    }
    ```

::: warning
注：`props`是只读的，Vue底层会监测你对`props`的修改，如果进行了修改，就会发出警告

若业务需求确实需要修改，那么请复制`props`的内容到`data`中一份，然后去修改`data`中的数据。

以下是`Student`组件的示例代码：

```js
<template>
	<div>
		<h2>学生姓名：{{myName}}</h2>
		<button @click="updateName">尝试修改我的年龄</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		props:{
			name:{
				type:String, //name的类型是字符串
				required:true, //name是必要的
			},
		}
		data() {
			console.log(this); // 此处打印的是vc实例对象
			return {
				myName: this.name
			}
		},
		methods: {
			updateName(){
				this.myName = "lzw"
			}
		},
	}
</script>
```
:::

## 6.mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    - 根目录下创建`mixin.js`文件
    ```js
    export const mixin1 = {
        methods: {
            showName(){
                alert(this.name)
            }
        },
        mounted() {
            console.log('你好啊！')
        },
    }
    export const mixin2 = {
        data() {
            return {
                x:100,
                y:200
            }
        },
    }
    ```

    - 使用混入：
        - 全局混入：在`main.js`中引入`mixin.js`，然后使用`Vue.mixin(xxx)`
        ```js
        Vue.mixin(mixin1)
        Vue.mixin(mixin2)
        ```
        - 局部混入：
        ```js
        export default {
            name:'Student',
            mixins:[mixin1, mixin2]
            data() {
                return {
                    ...
                }
            },
        }
        ```
3. 问题：当Mixin和组件中存在相同的data、生命周期钩子函数时，会如何处理？
    - 组件和Mixin中的数据：组件优先级更高，即：组件的数据会覆盖Mixin中的数据。
    - 生命周期钩子函数：Mixin中的钩子函数会先于组件的钩子函数执行。

## 7.plugins插件

1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件：在根目录下创建`plugins`文件夹，然后创建`myPlugin.js`文件，代码如下：
    ```js
    export default {
        install(Vue,x,y,z){
            console.log(Vue) // 此处打印的是Vue构造函数（vm实例对象的构造函数）
            console.log(x,y,z) // 1 2 3
            // 1. 添加全局过滤器
            Vue.filter(....)
        
            // 2. 添加全局指令
            Vue.directive(....)
        
            // 3. 配置全局混入(合)
            Vue.mixin(....)
        
            // 4. 添加实例方法
            Vue.prototype.$myMethod = function () {...}
            Vue.prototype.$myProperty = xxxx
        }
    }
    ```

4. 使用插件：在`main.js`中引入插件，然后使用`Vue.use(xxx)`来使用插件。
    ```js
    import myPlugin from './plugins/myPlugin'
    Vue.use(myPlugin, 1,2,3)
    ```

## 8.scoped样式

有时候，我们在两个组件里，写了同名的class样式，就会造成冲突，这时候我们可以使用`scoped`来解决这个问题。

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```