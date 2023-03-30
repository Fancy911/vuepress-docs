---
title: useReducer
date: 2023/03/29
categories:
 - 前端
tags:
 - reducer
 - useReducer
 - react
 - 实战
---

在React的函数组件中，我们可以通过`useState()`来创建`state`。这种创建`state`的方式会给我们返回两个东西`state`和`setState()`。`state`用来读取数据，而`setState()`用来设置修改数据。但是这种方式也存在着一些不足，因为所有的修改`state`的方式都必须通过`setState()`来进行，如果遇到一些复杂度比较高的`state`时，这种方式似乎就变得不是那么的优雅。

举个例子，在《汉堡点餐APP》的练习中，`App.js`中有一个`state`叫做`cartData`用来存储购物车数据。但是这个数据本身是比较复杂的，它包括了多个属性：

```jsx
// 创建一个state，用来存储购物车的数据
// *   1.商品 [] items
// *   2.商品总数（totalAmount）
// *   3.商品总价（totalPrice）
const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0
});
```
同时**购物车**也需要**多个操作方法**: **添加食物**、**删除食物**、**清除购物车**，而`useState()`只给我们提供了一个`setCartData()`方法，所以我们不得不在继续创建出三个不同的方法以实现出不同的功能：

```jsx
// 创建一个函数，用来添加商品到购物车，这个函数将会被传递给MealItem组件的+号button
const addMealIntoCart = (mealItem) => {
    // 1. 先复制一份购物车数据
    const newCartData = {...cartData};

    // 2. 判断购物车中是否已经有该商品\
    const existedMealsItem = newCartData.items.find(item => item.id === mealItem.id);

    // 如果购物车中已经有该商品
    if (existedMealsItem) {
        existedMealsItem.amount += 1;
    }
    // 如果购物车中没有该商品
    else {
        newCartData.items.push(mealItem);
        mealItem.amount = 1;
    }

    // 3. 更新购物车总数据
    newCartData.totalAmount += 1;
    newCartData.totalPrice += mealItem.price;

    // 4. 更新购物车状态
    setCartData(newCartData);
};

// 创建一个函数，用来减少购物车中的商品，这个函数将会被传递给MealItem组件的-号button
const subMealOuterCart = (mealItem) => {
    // 1. 先复制一份购物车数据
    const newCartData = {...cartData};
    // 2. 减少当前商品的数量
    mealItem.amount -= 1;
    // 3. 判断当前商品的数量是否为0，如果为0，则从购物车中删除该商品
    if (mealItem.amount === 0) {
        newCartData.items = newCartData.items.filter(item => item.id !== mealItem.id);
    }
    // 4. 更新购物车总数据
    newCartData.totalAmount -= 1;
    newCartData.totalPrice -= mealItem.price;
    // 5. 更新购物车状态
    setCartData(newCartData);
};

// 清空购物车
const clearCart = () => {
    // 1. 先复制一份购物车数据  
    const newCartData = {...cartData};
    // 2. 将购物车中的商品数量设置为0
    newCartData.items.forEach(item => item.amount = 0);
    newCartData.items = [];
    newCartData.totalAmount = 0;
    newCartData.totalPrice = 0;
    // 3. 更新购物车状态
    setCartData(newCartData);
};
```

这三个函数定义在了`App.jsx`中，是操作`cartData`的三个函数。就这带来一些问题，首先，三个方法都是操作`cartData`的，但是它们被定义在`App.jsx`中和其他的函数混杂在了一起，维护起来并不方便。其次，三个方法并不是`App.jsx`自己调用，而是通过`Context`传递给其他组件调用，由于是三个函数所以我们不得不在`Context`中分别传递三个属性，也不方便。再有，如果后期我需要再添加新的功能，依然不可避免的要定义新的函数，并且修改`Context`。总之，就是各种不便利，这种不便还会随着项目复杂的提升而增加。

## `Reducer`横空出世

为了解决复杂`State`带来的不便，React为我们提供了一个新的使用`State`的方式 —— `Reducer`

