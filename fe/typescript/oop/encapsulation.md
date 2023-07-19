---
title: 封装（encapsulation）
date: 2023/02/02
categories:
 - 前端
tags:
 - typescript
 - 面向对象
---

## 为什么有封装？

```ts
// 定义一个人类
class Person{
    public name: string; // 写或什么都不写都是public
    public age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以在类中修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

const per = new Person('孙悟空', 18);

/*
* 在现在的声明一个类的写法中，类实例化的对象，它的属性可以任意的被修改,
*   这将会导致对象中的数据变得非常不安全
* */
per.name = '猪八戒';
per.age = '38';

per.age = '-38'; // 属性可以被任意修改，那万一本不可以为负数的年龄被修改为负数呢？这样就会导致数据的不安全
```

属性可以被任意修改，那万一本不可以为负数的年龄被修改为负数呢？这样就会导致数据的不安全。于是，我们就引入了封装。
对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装。

> - 只读属性（readonly）：
> - 如果在声明属性时添加一个readonly，则属性便成了只读属性无法修改


## TS中属性具有的三种修饰符

### 1. `public`（默认值）

- 可以在**类、子类和对象**中修改

```typescript
class Person{
    // 写或什么都不写都是public
    public name: string; 
    public age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以在类中修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{
    constructor(name: string, age: number){
        super(name, age);
        this.name = name; // 也可以子类中可以修改
    }
}

const per = new Person('孙悟空', 18);
per.name = '猪八戒';// 也可以通过对象修改
```

### 2. `protected`

- 可以在**类和子类**中修改

```typescript
class Person{
    protected name: string;
    protected age: number;

    constructor(name: string, age: number){
        this.name = name; //可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{

    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中可以修改
    }
}

const per1 = new Person('孙悟空', 18);
per2.name = '猪八戒'; // 此处在对象中是不能修改的
```

### 3. `private`（私有属性）

- 只可以在**类**内部访问&修改
    - 通过在类中添加方法使得私有属性可以被外部访问

```typescript
class Person{
    private name: string;
    private age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{

    constructor(name: string, age: number){
        super(name, age);
        this.name = name; // 子类中不能修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

## 存取器

此时我们会发现，当Person类中的属性都变成私有属性之后，子类和对象甚至不能访问到这个私有属性，那么这个私有属性还有啥作用？

所以，我们在类中定义了一组用于读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器
- getter——读取属性: `get 属性名(){}`
- setter——设置属性: `set 属性名(){}`

```typescript
class Person{
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    get name(){
        console.log('get name()执行了！！');
        return this._name;
    }
    set name(value){
        this._name = value;
    }

    get age(){
        return this._age;
    }
    set age(value){
        if(value >= 0){
            this._age = value
        }
    }
}
        
const per = new Person('孙悟空', 18);
console.log(per.name); // 实际上，这样对对象之间读取name属性，本质是调用了name的get方法。。此处会打印get name()执行了！！

// 虽然设置了set和get方法，但实际访问和修改值时，还是直接用原来的方式去修改属性值
// 但本质是调用了name和age的set方法
per.name = '猪八戒';
per.age = -33; // 不能设置，因为set age方法中限制了age的值必须大于0
```

可以看到，有了getter和setter，虽然我们还是可以在类的外部进行访问和修改，但是我们可以在getter和setter中设置一些条件，这样就增强了我们代码的健壮性。

  - 静态属性

    - 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用

    - 静态属性（方法）使用static开头

    - 示例：

      - ```typescript
        class Tools{
            static PI = 3.1415926;
            
            static sum(num1: number, num2: number){
                return num1 + num2
            }
        }
        
        console.log(Tools.PI);
        console.log(Tools.sum(123, 456));
        ```