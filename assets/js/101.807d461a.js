(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{612:function(e,s,t){"use strict";t.r(s);var v=t(2),_=Object(v.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"_1-将todolist的静态页面写好"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-将todolist的静态页面写好"}},[e._v("#")]),e._v(" 1. 将TodoList的静态页面写好")]),e._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("├── public\n├── src\n│    ├── componets\n│    │     ├── Header\n│    │     │     ├── index.jsx\n│    │     │     └── index.css\n│    │     ├── List\n│    │     │     ├── index.jsx\n│    │     │     └── index.css\n│    │     ├── Item\n│    │     │     ├── index.jsx\n│    │     │     └── index.css\n│    │     └── Footer\n│    │     │     ├── index.jsx\n│    │     │     └── index.css\n│    ├── App.css\n│    ├── App.jsx\n│    └── index.js\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br"),s("span",{staticClass:"line-number"},[e._v("18")]),s("br")])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"title"}),s("p",[e._v("注意，react中，所有的"),s("code",[e._v("class")]),e._v("类名都要用"),s("code",[e._v("className")]),e._v("，"),s("code",[e._v("style")]),e._v("样式都要用"),s("code",[e._v("style={{}}")]),e._v("。")])]),s("h2",{attrs:{id:"_2-动态组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-动态组件"}},[e._v("#")]),e._v(" 2. 动态组件")]),e._v(" "),s("ol",[s("li",[e._v("动态数据初始化")]),e._v(" "),s("li",[s("code",[e._v("Header组件")]),e._v("添加数据到"),s("code",[e._v("List组件")]),e._v("（通过"),s("code",[e._v("Header")]),e._v("给"),s("code",[e._v("父组件App")]),e._v("传递数据实现："),s("code",[e._v("App")]),e._v("里传一个函数给"),s("code",[e._v("Header")]),e._v("，在"),s("code",[e._v("Header")]),e._v("里调用这个函数，实现子传父一个"),s("code",[e._v("todoObj")]),e._v("）")]),e._v(" "),s("li",[e._v("给"),s("code",[e._v("Item组件")]),e._v("添加鼠标的移入移出事件，移入则显示删除按钮，移出则隐藏删除按钮")]),e._v(" "),s("li",[e._v("给"),s("code",[e._v("Item组件")]),e._v("改变数据的状态（通过"),s("code",[e._v("Item")]),e._v("给"),s("code",[e._v("父组件List")]),e._v("传递数据实现："),s("code",[e._v("List")]),e._v("里传一个函数给"),s("code",[e._v("Item")]),e._v("，在"),s("code",[e._v("Item")]),e._v("里调用这个函数，实现子传父一个"),s("code",[e._v("id")]),e._v("，然后再由"),s("code",[e._v("List子")]),e._v("传给"),s("code",[e._v("App父")]),e._v("，实现数据的改变）")]),e._v(" "),s("li",[e._v("给"),s("code",[e._v("Footer组件")]),e._v("添加全选和全不选的功能（通过"),s("code",[e._v("Footer")]),e._v("给"),s("code",[e._v("父组件App")]),e._v("传递数据实现："),s("code",[e._v("App")]),e._v("里传一个函数给"),s("code",[e._v("Footer")]),e._v("，在"),s("code",[e._v("Footer")]),e._v("里调用这个函数）")]),e._v(" "),s("li",[e._v("给"),s("code",[e._v("Footer")]),e._v("组件添加清除已完成的功能（通过"),s("code",[e._v("Footer")]),e._v("给父组件App传递数据实现：App里传一个函数给"),s("code",[e._v("Footer")]),e._v("，在"),s("code",[e._v("Footer")]),e._v("里调用这个函数）")])]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"title"}),s("ul",[s("li",[e._v("动态初始化列表，如何确定将数据放在哪个组件的"),s("code",[e._v("state")]),e._v("中？\n"),s("ul",[s("li",[e._v("某个组件使用：放在其自身的"),s("code",[e._v("state")]),e._v("中")]),e._v(" "),s("li",[e._v("某些组件使用：放在他们共同的父组件"),s("code",[e._v("state")]),e._v("中（官方称此操作为：状态提升）")])])]),e._v(" "),s("li",[e._v("关于父子之间通信：\n"),s("ol",[s("li",[e._v("【父组件】给【子组件】传递数据：通过props传递")]),e._v(" "),s("li",[e._v("【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数")])])]),e._v(" "),s("li",[e._v("注意"),s("code",[e._v("defaultChecked")]),e._v(" 和 "),s("code",[e._v("checked")]),e._v("的区别，类似的还有："),s("code",[e._v("defaultValue")]),e._v(" 和 "),s("code",[e._v("value")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("defaultChecked")]),e._v("：默认选中,只在第一次渲染时生效")]),e._v(" "),s("li",[s("code",[e._v("checked")]),e._v("：选中状态，可以随时改变")])])]),e._v(" "),s("li",[e._v("状态在哪里，操作状态的方法就在哪里")])])]),s("h2",{attrs:{id:"完整项目地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#完整项目地址"}},[e._v("#")]),e._v(" 完整项目地址")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/Fancy911/React-Learning-Demo-ALL/tree/main/React-todo-demo",target:"_blank",rel:"noopener noreferrer"}},[e._v("Github-React-TodoList"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=_.exports}}]);