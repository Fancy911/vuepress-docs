---
title: React Hooks
date: 2023/03/17
categories:
 - 前端
tags:
 - react
 - stateHooks
 - refHooks
 - effectHooks
---

## 1.React Hook/Hooks是什么?

1. `Hook`是`React 16.8.0` + 版本增加的新特性/新语法
2. 可以让你在**函数组件**中使用 `state` 以及其他的 React 特性

::: details 回顾函数组件
特点：

1. 无状态state
2. 不能使用`this`
3. 没有生命周期函数
4. 性能比类组件好

```js
<script type="text/babel">
    // 1.创建函数式组件
    function MyComponent(){
        // 此处的this是undefined，因为babel编译后开启了严格模式，禁止这种自定义的函数里的this指向window
        console.log(this); 
        return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
    }
    // 2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
</script>
```

在没有hooks之前，函数组件只能用于定义简单组件，不能使用state和生命周期函数，因为函数组件没有this，也没有生命周期函数，所以只能用于定义简单组件，不能用于定义复杂组件。

> 简单组件：只有render函数，没有state和生命周期函数的组件
:::

## 2.三个常用的Hook

1. `State Hook`: `React.useState()`
2. `Effect Hook`: `React.useEffect()`
3. `Ref Hook`: `React.useRef()`

### (1)`State Hook`

1. `State Hook`让函数组件也可以有`state`状态, 并进行状态数据的读写操作
2. 语法: 
    ```js
    const [xxx, setXxx] = React.useState(initValue)
    ```
3. `useState()`说明:
    - 参数: 第一次初始化指定的值在内部作缓存
    - 返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数

4. `setXxx()`的2种写法:
    - `setXxx(newValue)`: 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
    - `setXxx(value => newValue)`: 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

### (2)`Effect Hook`

1. `Effect Hook`可以让你在函数组件中执行副作用操作 ( 用于模拟类组件中的生命周期钩子 ) 
2. React中的副作用操作:
    - 发ajax请求数据获取
    - 设置订阅 / 启动定时器
    - 手动更改真实DOM

3. 语法和说明: 
    ```js
    useEffect(() => { 
        // 在此可以执行任何带副作用操作
        ... ...

        // return的函数是在组件卸载前执行
        // 类似于componentWillUnmount
        return () => { 
            // 在此做一些收尾工作, 比如 清除定时器 / 取消订阅 等
        }
    }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    ```
    - 如果指定的是`[]`, `useEffect`传入的回调函数只会在第一次`render()`后执行
    - 如果指定了`stateValue`, 只有当`stateValue`发生变化时才会执行回调函数
    - 如果指定了两个`state`值，比如`[stata1, stata2]`, 那么就是当 `stata1` 或 `stata2` 发生变化时，都会执行回调函数
    
4. 可以把 useEffect Hook 看做如下三个函数的组合
    ```js
    componentDidMount()
    componentDidUpdate()
    componentWillUnmount()
    ```

### (3)`Ref Hook`

1. `Ref Hook`可以在 函数组件 中 存储/查找 组件内的标签或任意其它数据
2. 语法:
    ```js
    const refContainer = useRef()
    ```
3. 作用: 保存标签对象,功能与`React.createRef()`一样

## 全部代码

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// 函数式组件
function Demo(){
	console.log('Demo'); // Demo函数会调用 1 + n次，n是状态值的变化次数

	// React.useState()返回的是一个数组
	// 数组的第一个元素是状态值,第二个元素是更新状态值的函数
	// React.useState()传入的参数是初始状态值
	const [count, setCount] = React.useState(0); // count是状态值，setCount是更新状态值的函数
	// console.log(count,setCount); // 0 ƒ (state) { [native code] }
	
	const myRef = React.useRef(); // myRef是一个容器，可以用来存储任何值

	React.useEffect(()=>{
		let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)
		// 这里的return是一个函数，这个函数会在组件卸载前执行
		// 类似于componentWillUnmount
		return ()=>{
			clearInterval(timer)
		}
	},[])

	//加的回调
	function add(){
		// setCount(count+1) //第一种写法，直接传入一个新的状态值
		setCount(count => count+1) // 第二种写法，传入一个函数，函数的返回值是新的状态值
		// 这里有点像setState，但是不完全一样
	}

	//提示输入的回调
	function show(){
		alert(myRef.current.value)
	}

	//卸载组件的回调
	function unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	return (
		<div>
			<input type="text" ref={myRef}/> {/* input框绑定ref */}
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示数据</button>
		</div>
	)
}

export default Demo
```