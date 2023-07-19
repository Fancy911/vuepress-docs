---
title: 抽象类（abstract）
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - 面向对象
---

在上一小节继承中，我们会发现，`Dog`类和`Cat`类都重写了`Animal`类中的`sayHello`方法，这样`Animal`中的`sayHello`方法中原本的内容就毫无意义了。

于是我们引入**抽象类**。使用`abstract`关键字来声明一个抽象类`Animal`，并在`Animal`抽象类中声明一个以`abstract`关键字开头的`sayHello`方法：`abstract sayHello():void;`

::: warning
以`abstract`开头的类是抽象类，抽象类和其他类区别不大，只是**不能用来创建对象**
- 抽象类就是专门用来被继承的类
- 抽象类中可以添加抽象方法

以`abstract`开头开头的方法是抽象方法
- 抽象方法没有方法体
- 抽象方法只能定义在抽象类中，子类**必须**对抽象方法进行重写
:::

## 定义Animal抽象类

```typescript
abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract sayHello():void;
}
```

## 定义Dog类继承Animal抽象类并重写sayHello方法

```typescript
class Dog extends Animal{
    sayHello() {
        console.log('汪汪汪汪！');
    }
}
```

## 定义Cat类继承Animal类

```typescript
class Cat extends Animal{
    sayHello() {
        console.log('喵喵喵喵！');
    }
}
```