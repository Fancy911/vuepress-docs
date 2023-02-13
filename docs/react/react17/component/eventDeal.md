---
title: React中的事件处理
date: 2023/02/13
categories:
 - 前端
tags:
 - react
 - 组件
---

## 概念

1.	通过`onXxx`属性指定事件处理函数(注意大小写)
    - `React`使用的是自定义(合成)事件, 而不是使用的原生`DOM`事件
    eg：原生的点击事件是`onclick`，而在`React`中是`onClick`，因为`React`对原生的`onclick`事件做了再次封装，做了一些兼容性的处理
    - `React`中的事件是通过事件委托方式处理的(委托给组件最外层的元素)——性能优化（为了高效）

2.	通过`event.target`得到发生事件的`DOM`元素对象——勿过度使用`refs`
    - 我们的示例中，第二个输入框就可以通过这个`event.target`来得到发生事件的`DOM`元素对象，从而得到输入框的值。
        - 什么时候提示？失去焦点时提示。
        - 谁失去焦点？输入框
        - 失去焦点之后提示的是谁的数据？还是这个输入框
    也就是说，发生事件的`DOM`元素（发生事件的元素） 和 我们要提示的数据所在的`DOM`元素对象（你要操作的元素） 是同一个
    此时，`ref`就可以不写了，就可以直接使用`event`传入，`event.target`就是发生事件的`DOM`元素对象

```html{15-17,24}
<script type="text/babel">
	//创建组件
    class Demo extends React.Component{
        //创建ref容器
        myRef = React.createRef()
        myRef2 = React.createRef()

        //展示左侧输入框的数据
        showData = (event)=>{
            console.log(event.target);
            alert(this.myRef.current.value);
        }

        //展示右侧输入框的数据
        showData2 = (event)=>{
            alert(event.target.value);
        }
        
        render(){
            return(
                <div>
                    <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                    <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                    <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
                </div>
            )
        }
    }
    //渲染组件到页面
    ReactDOM.render(<Demo />,document.getElementById('test'))
</script>
```