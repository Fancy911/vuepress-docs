---
title: rendeProps
date: 2023/03/18
categories:
 - 前端
tags:
 - react
 - rendeProps
---

## 如何向组件内部动态传入带内容的结构(标签)?

- Vue中: 
  - 使用slot技术, 也就是通过组件标签体传入结构  
    - ```jsx
      <A>
        <B/>
      </A>
      ```
- React中:
  - 使用children props: 通过组件标签体传入结构
  - 使用render props: 通过组件标签属性传入结构，而且可以携带数据，一般用- - - render函数属性

## children props形式

如下这种形式，将B组件写作A组件的标签体，可以形成父子组件关系。

```jsx
<A>
  <B>xxxx</B>
</A>
{this.props.children}
```

但是，我们会发现，如果想让A组件的数据传入B中，这样是做不到的。

## render props

```JSX

<A render={ (data) => <C data={data}></C> }></A>
A组件: {this.props.render(内部state数据)}
C组件: 读取A组件传入的数据显示 {this.props.data} 
```

### 完整示例代码

```JSX
import React, { Component } from 'react'
import './index.css'
import C from '../1_setState'

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A render={(name)=><C name={name}/>}/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{this.props.render(name)}
			</div>
		)
	}
}

// class B extends Component {
// 	render() {
// 		console.log('B--render');
// 		return (
// 			<div className="b">
// 				<h3>我是B组件,{this.props.name}</h3>
// 			</div>
// 		)
// 	}
// }
```