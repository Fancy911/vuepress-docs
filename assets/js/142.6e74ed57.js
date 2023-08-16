(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{665:function(s,t,a){"use strict";a.r(t);var e=a(2),r=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"前置知识"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前置知识"}},[s._v("#")]),s._v(" 前置知识")]),s._v(" "),t("ol",[t("li",[s._v("Promise")]),s._v(" "),t("li",[s._v("Ajax")])]),s._v(" "),t("h2",{attrs:{id:"axios-web数据交互方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#axios-web数据交互方式"}},[s._v("#")]),s._v(" axios——Web数据交互方式")]),s._v(" "),t("p",[s._v("Axios，是一个基于"),t("code",[s._v("promise")]),s._v("的网络请求库，作用于"),t("code",[s._v("node.js")]),s._v("和"),t("code",[s._v("浏览器")]),s._v("中，它是"),t("code",[s._v("isomorphic")]),s._v("的(即同一套代码可以运行在"),t("code",[s._v("浏览器")]),s._v("和"),t("code",[s._v("node.js")]),s._v("中)。")]),s._v(" "),t("ul",[t("li",[s._v("在服务端它使用原生"),t("code",[s._v("node.js``http")]),s._v("模块, 向远端服务发送http请求")]),s._v(" "),t("li",[s._v("而在客户端 (浏览端) 则使用"),t("code",[s._v("XMLHttpRequest")]),s._v("，发送ajax请求。")])]),s._v(" "),t("blockquote",[t("p",[s._v("react/vue 官方都推荐使用 axios 发 ajax 请求")])]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范。")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/axios/axios",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方文档"),t("OutboundLink")],1)])]),t("h2",{attrs:{id:"axios特点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#axios特点"}},[s._v("#")]),s._v(" axios特点")]),s._v(" "),t("ol",[t("li",[s._v("Make XMLHttpRequests from the browser")]),s._v(" "),t("li",[s._v("Make http requests from node.js")]),s._v(" "),t("li",[s._v("Supports the Promise API")]),s._v(" "),t("li",[s._v("Intercept request and response（翻译：拦截请求和响应）")]),s._v(" "),t("li",[s._v("Transform request and response data (翻译：转换请求和响应数据)")]),s._v(" "),t("li",[s._v("Cancel requests (翻译：取消请求)")]),s._v(" "),t("li",[s._v("Automatic transforms for JSON data (翻译：自动转换JSON数据)")]),s._v(" "),t("li",[s._v("Automatic data object serialization to multipart/form-data and x-www-form-urlencoded body encodings (翻译：自动将数据对象序列化为multipart/form-data和x-www-form-urlencoded主体编码)")]),s._v(" "),t("li",[s._v("Client side support for protecting against XSRF (翻译：客户端支持防御XSRF)")])]),s._v(" "),t("h2",{attrs:{id:"搭建一个json-server"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#搭建一个json-server"}},[s._v("#")]),s._v(" 搭建一个"),t("a",{attrs:{href:"https://github.com/typicode/json-server",target:"_blank",rel:"noopener noreferrer"}},[s._v("Json-Server"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("新建一个项目文件夹，名为json-server。")]),s._v(" "),t("h3",{attrs:{id:"_1-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装"}},[s._v("#")]),s._v(" 1. 安装")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-g")]),s._v(" json-server\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"_2-在项目中创建一个db-json文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-在项目中创建一个db-json文件"}},[s._v("#")]),s._v(" 2. 在项目中创建一个"),t("code",[s._v("db.json")]),s._v("文件")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"posts"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"id"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"title"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"json-server"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"author"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"typicode"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"comments"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"id"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"body"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"some comment"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"postId"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"profile"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"typicode"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h3",{attrs:{id:"_3-启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-启动"}},[s._v("#")]),s._v(" 3. 启动")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("json-server "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--watch")]),s._v(" db.json\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);