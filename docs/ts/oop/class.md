---
title: 类（class）
date: 2023/02/01
categories:
 - 前端
tags:
 - typescript
 - 面向对象
 - 类
---

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。

要创建对象，必须要先定义类，所谓的类可以理解为**对象的模型**，程序中可以根据类创建指定类型的对象。

举例来说：可以通过`Person`类来创建人的对象，通过`Dog`类创建狗的对象，通过`Car`类来创建汽车的对象，不同的类可以用来创建不同的对象。

## 定义类

使用class关键字来定义一个类

由于对象中主要包含两个部分： 1. 属性  2.方法

所以我们需要在类中定义属性和方法

```typescript
class 类名 {
  属性名: 类型;
  
  // 构造函数，下节讲
  constructor(参数: 类型){
    this.属性名 = 参数;
  }
  
  方法名(){
    ....
  }
}
```

### 定义一个Person类demo

```typescript
class Person {
  /* 定义实例属性: 实例属性才能被实例对象访问
      const per1 = new Person('孙悟空', 18);
      这个per1就是实例对象，这个实例属性就可以通过per1.name访问
      console.log(per1.name); // 打印孙悟空
  */
  name: string = '孙悟空';
  
  /* 定义静态属性: 静态属性是被类访问的
      比如console.log(Person.age); // 打印18
  */
  static age: number = 18;

  /* readonly开头的属性表示一个只读的属性，无法通过实例访问属性修改。
      eg：readonly name: string = '孙悟空'; 
      per.name = 'Tom'; //这样就是不行的❌
  */

  // 定义实例方法：通过实例对象能访问
  sayHello(){
    console.log("Hello,大家好!");
  }

  // static开头定义方法时为静态方法（类方法）：通过类能访问
  static sayStaticHello(){
    console.log("你好,大家好!");
  }
}
```

### 类的实例化

```ts
const per = new Person();

per.sayHello(); // 调用实例方法
console.log(per.name); //打印实例属性值'孙悟空'

console.log(Person.sayStaticHello); // 调用类方法，打印 你好,大家好!
```