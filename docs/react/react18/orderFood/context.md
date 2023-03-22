---
title: Context的使用
date: 2023/03/21
categories:
 - 前端
tags:
 - Context
 - useContext
 - react
 - 实战
---

我们在开发项目的过程中发现，`React`中组件间的数据通信是通过`props`进行的，父组件给子组件设置`props`，子组件给后代组件设置`props`，`props`在组件间自上向下（父传子）的逐层传递数据。

但并不是所有的数据都适合这种传递方式，有些数据需要在多个组件中共同使用，如果还通过`props`一层一层传递，麻烦自不必多说。
---
`Context`为我们提供了一种在不同组件间共享数据的方式，它不再拘泥于`props`刻板的逐层传递，而是在 <strong style="color:#dd4d40">外层组件中统一设置，设置后内层所有的组件都可以访问到Context中所存储的数据</strong>。

换句话说`Context`类似于 JS 中的**全局作用域**，可以将一些公共数据设置到一个同一个`Context`中，使得所有的组件都可以访问到这些数据。

## 创建Context

```js
import React from 'react';

const MyContext = React.createContext(defaultValue);
React.createContext(defaultValue)
```

用来创建一个`Context`对象，它需要一个初始值作为参数，这个初始值可以是一个原始值，也可以是一个JS对象。

调用以后，方法将会返回一个`Context`对象，这个对象非常关键，当我们想在其他组件中访问`Context`中的数据时，必须要通过这个对象。

由于`Context`对象需要在不同的组件中被使用，所以通常我们会将`Context`对象设置到一个单独的模块中并设置为默认导出像是这样：

```jsx
import React from "react";

const TestContext = React.createContext({
    name:'孙悟空',
    age:18,
    gender:'男',
    sayHello:()=>{
        alert(this.name);    
    }
});

export default TestContext;
```

在这个案例中我们暴露的数据比较简单，就是一个简单的JS对象，其中包含了三个属性和一个方法，并最中将产生的`Context`对象作为默认模块向外部导出。

## 访问Context中的数据

如果想访问到`Context`中的数据，我们需要先将`Context`引入到当前组件中，然后通过`Context`对象访问其中的数据。

### 方式一：通过`Consumer`标签访问`Context`中的数据

```jsx
import React from 'react';

// 1. 访问Context首先我们需要引入之前创建的Context
import TestContext from '../store/test-context';

const MyComponent = () => {
    return (
        // Context对象中有一个属性叫做Consumer，直译过来为消费者，如果你了解生产消费者模式这里就比较好理解了，
        // 如果没接触过，你可以将Consumer理解为数据的获取工具。你可以将它理解为一个特殊的组件，所以你需要这样使用它：
        <TestContext.Consumer>
            { /* Consumer的标签体必须是一个函数，这个函数会在组件渲染时调用并且将Context中存储的数据作为参数传递进函数，该函数的返回值将会作为组件被最终渲染到页面中。这里我们将参数命名为了ctx，在回调函数中我们就可以通过ctx.xxx访问到Context中的数据。如果需要访问多个Context可以使用多个Consumer嵌套即可。*/
            {(ctx)=>{
                return (
                    <ul>
                        <li>{ctx.name}</li>
                        <li>{ctx.age}</li>
                        <li>{ctx.gender}</li>
                    </ul>
                );
            }}
        </TestContext.Consumer>

    );
};

export default MyComponent;
```

### 方式二：通过`useContext()`钩子函数访问`Context`中的数据

通过`Consumer`使用`Context`实在是不够优雅，所以React还为我们提供了一个钩子函数`useContext()`.

我们只需要将`Context`对象作为参数传递给钩子函数，它就会直接给我们返回`Context`对象中存储的数据。

```jsx
import React, {useContext} from 'react';
import TestContext from '../store/test-context';

const MyComponent = () => {

    const ctx = useContext(TestContext);

    return (
        <ul>
            <li>{ctx.name}</li>
            <li>{ctx.age}</li>
            <li>{ctx.gender}</li>
        </ul>
    );
};

export default MyComponent;
```
---

## 设置Context中的数据——`Provider`

像上边那样使用`Context`并不十分常见，因为这种方式中`Context`的值是写死的，并不是在组件中指定的。

所以React还提供了`Provider`，用来在组件中指定`Context`值：

```jsx
import React from "react";
import MyComponent from "./component/MyComponent";
import TestContext from "./store/test-context";

const App = () => {
    return 
        <TestContext.Provider value={{name:'猪八戒', age:28, gender:'男'}}>
            <MyComponent/>
        </TestContext.Provider>;
};

export default App;
```

`Provider`译为生产者，和`Consumer`消费者对应。
- Provider会设置在外层组件中，通过value属性来指定Context的值。
- 这个Context值在所有的Provider子组件中都可以访问。
- Context的搜索流程和JS中函数作用域类似，当我们获取Context时，React会在它的外层查找最近的Provider，然后返回它的Context值。
- 如果没有找到Provider，则会返回Context模块中设置的默认值。