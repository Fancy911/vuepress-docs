---
title: 构造函数（constructor）
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - 面向对象
---

我们上一节讲到的类中定义的实例属性直接赋予了初始值。

但作为一个类，实例出来的对象肯定是多种多样的，不是一成不变的一个值，所以我们需要能让类的实例化丰富起来。

这个时候，就用到了构造函数`constructor`，构造函数会在类的实例化对象创建时调用，构造函数定义几个参数，你就可以通过传参数的方式`new`一个对象。

eg：`const JimmyDog = new Dog('Jimmy', 2);`

## 在Dog类中写构造函数

```typescript
class Dog{
    name: string;
    age: number;

    // constructor 被称为构造函数
    // 构造函数会在对象创建时调用
    constructor(name: string, age: number) { 
        // 在实例方法中，this就表示当前的实例：比如我通过Dog类实例了一个对象Jimmy，此时this就指向Jimmy这个对象
        // 可以通过this向新建的对象中添加属性
        this.name = name;
        this.age = age;
    }

    bark(){
        // alert('汪汪汪！');
        // 在方法中可以通过this来表示当前调用方法的对象
        console.log(`我是${this.name}`);
    }
}
```

###  使用类实例化多个不同对象（本质是调用类中的constructor方法）

```typescript
const JimmyDog = new Dog('Jimmy', 2);
const AndyDog = new Dog('Andy', 3);

JimmyDog.bark(); // 我是Jimmy
AndyDog.bark(); // 我是Andy
```