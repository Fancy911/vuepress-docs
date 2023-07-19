---
title: 组件实例的三大核心属性——refs
date: 2023/02/13
categories:
 - 前端
tags:
 - react
 - 组件
---

## 概念

组件内的标签可以定义ref属性来标识自己。

## 基本代码写法

1. 字符串形式的ref
    
```html
<input type="text" ref="myInput"/>
```

> 但是，字符串形式的refs已经过时了，不推荐使用，它可能会在后续的版本中被废除。

2. 回调函数形式的ref
    
```html
<input type="text" ref={(currentNode) => {this.input = currentNode}}/>
```
> ref回调函数的参数，就是这个ref当前表示的标签对象。
> 比如我们去打印`<input type="text" ref={(a) => {console.log(a)}}/>`，我们会发现，打印结果就是这个input标签对象。

3. createRef形式的ref
    
```html
myRef = React.createRef();

<input type="text" ref={this.myRef}/>
```

## 示例需求

自定义组件，功能实现两个输入框：
1. 点击按钮，提示第一个输入框中的内容
2. 当第二个输入框失去焦点时，提示第二个输入框中的内容

### 实现-字符串形式的refs

```html
<script type="text/babel">
    //创建组件
    class Demo extends React.Component{
        //展示左侧输入框的数据
        showData = ()=>{
            // console.log(this); // this指向组件实例对象，可以通过this.refs获取到组件内的标签，打印后我们会发现，this的refs对象中，有我们标识的input1和input2两组key-value
            const { input1 } = this.refs
            alert(input1.value)
        }
        //展示右侧输入框的数据
        showData2 = ()=>{
            const { input2 } = this.refs
            alert(input2.value)
        }
        render(){
            return(
                <div>
                    <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                    <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                    <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
                </div>
            )
        }
    }
    //渲染组件到页面
    ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

### 实现-回调形式的refs

```html
<script type="text/babel">
    //创建组件
    class Demo extends React.Component{
        //展示左侧输入框的数据
        showData = ()=>{
            const {input1} = this
            alert(input1.value)
        }
        //展示右侧输入框的数据
        showData2 = ()=>{
            const {input2} = this
            alert(input2.value)
        }
        render(){
            return(
                <div> 
                    <input ref={ c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
                    <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                    <input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
                </div>
            )
        }
    }
    //渲染组件到页面
    ReactDOM.render(<Demo />,document.getElementById('test'))
</script>
```

### 实现-createRef形式的refs

```html
<script type="text/babel">
    //创建组件
    class Demo extends React.Component{
        /* 
            React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的，只能存储一个节点
        */
        myRef = React.createRef()
        myRef2 = React.createRef()
        //展示左侧输入框的数据
        showData = ()=>{
            alert(this.myRef.current.value);
        }
        //展示右侧输入框的数据
        showData2 = ()=>{
            alert(this.myRef2.current.value);
        }
        render(){
            return(
                <div>
                    <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                    <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                    <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
                </div>
            )
        }
    }
    //渲染组件到页面
    ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```