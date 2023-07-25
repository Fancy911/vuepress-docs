---
title: Python基础语法
date: 2023/07/24
categories:
 - Python
tags:
 - 字典
 - 列表
 - 综合案例
---

python的基本语法比较简单，就不过多赘述，最后用一个综合案例来展示。

## 1. 变量

在Python中，变量是用于存储数据的容器。您可以使用赋值操作符（=）来创建变量并为其赋值。例如：

```python
x = 5
name = "John"
```

## 2. 基本数据类型

Python有几种常用的基本数据类型，包括整数（int）、浮点数（float）、布尔值（bool）、字符串（str）等。例如：

```python
x = 5        # 整数
y = 3.14     # 浮点数
is_true = True   # 布尔值
name = "John"   # 字符串
```

## 3. 运算符

Python支持各种常见的算术、比较和逻辑运算符。例如：

```plain
x = 5 # 赋值运算
y = 3

sum = x + y     # 加法
difference = x - y   # 减法
product = x * y   # 乘法
quotient = x / y   # 除法
remainder = x % y   # 取模

is_equal = x == y   # 等于判断
is_greater = x > y   # 大于判断
is_less_equal = x <= y   # 小于等于

logical_and = (x > 0) and (y < 0)   # 逻辑与
logical_or = (x > 0) or (y < 0)   # 逻辑或
logical_not = not (x > 0)   # 逻辑非
```

## 4. 输入输出

您可以使用`input()`函数从用户处获取输入，并使用`print()`函数进行输出。例如：

```python
name = input("请输入您的姓名：")
print("您好，", name)
```

## 5. 语句与缩进

Python使用缩进来表示代码块，其中包括条件语句（if-else）、循环语句（for、while）等。

### 条件语句

```python
x = 5

if x > 0:
    print("x是正数")
elif x < 0:
    print("x是负数")
else:
    print("x是零")
```

### 循环语句

```python
# for循环
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 6. 字符串

字符串是由字符组成的序列，可以使用引号（单引号或双引号）来创建字符串。可以对字符串进行拼接、切片和格式化等操作。例如：

```python
name = "John"
greeting = "Hello, " + name   # 字符串拼接
print(greeting)

message = "Python is fun"
print(message[0:6])   # 字符串切片，输出"Python"

age = 25
print("I am {} years old.".format(age))   # 字符串格式化, 输出I am 25 years old.
```

### 字符串常用方法

1. **len()**：返回字符串的长度。

```python
text = "Hello, Python!"
length = len(text)
print(length)  # 输出：14
```

2. **upper()** 和 **lower()**：将字符串分别转换为大写和小写。

```python
text = "Hello, Python!"
uppercase_text = text.upper()
lowercase_text = text.lower()
print(uppercase_text)  # 输出：HELLO, PYTHON!
print(lowercase_text)  # 输出：hello, python!
```

3. **strip()**：去除字符串首尾的空格或指定字符。

```python
text = "   Hello, Python!   "
stripped_text = text.strip()
print(stripped_text)  # 输出：Hello, Python!

text = "------Hello, Python!------"
stripped_text = text.strip("-")
print(stripped_text)  # 输出：Hello, Python!
```

4. **split()**：将字符串按照指定的分隔符拆分成列表。

```python
text = "apple, banana, orange"
fruits = text.split(", ")
print(fruits)  # 输出：['apple', 'banana', 'orange']
```

5. **join()**：将列表中的元素连接成一个字符串。

```python
fruits = ['apple', 'banana', 'orange']
text = ", ".join(fruits)
print(text)  # 输出：apple, banana, orange
```

6. **replace()**：替换字符串中的指定子串。

```python
text = "Hello, Python!"
new_text = text.replace("Python", "World")
print(new_text)  # 输出：Hello, World!
```

7. **startswith()** 和 **endswith()**：检查字符串是否以指定的子串开头或结尾。

```python
text = "Hello, Python!"
starts_with_hello = text.startswith("Hello")
ends_with_python = text.endswith("Python!")
print(starts_with_hello)  # 输出：True
print(ends_with_python)  # 输出：True
```

8. **find()** 和 **index()**：查找指定子串在字符串中的位置。

```python
text = "Hello, Python!"
position1 = text.find("Python")
position2 = text.index("Python")
print(position1)  # 输出：7 - 索引下标值
print(position2)  # 输出：7 - 索引下标值
```

9. **count()**：统计指定子串在字符串中出现的次数。

```python
text = "Hello, Python! Python is fun!"
count = text.count("Python")
print(count)  # 输出：2
```

以上是一些常用的字符串方法及其示例代码。在实际编程中，这些方法能够帮助您处理和操作字符串数据，使得字符串处理变得更加灵活和方便。

## 7. 列表

列表是一种有序、可变的数据类型，可以包含不同类型的元素。可以通过索引来访问列表中的元素，并可以进行增加、删除、修改等操作。例如：

```python
fruits = ["apple", "banana", "orange"]
print(fruits[0])   # 输出"apple"

