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


1. this的指向问题
- 在类组件外部，function 函数中的 this指向的是undefined，因为babel严格模式。正常情况下的function函数的this指向的是window。
- super()：在constructor中，super()是调用父类的构造函数，用来新建父类的this对象。（必须要调用这个super，这是类的语法规定，同理，类组件也必须要调用super()


```html
<script type="text/babel">
    //1.创建组件
    class Weather extends React.Component{
        
        //构造器调用几次？ ———— 1次
        constructor(props){
            console.log('constructor');
            super(props)
            //初始化状态
            this.state = {isHot:false,wind:'微风'}
            //解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this)
        }

        //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
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
            //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
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