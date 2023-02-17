---
title: 生命周期
date: 2023/02/17
categories:
 - 前端
tags:
 - react
 - 生命周期
---

## 用小需求引出生命周期
- 需求:定义组件实现以下功能：
    1. 让指定的文本一直自行做显示 / 隐藏的渐变动画
    2. 从完全可见，到彻底消失，耗时2S
    3. 点击"不活了"按钮从界面中卸载组件

### 初始化组件

```html
<script type="text/babel">
    //创建组件
    class Life extends React.Component{
        render(){
            console.log('render');
            return(
                <div>
                    <h2>React学不会怎么办？</h2>
                    <button>不活了</button>
                </div>
            )
        }
    }
    //渲染组件
    ReactDOM.render(<Life/>,document.getElementById('test'))
</script>
```

### 实现

生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数

```html
<script type="text/babel">
    //创建组件
    class Life extends React.Component{
        state = {
            opacity:1
        }

        //点击按钮卸载组件
        death = () => {
            // 卸载组件
            ReactDOM.unmountComponentAtNode(document.getElementById('test'))
        }
        
        // componentDidMount：组件挂载完成后调用，只调用一次。
        componentDidMount(){
            console.log('componentDidMount');
            this.timer = setInterval(()=>{
                // 获取当前的透明度
                let opacity = this.state.opacity
                // 透明度减小
                opacity -= 0.1
                // 判断当前的透明度是否小于0.1
                if (opacity <= 0) {
                    opacity = 1
                }
                this.setState({
                    opacity
                })
            },200)
        }

        // componentWillUnmount：组件卸载前调用，只调用一次
        componentWillUnmount(){
            console.log('componentWillUnmount');
            // 清除定时器
            clearInterval(this.timer)
        }

        // render什么时候调用？ 1. 初始化渲染 2. 状态更新
        render(){
            console.log('render');
            // // 因为状态一直在改变，render一直在执行，所以定时器放这里，会导致定时器一直在执行
            // setInterval(()=>{
            //     // 获取当前的透明度
            //     let opacity = this.state.opacity
            //     // 透明度减小
            //     opacity -= 0.1
            //     // 判断当前的透明度是否小于0.1
            //     if (opacity <= 0) {
            //         opacity = 1
            //     }
            //     this.setState({
            //         opacity
            //     })
            // },200)
            return(
                <div>
                    <h2 style={{opacity:this.state.opacity}}>React学不会怎么办？</h2>
                    <button onClick={this.death}>不活了</button>
                </div>
            )
        }
    }
    //渲染组件
    ReactDOM.render(<Life/>,document.getElementById('test'))
```
## 生命周期理解

1.	组件从创建到死亡它会经历一些特定的阶段。
2.	React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。
3.	我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 旧版生命周期

> 旧版生命周期：16.8之前的版本

旧版生命周期中，有三个状态：挂载、更新、卸载

<img src="./imgs/react生命周期(旧).png" alt="react生命周期(旧)">

1. 挂载阶段: 由ReactDOM.render()触发——初次渲染
    - `constructor()`
    - `componentWillMount()`
    - `render()` ======> ✅常用
    - `componentDidMount()` ======> ✅常用：一般在这个钩子中做一些初始化的事情，例如：开启定时器，发送网络请求，订阅消息等
2. 更新阶段: 由组件内部`this.setSate()` 或 父组件重新render触发
    - `componentWillReceiveProps()`: 组件将要接收到新的属性, 只有在父组件重新render时才会调用
    - `shouldComponentUpdate()`: `setState()`中有状态发生变化后，组件是否应该重新渲染，返回`true/false`
        - 如果返回`true`，继续执行下面的生命周期
        - 如果返回`false`，不再执行下面的生命周期，组件不会重新渲染
        - 不写`shouldComponentUpdate()`这个钩子时，默认返回`true`
    - `componentWillUpdate()`: 组件将要更新，只调用一次
        - 强制更新：`this.forceUpdate()`时，不会调用`shouldComponentUpdate()`，会直接调用`componentWillUpdate()`
    - `render()`: 组件重新渲染 ======> ✅常用
    - `componentDidUpdate()`: 组件更新完成，只调用一次
3. 卸载组件: 由`ReactDOM.unmountComponentAtNode()`触发
    - `componentWillUnmount()` ======> ✅常用：一般在这个钩子中做一些清理、收尾的事情，例如：清除定时器，取消订阅消息等


 #### 示例讲解-初始代码

实现一个组件，点击button，持续+1 

