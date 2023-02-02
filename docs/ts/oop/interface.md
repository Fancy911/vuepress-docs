---
title: 接口（Interface）
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - 面向对象
---

接口的作用类似于抽象类，不同点在于接口中的**所有方法和属性都是没有实值的**，换句话说接口中的**所有方法都是抽象方法**。

接口主要负责定义一个**类的结构**，用来定义一个类中应该包含哪些属性和方法。
- 接口中的所有的属性**都不能有实际的值**
- 在接口中所有的方法**都是抽象方法**
- 接口只定义对象的结构，而不考虑实际值
- 同时接口也可以当成**类型声明**去使用

接口可以去限制一个对象的接口，**对象只有包含接口中定义的所有属性和方法时才能匹配接口**。

同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

- `interface`被重复定义时不会报错，但我们一般不那么做。
```ts
interface Person{
    name: string;
    sayHello():void;
}

interface Person{
    age: string;
}
// 这样是不会报错的
```

## 示例1——使用接口定义类
```ts
interface myInter{
    name: string;

    sayHello():void;
}

/*
*  定义类时，可以使类去实现（implements）一个接口,
*   实现接口就是使类满足接口的要求
* */
class MyClass implements myInter{
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello(){
        console.log('大家好~~');
    }

}
```
其实，接口就是对类的一个限制，一种规范。在一些特定场景下，你只能定义满足这种“规范/要求”的类。

## 示例2——检查对象类型

```typescript
interface Person{
    name: string;
    sayHello():void;
}

// per：Person就是将接口也可以当成一种类型，去声明per这个变量
function fn (per: Person) {
    per.sayHello();
}

fn(
    {
        name:'孙悟空', 
        sayHello() {
            console.log(`Hello, 我是 ${this.name}`)
        }
    }
);
```