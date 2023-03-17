---
title: 基本理解与使用
date: 2023/02/08
categories:
 - 前端
tags:
 - react
 - 组件
---

- React开发者工具：[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-CN) （科学上网才能正常打开哟～）

（安装和使用方式不再赘述）

> 回顾一下组件:
> 得包含 html css js 其他各类资源……

::: warning
组件名必须大写开头，否则会报错。
渲染组件时，不能省略组件标签的闭合标签，否则会报错。`<MyComponent/>`
:::

## 函数式组件

```html
<script type="text/babel">
    //1.创建函数式组件
    function MyComponent(){
        //此处的this是undefined，因为babel编译后开启了严格模式，禁止这种自定义的函数里的this指向window
        console.log(this); 
        return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
</script>
```

- 分析：执行了`ReactDOM.render(<MyComponent/>.......`之后，发生了什么？
    1. React解析组件标签，找到了`MyComponent`组件。
    2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。

## 类式组件

> 学习类式组件之前，可以自行回顾一下类的基本语法。可以参考这里 [Ts中的类](https://fancy911.github.io/vuepress-docs/docs/typescript/oop/class.html)

类式组件：
    1. 必须继承React.Component
    2. 必须实现render方法
    3. render方法中必须返回一个虚拟DOM


```html
<script type="text/babel">
    //1.创建类式组件
    class MyComponent extends React.Component {
        // render是放在哪里的？
        // 答：放在MyComponent这个类的原型对象上，供实例使用。
        // 那这个类的实例在哪呢？看起来在这没有new过实例呀？
        // 这就要说到ReactDOM.render(<MyComponent/>.......之后，发生了什么？
        // React会自动new出来一个MyComponent的实例，并调用该实例的render方法。
        render(){
            // render中的this是谁？
            // 是 MyComponent这个类的实例对象 <=> MyComponent组件实例对象。
            console.log('render中的this:',this);
            // 打印结果如下：
            // context: {}
            // props: {}
            // refs: {}
            // state: null
            // updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
            // _reactInternalFiber: FiberNode {tag: 1, key: null, stateNode: MyComponent, elementType: ƒ, type: ƒ, …}
            // _reactInternalInstance: {_processChildContext: ƒ}
            // isMounted: (...)
            // replaceState: (...)
            return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>, document.getElementById('test'))
</script>
```

- 分析：执行了`ReactDOM.render(<MyComponent/>.......`之后，发生了什么？
    1. `React`解析组件标签，找到了`MyComponent`组件。
    2. 发现组件是使用类定义的，随后`new`出来该类的实例，并通过该实例调用到原型上的`render`方法。
    3. 将`render`返回的虚拟`DOM`转为真实`DOM`，随后呈现在页面中。
---

- 观察`console.log('render中的this:',this);`的打印结果：
    1. 思考：我们明明没有给MyComponent写构造器，为什么它的实例化对象有state、context、props、refs这一系列属性呢？
    - 这就是React.Component的作用了，它是一个基类，它的实例化对象有这些属性，而我们自己写的类继承了它，所以也有这些属性。
---

- 明确几个概念：
    1. `MyComponent`从类的层面来看，是一个继承了`React.Component`这个类的一个类，而在`ReactDOM.render(<MyComponent/>.......`的过程中，`new`出来了该类的实例，我们称之为`MyComponent`这个类的实例对象
    2. 但是我们是在组件中，所以我们一般把 `MyComponent这个类的实例对象` 叫做 `MyComponent组件实例对象`。