```html
<script type="text/babel">
    //创建组件
    class Count extends React.Component{
        // 初始化状态
        state = {
            count:0
        }

        //加1按钮的回调
        add = () => {
            //获取原状态
            const {count} = this.state
            //更新状态
            this.setState({count:count+1})
        }

        render(){
            const {count} = this.state
            return(
                <div>
                    <h2>当前求和为：{count}</h2>
                    <button onClick={this.add}>点我+1</button>
                </div>
            )
        }
    }
    //渲染组件
    ReactDOM.render(<Count/>,document.getElementById('test'))
</script>
```

#### 示例讲解-给上述代码赋予生命周期

```html
<script type="text/babel">
    //创建组件
    class Count extends React.Component{
        // 构造器
        constructor(props){
            console.log('Count---constructor');
            super(props)
            // 初始化状态
            this.state = {count:0}
        }

        //加1按钮的回调
        add = ()=>{
            //获取原状态
            const {count} = this.state
            //更新状态
            this.setState({count:count+1})
        }

        //卸载组件按钮的回调
        death = () => {
            ReactDOM.unmountComponentAtNode(document.getElementById('test'))
        }

        //强制更新按钮的回调
        force = () => {
            this.forceUpdate()
        }

        //组件将要挂载的钩子
        componentWillMount(){
            console.log('Count---componentWillMount');
        }

        //组件挂载完毕的钩子
        componentDidMount(){
            console.log('Count---componentDidMount');
        }

        //组件将要卸载的钩子
        componentWillUnmount(){
            console.log('Count---componentWillUnmount');
        }
 
        //控制组件更新的“阀门”
        shouldComponentUpdate(){
            console.log('Count---shouldComponentUpdate');
            return true
        }

        //组件将要更新的钩子
        componentWillUpdate(){
            console.log('Count---componentWillUpdate');
        }

        //组件更新完毕的钩子
        componentDidUpdate(){
            console.log('Count---componentDidUpdate');
        }

        render(){
            console.log('Count---render');
            const {count} = this.state
            return(
                <div>
                    <h2>当前求和为：{count}</h2>
                    <button onClick={this.add}>点我+1</button>
                    <button onClick={this.death}>卸载组件</button>
                    <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                </div>
            )
        }
    }
    
    //父组件A  
    class A extends React.Component{
        //初始化状态
        state = {
            carName:'奔驰'
        }

        changeCar = ()=>{
            this.setState({
                carName:'奥拓'
            })
        }

        render(){
            return(
                <div>
                    <div>我是A组件</div>
                    <button onClick={this.changeCar}>换车</button>
                    {/* 渲染子组件B */}
                    <B carName={this.state.carName}/>
                </div>
            )
        }
    }
    
    //子组件B
    class B extends React.Component{
        //组件将要接收新的props的钩子
        componentWillReceiveProps(props){
            console.log('B---componentWillReceiveProps',props);
            // 注意！！！！第一次接收到父组件传过来的props时，不会触发这个钩子
            // 只有当父组件传过来的props发生改变时，才会触发这个钩子
        }

        //控制组件更新的“阀门”
        shouldComponentUpdate(){
            console.log('B---shouldComponentUpdate');
            return true
        }
        //组件将要更新的钩子
        componentWillUpdate(){
            console.log('B---componentWillUpdate');
        }

        //组件更新完毕的钩子
        componentDidUpdate(){
            console.log('B---componentDidUpdate');
        }

        render(){
            console.log('B---render');
            return(
                <div>我是B组件，接收到的车是:{this.props.carName}</div>
            )
        }
    }
    
    //渲染组件
    ReactDOM.render(<Count/>,document.getElementById('test'))
</script>
```

### 新版生命周期

> 新版生命周期：16.8+ 之后的版本
> 新版本里也能用旧版本的钩子，但是不推荐使用
> 以下几个钩子都希望你加上UNSAFE_前缀
>   - UNSAFE_componentWillMount()
>   - UNSAFE_componentWillReceiveProps()
>   - UNSAFE_componentWillUpdate()    
> 旧版生命周期的钩子将在17.0+版本中被废弃

<img src="./imgs/react生命周期(新).png" alt="react生命周期(新)">

```bash{3,8,11}
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
    1.	constructor()
    2.	getDerivedStateFromProps()：静态方法，不需要实例化就可以调用，这个钩子的使用频率是极低的，我们做一个简单了解即可
    3.	render()
    4.	componentDidMount() =====> 常用
                一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
    1.	getDerivedStateFromProps()
    2.	shouldComponentUpdate()
    3.	render()
    4.	getSnapshotBeforeUpdate()：这个钩子的使用频率也是极低的
    5.	componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
    1.	componentWillUnmount()  =====> 常用
                一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
```

