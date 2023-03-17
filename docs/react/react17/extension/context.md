---
title: Context
date: 2023/03/17
categories:
 - 前端
tags:
 - react
 - Context
---

## 理解

一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

## 使用

```js
1) 创建Context容器对象：
	
const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：

<xxxContext.Provider value={数据}>
    子组件
</xxxContext.Provider>
    
3) 后代组件读取数据：

//第一种方式:仅适用于类组件 
static contextType = xxxContext  // 声明接收context
this.context // 读取context中的value数据

//第二种方式: 函数组件与类组件都可以
<xxxContext.Consumer>
{
    value => ( // value就是context中的value数据
        要显示的内容
    )
}
</xxxContext.Consumer>
```

## 代码

```jsx
import React, { Component } from 'react'
import './index.css'

//创建Context对象
const MyContext = React.createContext()
// Provider和Consumer都是MyContext对象的属性
const {Provider, Consumer} = MyContext 

export default class A extends Component {

	state = {username:'tom',age:18}

	render() {
		const {username,age} = this.state
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				{/* 一般情况下，context中的数据是动态的，所以一般都是在Provider中传入一个动态的值 */}
				<Provider value={{username,age}}>
					<B/>
				</Provider>
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>我是B组件</h3>
				{/* B组件并未接收使用这个context，但是B组件的子组件C组件需要使用这个context */}
				<C/>
			</div>
		)
	}
}

/* class C extends Component {
	// 在C组件中国呢，声明接收context
	static contextType = MyContext
	render() {
		const {username,age} = this.context
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		)
	}
} */

function C(){
	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<Consumer>
				{value => `${value.username},年龄是${value.age}`}
			</Consumer>
			</h4>
		</div>
	)
}
```

## 注意

在应用开发中一般不用context, 一般都用它的封装react插件