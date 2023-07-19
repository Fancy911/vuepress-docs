---
title: 组件实例的三大核心属性——props
date: 2023/02/13
categories:
 - 前端
tags:
 - react
 - 组件
---

## 基本概念

props: properties的简写，用来接收外部传递过来的数据, 是**只读的**，不能被重新赋值

1. 每个组件对象都会有`props`(properties的简写)属性
2. 组件标签的所有属性都保存在`props`中

## 作用

1. 通过标签属性从组件外向组件内传递变化的数据
2. 注意: 组件内部不要修改`props`数据

## 示例需求

需求: 自定义用来显示一个人员信息的组件
1.	姓名必须指定，且为字符串类型；
2.	性别为字符串类型，如果性别没有指定，默认为男
3.	年龄为字符串类型，且为数字类型，默认值为18

<img src="./imgs/xuqiu.png" width="30%">

### 最基本写法

```html
<script type="text/babel">
    //创建组件
    class Person extends React.Component{
        render(){
            const {name,age,sex} = this.props
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>性别：{sex}</li>
                    <li>年龄：{age}</li>
                </ul>
            ) 
        }
    }
    //渲染组件到页面
    ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>, document.getElementById('test1'))
    ReactDOM.render(<Person name="tom" age={18} sex="女"/>, document.getElementById('test2'))
    ReactDOM.render(<Person name="老刘" age={45}  sex="男"/>, document.getElementById('test3'))
</script>
```

::: warning
1. 如果一个Person需要传递的属性信息很多，那么在调用组件的时候，就需要写很多属性，不方便。
    - 我们可以批量传递属性信息，这样就可以简化调用组件的代码。
2. 目前的代码我们无法对Person类的标签属性做限制，比如我们必须传齐name、age、sex三个属性，而且属性的类型必须是字符串，否则会报错。
    - 我们可以对Person类的标签属性做限制，增强代码的健壮性。
:::


### 改造后的代码

```html{19-20,28-29,39-50,}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>对props进行限制</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test1"></div>
	<div id="test2"></div>
	<div id="test3"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>
	<!-- 引入prop-types，用于对组件标签属性进行限制 -->
	<script type="text/javascript" src="../js/prop-types.js"></script>

	<script type="text/babel">
		//创建组件
		class Person extends React.Component{
			render(){
				// console.log(this);
				const { name, age, sex } = this.props
				//props是只读的
				//this.props.name = 'jack' //此行代码会报错，因为props是只读的
				return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age+1}</li>
					</ul>
				)
			}
		}
		//对标签属性进行类型、必要性的限制
		Person.propTypes = {
			name: PropTypes.string.isRequired, // 限制name必传，且为字符串
			sex: PropTypes.string,  // 限制sex为字符串
			age: PropTypes.number,  // 限制age为数值
			speak: PropTypes.func,  // 限制speak为函数
		}
		//指定默认标签属性值
		Person.defaultProps = {
			sex: '男',//sex默认值为男
			age: 18 //age默认值为18
		}
		//渲染组件到页面
		ReactDOM.render(<Person name={100} speak={speak}/>, document.getElementById('test1'))
		ReactDOM.render(<Person name="tom" age={18} sex="女"/>, document.getElementById('test2'))

		const p = {name:'老刘',age:18,sex:'女'}
        
        // console.log(...p); // 此行代码会报错，因为...展开运算符只能用于数组，不能用于对象
        // console.log({...p}); // 这样写就可以，这样写的本质是对p这个对象的拷贝
        // 但是，在react中，由于react+babel的加持，就可以让{...p}这种语法，展开一个对象
		ReactDOM.render(<Person {...p}/>, document.getElementById('test3'))

		function speak(){
			console.log('我说话了');
		}
	</script>
</body>
</html>
```

::: warning
这样写，虽然实现了限制功能，但是我们会发现这些限制代码，都是写在组件类的外面，这样写不够优雅，我们可以把这些限制代码，写到组件类的内部。
:::

### 改造后的简写代码

```html{12-23}
<script type="text/babel">
    //创建组件
    class Person extends React.Component{
        constructor(props){
            //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
            // console.log(props);
            super(props)
            console.log('constructor',this.props); // 一般都不用this.去访问props，没啥意义
            // 所以真实开发场景下，一般都不会在构造器中接收props
        }

        //对标签属性进行类型、必要性的限制
        static propTypes = {
            name:PropTypes.string.isRequired, //限制name必传，且为字符串
            sex:PropTypes.string,//限制sex为字符串
            age:PropTypes.number,//限制age为数值
        }

        //指定默认标签属性值
        static defaultProps = {
            sex:'男',//sex默认值为男
            age:18 //age默认值为18
        }
        
        render(){
            const {name,age,sex} = this.props
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>性别：{sex}</li>
                    <li>年龄：{age+1}</li>
                </ul>
            )
        }
    }
    
    //渲染组件到页面
    ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```

## 函数式组件的props

在react组件实例的三大属性中，函数式组件没有state和refs，只有props。函数式组件的props，就是函数的形参。

```html
<script type="text/babel">
    //创建组件
    function Person (props){
        const {name,age,sex} = props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
            </ul>
        )
    }
    Person.propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    Person.defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }
    //渲染组件到页面
    ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```