```html
<script type="text/babel">
    //创建组件
    class Count extends React.Component{
        //构造器
        constructor(props){
            console.log('Count---constructor');
            super(props)
            //初始化状态
            this.state = {count:0}
        }

        //加1按钮的回调
        add = () => {
            //获取原状态
            const {count} = this.state
            //更新状态
            this.setState({count:count+1})
        }

        //卸载组件按钮的回调
        death = () => {
            ReactDOM.unmountComponentAtNode(document.getElementById('test'))
        }

        //强制更新按钮的回调
        force = () => {
            this.forceUpdate()
        }
        
        /* 为什么要加static？
            - 静态方法不需要实例化就可以调用。
            - 因为这个方法不能写在给组件实例上用的，所以要加一个static
        */
        // 其实把这个钩子翻译过来，就是从props那里等到一个派生的state
        static getDerivedStateFromProps(props,state){
            console.log('getDerivedStateFromProps',props,state);
            // getDerivedStateFromProps必须返回一个对象
            //  1. 返回null，表示不需要更新state
            //  2. 返回一个对象，这个对象会被合并到state中
            // getDerivedStateFromProps的返回值会覆盖掉state的值
            return null

            // 比如此处return了state中的count
            // return {count:109}
            // 是会直接改变state中的count的值，但是它也不再会通过button按钮来改变了

            // 但如果，我们接收一个参数props，在下面渲染组件的时候，传入一个count的值
            // 那么此时可以使用getDerivedStateFromProps，并且可以通过props来改变state中的count（state的值在任何时候都取决于props）
            // return props
        }

        // 什么是快照？任何东西都能作为返回的快照
        // 在更新之前获取快照：一般用于获取更新前的DOM信息
        getSnapshotBeforeUpdate(){
            console.log('getSnapshotBeforeUpdate');
            return 'atguigu'
        }

        //组件挂载完毕的钩子
        componentDidMount(){
            console.log('Count---componentDidMount');
        }

        //组件将要卸载的钩子
        componentWillUnmount(){
            console.log('Count---componentWillUnmount');
        }

        //控制组件更新的“阀门”
        shouldComponentUpdate(){
            console.log('Count---shouldComponentUpdate');
            return true
        }

        //组件更新完毕的钩子
        // preProps:更新前的props
        // preState:更新前的state
        // snapshotValue: 从getSnapshotBeforeUpdate()中返回的值
        componentDidUpdate(preProps,preState,snapshotValue){
            console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
        }
        
        render(){
            console.log('Count---render');
            const {count} = this.state
            return(
                <div>
                    <h2>当前求和为：{count}</h2>
                    <button onClick={this.add}>点我+1</button>
                    <button onClick={this.death}>卸载组件</button>
                    <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
                </div>
            )
        }
    }
    
    //渲染组件
    ReactDOM.render(<Count count={199}/>,document.getElementById('test'))
</script>
```

#### 一个getSnapshotBeforeUpdate的例子

- 做一个新闻列表的展示

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>4_getSnapShotBeforeUpdate的使用场景</title>
	<style>
		.list{
			width: 200px;
			height: 150px;
			background-color: skyblue;
			overflow: auto;
		}
		.news{
			height: 30px;
		}
	</style>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/17.0.1/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/17.0.1/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/17.0.1/babel.min.js"></script>

	<script type="text/babel">
		class NewsList extends React.Component{
			state = {newsArr:[]}
			componentDidMount(){
				setInterval(() => {
					//获取原状态
					const {newsArr} = this.state
					//模拟一条新闻
					const news = '新闻'+ (newsArr.length+1)
					//更新状态
					this.setState({newsArr:[news,...newsArr]})
				}, 1000);
			}

			getSnapshotBeforeUpdate(){
				return this.refs.list.scrollHeight
			}

			componentDidUpdate(preProps,preState,height){
				this.refs.list.scrollTop += this.refs.list.scrollHeight - height
			}

			render(){
				return(
					<div className="list" ref="list">
						{
							this.state.newsArr.map((n,index)=>{
								return <div key={index} className="news">{n}</div>
							})
						}
					</div>
				)
			}
		}
		ReactDOM.render(<NewsList/>,document.getElementById('test'))
	</script>
</body>
</html>
```

## 生命周期总结

### 重要的勾子

1. `render`：初始化渲染或更新渲染调用
2. `componentDidMount`：开启监听, 发送ajax请求
3. `componentWillUnmount`：做一些收尾工作, 如: 清理定时器

### 即将废弃的勾子

1. `componentWillMount`
2. `componentWillReceiveProps`
3. `componentWillUpdate`
现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。

