(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{586:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("文件写入就是将 "),t("strong",[s._v("数据")]),s._v(" 保存到 "),t("strong",[s._v("文件")]),s._v(" 中，我们可以使用如下几个方法来实现该效果：")]),s._v(" "),t("table",[t("thead",[t("tr",[t("th",[s._v("方法")]),s._v(" "),t("th",[s._v("说明")])])]),s._v(" "),t("tbody",[t("tr",[t("td",[s._v("writeFile")]),s._v(" "),t("td",[s._v("异步写入")])]),s._v(" "),t("tr",[t("td",[s._v("writeFileSync")]),s._v(" "),t("td",[s._v("同步写入")])]),s._v(" "),t("tr",[t("td",[s._v("appendFile / appendFileSync")]),s._v(" "),t("td",[s._v("追加写入")])]),s._v(" "),t("tr",[t("td",[s._v("createWriteStream")]),s._v(" "),t("td",[s._v("流式写入")])])])]),s._v(" "),t("h2",{attrs:{id:"_1-writefile异步写入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-writefile异步写入"}},[s._v("#")]),s._v(" 1."),t("code",[s._v("writeFile")]),s._v("异步写入")]),s._v(" "),t("ul",[t("li",[s._v("语法: "),t("code",[s._v("fs.writeFile(file, data[, options], callback)")])]),s._v(" "),t("li",[s._v("参数说明:"),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" 文件名\ndata 待写入的数据\noptions 选项设置 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("可选"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\ncallback 写入回调\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])])]),s._v(" "),t("li",[s._v("返回值: "),t("code",[s._v("undefined")])]),s._v(" "),t("li",[s._v("代码示例:")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// require 是 Node.js 环境中的'全局'变量，用来导入模块")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" fs "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fs'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 将 『三人行，必有我师焉。』 写入到当前文件夹下的『座右铭.txt』文件中 ")]),s._v("\nfs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("writeFile")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./座右铭.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'三人行，必有我师焉。'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("err")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null ")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'写入成功'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("ul",[t("li",[s._v("是异步的工作模式")])]),s._v(" "),t("h2",{attrs:{id:"_2-writefilesync同步写入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-writefilesync同步写入"}},[s._v("#")]),s._v(" 2."),t("code",[s._v("writeFileSync")]),s._v("同步写入")]),s._v(" "),t("ul",[t("li",[s._v("语法: "),t("code",[s._v("fs.writeFileSync(file, data[, options])")])]),s._v(" "),t("li",[s._v("参数与 "),t("code",[s._v("fs.writeFile")]),s._v(" 大体一致，只是"),t("code",[s._v("没有 callback")]),s._v("参数")]),s._v(" "),t("li",[s._v("返回值: "),t("code",[s._v("undefined")])]),s._v(" "),t("li",[s._v("代码示例:")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//导入 fs 模块")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" fs "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fs'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    fs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("writeFileSync")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./座右铭.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'三人行，必有我师焉。'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("catch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("e"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("e"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("Node.js 中的磁盘操作是由其他 "),t("strong",[s._v("线程")]),s._v(" 完成的，结果的处理有两种模式:")]),s._v(" "),t("ul",[t("li",[s._v("同步处理: JavaScript主线程 "),t("strong",[s._v("会等待")]),s._v(" 其他线程的执行结果，然后再继续执行主线程的代码， "),t("strong",[s._v("效率较低")])]),s._v(" "),t("li",[s._v("异步处理: JavaScript主线程 "),t("strong",[s._v("不会等待")]),s._v(" 其他线程的执行结果，直接执行后续的主线程代码， "),t("strong",[s._v("效率较好")])])])]),t("h2",{attrs:{id:"_3-appendfile-appendfilesync追加写入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-appendfile-appendfilesync追加写入"}},[s._v("#")]),s._v(" 3."),t("code",[s._v("appendFile")]),s._v("/"),t("code",[s._v("appendFileSync")]),s._v("追加写入")]),s._v(" "),t("p",[t("code",[s._v("appendFile")]),s._v(" 作用是在文件尾部追加内容，"),t("code",[s._v("appendFile")]),s._v(" 语法与 "),t("code",[s._v("writeFile")]),s._v(" 语法完全相同")]),s._v(" "),t("ul",[t("li",[s._v("语法:"),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//导入 fs 模块")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" fs "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fs'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nfs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("appendFile")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" options"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" callback"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nfs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("appendFileSync")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" options"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])]),s._v(" "),t("li",[s._v("返回值: 二者都为"),t("code",[s._v("undefined")])]),s._v(" "),t("li",[s._v("代码示例:")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("fs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("appendFile")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./座右铭.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'择其善者而从之，其不善者而改之。'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("err")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("throw")]),s._v(" err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'追加成功'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nfs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("appendFileSync")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./座右铭.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\\r\\n温故而知新, 可以为师矣'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("ul",[t("li",[s._v("应用场景：日志记录、爬虫数据存储、用户访问记录等")])]),s._v(" "),t("h2",{attrs:{id:"_4-createwritestream流式写入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-createwritestream流式写入"}},[s._v("#")]),s._v(" 4."),t("code",[s._v("createWriteStream")]),s._v("流式写入")]),s._v(" "),t("ul",[t("li",[s._v("语法: "),t("code",[s._v("fs.createWriteStream(path[, options])")])]),s._v(" "),t("li",[s._v("参数说明:"),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("path 文件路径\noptions 选项配置"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" 可选 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])])]),s._v(" "),t("li",[s._v("返回值: "),t("code",[s._v("Object")])]),s._v(" "),t("li",[s._v("代码示例:")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1. 引入 fs 模块")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" fs "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fs'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2. 创建可写流对象")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" ws "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" fs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("createWriteStream")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./观书有感.txt'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3. 写入")]),s._v("\nws"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'半亩方塘一鉴开\\r\\n'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \nws"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'天光云影共徘徊\\r\\n'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \nws"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'问渠那得清如许\\r\\n'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \nws"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'为有源头活水来\\r\\n'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 4. 关闭流")]),s._v("\nws"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("end")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[t("strong",{staticStyle:{color:"red"}},[s._v("程序打开一个文件是需要消耗资源的")]),s._v(" ，流式写入可以"),t("strong",[s._v("减少打开关闭文件的次数")]),s._v("。")]),s._v(" "),t("ul",[t("li",[s._v("流式写入方式适用于 "),t("strong",{staticStyle:{color:"red"}},[s._v("大文件写入或者频繁写入")]),s._v(" 的场景")]),s._v(" "),t("li",[t("code",[s._v("writeFile")]),s._v(" 适合于 "),t("strong",{staticStyle:{color:"red"}},[s._v("写入频率较低的场景")])])])]),t("h2",{attrs:{id:"_5-文件写入的应用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-文件写入的应用场景"}},[s._v("#")]),s._v(" 5.文件写入的应用场景")]),s._v(" "),t("p",[t("strong",{staticStyle:{color:"red"}},[s._v("文件写入")]),s._v("在计算机中是一个非常常见的操作，下面的场景都用到了文件写入")]),s._v(" "),t("ul",[t("li",[s._v("下载文件")]),s._v(" "),t("li",[s._v("安装软件")]),s._v(" "),t("li",[s._v("保存程序日志，如 Git")]),s._v(" "),t("li",[s._v("编辑器保存文件")]),s._v(" "),t("li",[s._v("视频录制")])]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("当 "),t("strong",[s._v("需要持久化保存数据")]),s._v(" 的时候，应该想到 "),t("strong",[s._v("文件写入")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);