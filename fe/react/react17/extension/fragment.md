---
title: Fragment
date: 2023/03/17
categories:
 - 前端
tags:
 - react
 - Fragment
---

### 使用

```jsx
<Fragment><Fragment> : 可以传key值，但是不能接受其他任何属性，因为它不是一个真实的DOM元素，在编译后会被React编译成一个空的标签，相当于直接被干掉了这个标签，可以理解为这个标签只是为了适应jsx语法规定的，它不是一个真实的DOM元素。

也可以使用空标签代替Fragment
<></>： 不允许传任何属性和key
```

```jsx
import React, { Component,Fragment } from 'react'

export default class Demo extends Component {
	render() {
		return (
			<Fragment key={1}>
				<input type="text"/>
				<input type="text"/>
			</Fragment>
		)
	}
}
```

### 作用

> 可以不用必须有一个真实的DOM根标签了 (因为jsx语法规定，return的jsx必须有一个根标签)