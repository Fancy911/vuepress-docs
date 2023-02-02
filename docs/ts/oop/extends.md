---
title: 继承（extends）
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - 面向对象
---

面向对象中，有个比较常用的概念就是继承。

继承可以帮我们解决很多繁琐的重复声明，比如小猫`（Cat）`和小狗`（Dog）`都有名字和年龄，并且他们各自都有自己特有的属性和方法，我们可以把它们公共的部分，定义成一个动物`（Animal）`类。

`Animal`类中就可以声明名字和年龄，`Dog`和`Cat`类就可以继承这个`Animal`类，就不必再单独去声明，减少重复代码。

此时，`Animal`被称为父类，`Dog`和`Cat`类被称为子类。

使用继承后，**子类将会拥有父类所有的方法和属性**
- 通过继承可以将多个类中共有的代码写在一个父类中，这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法
- 如果希望在子类中**添加一些父类中没有的属性或方法**，直接加就行
- 如果在**子类中添加了和父类相同的方法**，则子类方法会**覆盖**掉父类的方法，这种子类覆盖掉父类方法的形式，我们称为方法重写

注意，子类继承父类后，有一个`super`关键字，需要在子类的构造函数中声明。
- 在类的方法中 `super`就表示当前类的父类

## 定义Animal类

```typescript
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log('动物在叫~');
    }
}
```

## 定义Dog类继承Animal类

```typescript
// 使Dog类继承Animal类
class Dog extends Animal{
    gender: string

    // Dog类的构造函数
    constructor(name: string, age: number, gender: string) {
        // 如果需要在子类中写构造函数：那么在子类构造函数中 必须 对父类的构造函数进行调用
        super(name, age); // 调用父类的构造函数，得把父类的参数也带过来。
        this.gender = gender;
    }
    
    run(){
        console.log(`${this.name}在跑~~~`);
    }
    // 继承中，可以重写父类中已有的方法
    sayHello() {
        // super.sayHello(); // super就表示当前类的父类，这就表示在Dog类声明的sayHello函数被调用时，直接调用父类Animal中的sayHello（这种情况不常用）
        console.log('汪汪汪汪！');
    }
} 
```

## 定义Cat类继承Animal类

```typescript
// 使Cat类继承Animal类
class Cat extends Animal{
    sayHello() {
        console.log('喵喵喵喵！');
    }
}
```