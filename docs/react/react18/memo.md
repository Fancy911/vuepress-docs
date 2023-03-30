---
title: React.memo
date: 2023/03/30
categories:
 - 前端
tags:
 - memo
 - react
---

React组件会在两种情况下发生重新渲染。第一种，当组件自身的`state`发生变化时。第二种，当组件的父组件重新渲染时。第一种情况下的重新渲染无可厚非，`state`都变了，组件自然应该重新进行渲染。但是第二种情况似乎并不是总那么的必要。

我们来看一个`demo`，现有如下三个组件，分别为`App组件`、`A组件`和`B组件`：

### App组件

```jsx
const App = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>App —— {count}</h2>
            <button onClick={clickHandler}>增加</button>

            <A/>
        </div>
    );
};
```

### A组件

```jsx
const A = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
      setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>组件A -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            <B/>
        </div>
    );
};

export default A;
```

### B组件

```jsx
const B = () => {
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default B;
```

三个组件的引用关系为，`A组件`是`App`的子组件、`B组件`是`A组件`的子组件：`App –> A –> B`

当`App组件`发生重新渲染时，`A和B组件`都会发生重渲染。当`A组件`重新渲染时，`B组件`也会重新渲染。

`B组件`中没有state，甚至连`props`都没有设置。换言之，`B组件`无论如何渲染，每次渲染的结果都是相同的，虽然重渲染并不会应用到真实DOM上，但很显然这种渲染是完全没有必要的。

为了减少像`B组件`这样组件的渲染，`React`为我们提供了一个方法`React.memo()`。

该方法是一个高阶函数，可以用来根据组件的`props`对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的`props`没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。

现在对上述案例中的B组件进行如下修改：

```jsx
const B = () => {
    console.log('B渲染');
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

/*
*   React.memo() 是一个高阶组件
*       它接收另一个组件作为参数，并且会返回一个包装过的新组件
*       包装过的新组件就会具有缓存功能，
*           包装过后，只有组件的props发生变化化
*           才会触发组件的重新的渲染，否则总是返回缓存中结果
* */
export default React.memo(B);
```

修改后的代码中，并没有直接将`B组件`向外导出，而是在`B组件`外层套了一层函数`React.memo()`，这样一来，返回的**`B组件`就增加了缓存功能**，只有当`B组件`的`props`属性发生变化时，才会触发组件的重新渲染。`memo`只会根据`props`判断是否需要重新渲染，和`state`和`context`无关，`state`或`context`发生变化时，组件依然会正常的进行重新渲染。