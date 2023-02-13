---
title: 组件实例的核心属性——state
date: 2023/02/08
categories:
 - 前端
tags:
 - react
 - 组件
---

React组件实例中，有三个核心属性，分别是props、state和refs。

::: tip
首先介绍一个概念：React组件可以分为**简单组件**和**复杂组件**。

- 简单组件是指只有一个render方法的组件，复杂组件是指有生命周期方法的组件。
    - 也可以说，**简单组件是没有状态的组件，复杂组件是有状态的组件。**
- 而只有React组件实例才有props、state和refs这三个核心属性，也就是说，只有用class关键字定义的组件才有状态。
    - 从而，简单组件可能是类组件也可能是函数组件。但，复杂组件是必然是类组件。（React Hooks之前的版本）
    ::: warning
    `React 16.8+之后，提出了React Hooks，这使得复杂组件也可以是函数组件。`
    :::
---   

这就引出了，什么是状态?

> - 人————状态————影响————行为
> - 组件——-状态————影响————页面

开篇的时候说过，把数据交给了React，React生成了虚拟dom，进而展现真实dom。
- 这里所说的数据，要放在哪呢？就要放在状态中。
- 状态里面存着数据，数据改变了，就会影响页面的展示。
:::

## 概念

**状态**（state）：是组件中的一个对象，用来存储组件中的一些数据，这些数据可以在组件的生命周期中发生改变。

1. state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

## 示例

- 需求：实现一个现实天气信息的组件
    1. 默认展示天气炎热或凉爽
    2. 点击文案，切换天气

### 初步实现

```html
<script type="text/babel">
    let that;
    //1.创建组件
    class Weather extends React.Component{
        constructor(props){
            // super()：在constructor中，super()是调用父类的构造函数，用来新建父类的this对象。（必须要调用这个super，这是类的语法规定，同理，类组件也必须要调用super()
            super(props); // 调用父类的构造函数，是类组件必须调用的
            // 初始化状态
            this.state = { isHot:false }
            that = this;
        }

        render(){
            // 读取状态
            const {isHot} = this.state; // 解构赋值
            return <h1 onClick={changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<Weather/>,document.getElementById('test'))		
    
    // 切换天气的方法
    function changeWeather(){
        console.log(that.state.isHot); // 只能用that
    }
</script>
```

::: warning
这样写也能够实现功能：在组件外面写一个function函数，然后在组件内部调用这个function函数，这样就可以改变状态了。有几个问题需要我们思考：
1. this的指向问题:
- 在类组件外部，`function`函数中的`this`指向的是`undefined`，因为`babel`严格模式。(正常情况下的`function`函数的`this`指向的是`window`。) 所以我们还需要在类外部定义一个变量`that`，然后在类内部将`this`赋值给`that`，这样在类的外部才能调用类中`this`的指向。
- 另外，我们希望创建组件和渲染组件之外，没有那么多乱七八糟的代码在外部，所以我们可以把函数放在类组件的内部，这样也能避免`this`指向的问题了，因为都在组件内部定义的话，this指向的就很明确是这个组件实例。
2. 不能直接操作state对象来改变状态：不能直接`this.state.属性 = 值`
- 组件三大属性之一：`state`，我们需要通过`setState`来改变状态，而不是直接改变状态，因为直接改变状态，是不会触发组件的重新渲染的，所以我们需要通过`setState`来改变状态，这样才能触发组件的重新渲染。
:::

### 完整改造

```html
<script type="text/babel">
    //1.创建组件
    class Weather extends React.Component{
        //构造器调用几次？ ———— 1次（因为只new了一个weather实例）
        constructor(props){
            console.log('constructor');
            super(props)
            //初始化状态
            this.state = {isHot:false,wind:'微风'}
            //解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this)
        }

        //render调用几次？ ———— 1+n次：1是初始化的那次 n是状态更新的次数
        render(){
            console.log('render');
            //读取状态
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        //changeWeather调用几次？ ———— 点几次调几次
        changeWeather(){
            //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
            //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
            //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
            
            console.log('changeWeather');
            //获取原来的isHot值
            const isHot = this.state.isHot 
            //严重注意：状态必须通过setState进行更新, 且更新是一种合并，不是替换。
            this.setState({isHot:!isHot})
            console.log(this);

            //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
            //this.state.isHot = !isHot //这是错误的写法
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<Weather/>,document.getElementById('test'))		 
</script>
```

::: warning
1. 如果，我们的组件里有多个方法，难道我们要在`constructor`里写多个`this.方法名 = this.方法名.bind(this)`这种代码吗？这样肯定是不现实的。
    - 可以直接通过`变量名 = () => {}`的方式来定义方法，这样就不用在`constructor`里写了
    - 这种写法，也直接解决了this指向问题
2. 我们初始化状态的时候，也是在`constructor`里写的，如果我们有多个状态，那我们也要在`constructor`里写多个`this.state.属性 = 值`这种代码吗？
    - 在类中直接写`state = { 属性:值, ... }`，这样就不用在`constructor`里写了
:::

### 改造后的代码精简

```html
<script type="text/babel">
    //1.创建组件
    class Weather extends React.Component{
        state = {isHot:false,wind:'微风'}  //初始化状态

        render(){
            const {isHot,wind} = this.state; // 读取状态
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        // 自定义方法——要用赋值语句 + 箭头函数的方式定义
        changeWeather = () => {
            const isHot = this.state.isHot;  //获取原来的isHot值
            this.setState({isHot:!isHot})
            // console.log(this); //由于箭头函数没有this，会往外找，所以this指向的是Weather实例
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<Weather/>,document.getElementById('test'))		 
</script>
```