`reduce`单词中文意味减少，而`Reducer`我觉得可以翻译为: “当你的`State`的过于复杂时，你就可以使用的可以对`State`进行整合的工具”。当然这是个玩笑话，个人认为`Reducer`可以翻译为“整合器”，它的作用就是将那些和同一个`State`相关的所有函数都整合到一起，方便在组件中进行调用。

当然工具都有其使用场景，`Reducer`也不例外，它只**适用于那些比较复杂的`State`**，对于简单的`State`使用`Reducer`只能是徒增烦恼。但是由于初学，我们会先用一个简单的案例来对其进行演示，实际应用我们后边会以`cartData`作为演示。

和`State`类似，`Reducer`也是一个钩子函数，使用方法也比较类似，基本语法是：

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它的返回值和`useState()`类似:是一个数组，数组中有两个值，分别是：
- 第一个： `state`用来读取`state`的值
- 第二个：和`useState()`类似，也是一个函数，不同于`setState()`这个函数我们可以称它是一个“派发器”，通过它可以向`reducer()`发送不同的指令，控制`reducer()`做不同的操作。

它的参数有三个，第三个我们暂且忽略，只看前两个。
- `reducer()`: 是一个函数，也是我们所谓的“整合器”。它的返回值会成为新的`state`值。当我们调用`dispatch()`时，`dispatch()`会将消息发送给`reducer()`，`reducer()`可以根据不同的消息对`state`进行不同的处理。
- `initialArg`: 就是`state`的初始值，和`useState()`参数一样。


具体用法我们在demo示例里写：

```jsx{3,30-45}
import React, {useReducer, useState} from 'react';

// 为了避免reducer会重复创建，通常reducer会定义到组件的外部
const countReducer = (state, action) => {
    // console.log('reducer执行了！', state);
    // console.log(action.type);
    // 可以根据action中不同type来执行不同的操作
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
};

const App = () => {
    // useState的写法
    // const [count, setCount] = useState(1);
    //
    // const addHandler = () => {
    //     setCount(prevState => prevState + 1);
    // };
    //
    // const subHandler = () => {
    //     setCount(prevState => prevState - 1);
    // };

    // useReducer(reducer, initialArg, init)
    /*
    *   一、useReducer的参数：
    *       1. reducer : 整合函数
    *           对于我们当前state的所有操作都应该在该函数中定义
    *            - 该函数的返回值，会成为state的新值
    *           reducer在执行时，会收到两个参数：
    *               - state：当前最新的state
    *               - action：它需要一个对象，在这个对象中会存储dispatch所发送的指令
    *       2. initialArg : state的初始值，作用和useState()中的值是一样
    *   二、useReducer的返回值：和useState类似，也是一个数组
    *           数组的第一个元素： state 用来获取state的值
    *           数组的第二个元素： state 修改的派发器
    *                               - 通过派发器可以发送操作state的命令
    *                               - 具体的修改行为将会由另外一个函数(reducer)执行
    * */
    const [count, countDispatch] = useReducer(countReducer, 1);

    const addHandler = () => {
        // 增加count的值
        countDispatch({type: 'ADD'});
    };

    const subHandler = () => {
        // 增加count的值
        countDispatch({type: 'SUB'});
    };

    return (
        <div style={{fontSize:30, width:200, height:200, margin:'100px auto', textAlign:'center'}}>
            <button onClick={subHandler}>减少</button>
            {count}
            <button onClick={addHandler}>增加</button>
        </div>
    );
};

export default App;
```

## 使用`Reducer`进行项目中`cartData`的管理

[App根组件](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/App.jsx)
[CartContext上下文修改](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/store/cart-context.js)
[Counter组件-增加和删除餐品](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/components/UI/Counter/index.jsx)
[CartDetail组件-清空餐品](https://github.com/Fancy911/React18-Hooks-LearningDemo/blob/main/react-app-hanbao/src/components/Cart/CartDetail/index.jsx)