fruits.append("grape")   # 添加元素
fruits[1] = "pear" # 修改元素
del fruits[2]   # 删除元素
```

### 列表的常用方法

1. **append()**：向列表末尾添加一个元素。

```python
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
print(fruits)  # 输出：['apple', 'banana', 'orange', 'grape']
```

2. **extend()**：将一个列表的元素添加到另一个列表末尾。

```python
fruits = ["apple", "banana", "orange"]
more_fruits = ["grape", "kiwi"]
fruits.extend(more_fruits)
print(fruits)  # 输出：['apple', 'banana', 'orange', 'grape', 'kiwi']
```

3. **insert()**：在指定位置插入一个元素。

```python
fruits = ["apple", "banana", "orange"]
fruits.insert(1, "grape")
print(fruits)  # 输出：['apple', 'grape', 'banana', 'orange']
```

4. **remove()**：移除列表中第一个指定值的元素。

```python
fruits = ["apple", "banana", "orange"]
fruits.remove("banana")
print(fruits)  # 输出：['apple', 'orange']
```

5. **pop()**：移除列表中指定位置的元素，并返回该元素的值。

```python
fruits = ["apple", "banana", "orange"]
removed_fruit = fruits.pop(1)
print(fruits)  # 输出：['apple', 'orange']
print(removed_fruit)  # 输出：banana
```

6. **index()**：返回列表中第一个指定值的索引。

```python
fruits = ["apple", "banana", "orange"]
index = fruits.index("orange")
print(index)  # 输出：2
```

7. **count()**：返回指定值在列表中出现的次数。

```python
fruits = ["apple", "banana", "orange", "banana"]
count = fruits.count("banana")
print(count)  # 输出：2
```

8. **sort()**：对列表进行排序。

```python
numbers = [3, 1, 4, 2]
numbers.sort()
print(numbers)  # 输出：[1, 2, 3, 4]

fruits = ["apple", "banana", "orange"]
fruits.sort()
print(fruits)  # 输出：['apple', 'banana', 'orange']
```

9. **reverse()**：将列表中的元素逆序排列。

```python
fruits = ["apple", "banana", "orange"]
fruits.reverse()
print(fruits)  # 输出：['orange', 'banana', 'apple']
```

10. **copy()**：复制列表。

```python
fruits = ["apple", "banana", "orange"]
fruits_copy = fruits.copy()
print(fruits_copy)  # 输出：['apple', 'banana', 'orange']
```

## 8. 字典

在Python中，字典是一种常见的数据类型，用于存储键-值对。字典是无序的、可变的，允许存储多个键值对。可以通过键来访问字典中的值，并可以进行增加、删除、修改等操作。例如：

```python
person = { "name": "John", "age": 25, "city": "New York" }
print(person["name"])   # 输出"John"

person["age"] = 30 # 修改值
person["job"] = "Engineer" # 添加键值对
del person["city"]   # 删除键值对
```

### 字典的常用方法

1. **get()**：获取指定键的值，如果键不存在则返回默认值。

```python
person = {"name": "John", "age": 25, "city": "New York"}
name = person.get("name")
country = person.get("country", "Unknown")
print(name)  # 输出：John
print(country)  # 输出：Unknown
```

2. **keys()**：返回字典中所有键的列表。

```python
person = {"name": "John", "age": 25, "city": "New York"}
keys = person.keys()
print(keys)  # 输出：dict_keys(['name', 'age', 'city'])
```

3. **values()**：返回字典中所有值的列表。

```python
person = {"name": "John", "age": 25, "city": "New York"}
values = person.values()
print(values)  
# 输出：dict_values(['John', 25, 'New York'])
```

4. **items()**：返回字典中所有键值对的列表。

```python
person = {"name": "John", "age": 25, "city": "New York"}
items = person.items()
print(items)  # 输出：dict_items([('name', 'John'), ('age', 25), ('city', 'New York')])
```

5. **pop()**：移除指定键的键值对，并返回对应的值。

```python
person = {"name": "John", "age": 25, "city": "New York"}
age = person.pop("age")
print(person)  # 输出：{'name': 'John', 'city': 'New York'}
print(age)  # 输出：25
```

6. **update()**：将一个字典的键值对添加到另一个字典中。

```python
person = {"name": "John", "age": 25}
details = {"city": "New York", "country": "USA"}
person.update(details)
print(person)  # 输出：{'name': 'John', 'age': 25, 'city': 'New York', 'country': 'USA'}
```

7. **copy()**：复制字典。

```python
person = {"name": "John", "age": 25}
person_copy = person.copy()
print(person_copy)  # 输出：{'name': 'John', 'age': 25}
```

8. **clear()**：清空字典中的所有键值对。

```python
person = {"name": "John", "age": 25}
person.clear()
print(person)  # 输出：{}
```