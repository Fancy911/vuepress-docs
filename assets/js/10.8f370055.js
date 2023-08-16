(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{513:function(s,t,a){s.exports=a.p+"assets/img/mysql-install.e4bb4edd.png"},514:function(s,t,a){s.exports=a.p+"assets/img/terminal.de4faa94.png"},515:function(s,t,a){s.exports=a.p+"assets/img/password.6f94ba41.png"},516:function(s,t,a){s.exports=a.p+"assets/img/repasswd.5f4ae9b4.png"},517:function(s,t,a){s.exports=a.p+"assets/img/charac.bec8d75a.png"},518:function(s,t,a){s.exports=a.p+"assets/img/charac2.b95ba743.png"},753:function(s,t,a){"use strict";a.r(t);var e=a(2),l=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("本文介绍Mac和Windows两种系统的安装方式")]),s._v(" "),t("h2",{attrs:{id:"mac系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac系统"}},[s._v("#")]),s._v(" Mac系统")]),s._v(" "),t("ol",[t("li",[s._v("官网下载安装包："),t("a",{attrs:{href:"https://dev.mysql.com/downloads/mysql/",target:"_blank",rel:"noopener noreferrer"}},[s._v("MySQL :: Download MySQL Community Server"),t("OutboundLink")],1)])]),s._v(" "),t("blockquote",[t("p",[s._v("备注：可以选择历史版本，这里选择5.6.39版本\n"),t("img",{attrs:{src:a(513),alt:"mysql安装"}})])]),s._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[s._v("选择下载.dmg安装包，双击安装，傻瓜操作。")]),s._v(" "),t("li",[s._v("配置环境变量：在命令行输入"),t("code",[s._v("export PATH=$PATH:/usr/local/mysql/bin")]),s._v(" 即可，如果不成功，前面加上sudo再执行")]),s._v(" "),t("li",[s._v("然后输入"),t("code",[s._v("mysql")]),s._v("即可进入mysql命令行\n"),t("ul",[t("li",[t("img",{attrs:{src:a(514),width:"80%"}})])])]),s._v(" "),t("li",[s._v("输入"),t("code",[s._v("exit")]),s._v("退出mysql命令行")])]),s._v(" "),t("h3",{attrs:{id:"mac下为mysql设置密码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac下为mysql设置密码"}},[s._v("#")]),s._v(" Mac下为MySQL设置密码")]),s._v(" "),t("p",[s._v("初始状态时，我们在命令行输入"),t("code",[s._v("mysql")]),s._v("直接就进入了mysql命令行，这是因为我们的mysql是没有密码的。")]),s._v(" "),t("p",[s._v("在mysql命令行下，输入"),t("code",[s._v("select user()")]),s._v("查看当前是以什么用户登录的，我们可以看到是以root用户登录的。root用户没有密码是一件非常危险的事情，所以我们需要为其设置密码。")]),s._v(" "),t("ol",[t("li",[s._v("退出mysql命令行")]),s._v(" "),t("li",[s._v("输入"),t("code",[s._v('mysqladmin -uroot -p password "123456"')]),s._v("，其中123456是你要设置的密码")]),s._v(" "),t("li",[s._v("之后，我们就需要输入密码才能进入mysql命令行了，输入"),t("code",[s._v("mysql -uroot -p")]),s._v("，然后输入密码即可进入mysql命令行")])]),s._v(" "),t("p",[t("img",{attrs:{src:a(515),alt:"mysql设置密码"}})]),s._v(" "),t("h3",{attrs:{id:"破解已设置密码的mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#破解已设置密码的mysql"}},[s._v("#")]),s._v(" 破解已设置密码的Mysql")]),s._v(" "),t("p",[s._v("当你忘记你本机的mysql-root用户的账号时，需要进行破解，就需要进行以下步骤：")]),s._v(" "),t("ol",[t("li",[s._v("先去系统偏好设置——>mysql——>停掉mysql服务")]),s._v(" "),t("li",[s._v("再用跳过授权表的方式，在命令行启动mysql："),t("code",[s._v("mysqld_safe --skip-grant-tables")])]),s._v(" "),t("li",[s._v("再开启一个终端，输入"),t("code",[s._v("mysql -uroot -p")]),s._v("，发现不用密码就可以进入了")]),s._v(" "),t("li",[s._v("在mysql命令行才，输入"),t("code",[s._v('update mysql.user set password=password("") where user="root" and host="localhost";')])]),s._v(" "),t("li",[s._v("再输入"),t("code",[s._v("flush privileges;")])]),s._v(" "),t("li",[s._v("最后输入"),t("code",[s._v("exit")]),s._v("退出mysql命令行，即生效\n"),t("img",{attrs:{src:a(516),alt:""}})]),s._v(" "),t("li",[s._v("然后需要杀死这个通过跳过授权表的方式启动的mysql服务，输入"),t("code",[s._v("ps aux | grep mysql")]),s._v("，找到对应的进程号，然后输入"),t("code",[s._v("sudo kill -9 进程号")]),s._v("，即可杀死该进程")]),s._v(" "),t("li",[s._v("然后再去系统偏好设置——>mysql——>启动mysql服务")]),s._v(" "),t("li",[s._v("这个时候你在命令行里输入"),t("code",[s._v("mysql -uroot -p")]),s._v('，发现密码已经不需要了，因为刚刚已经设为了""空密码。')])]),s._v(" "),t("h3",{attrs:{id:"统一字符编码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#统一字符编码"}},[s._v("#")]),s._v(" 统一字符编码")]),s._v(" "),t("ol",[t("li",[s._v("首先，我们进入mysql命令行下，输入"),t("code",[s._v("\\s")]),s._v("，可以看到如下图：\n"),t("ul",[t("li",[t("img",{attrs:{src:a(517),alt:"mysql字符编码"}})]),s._v(" "),t("li",[s._v("发现字符编码并不统一")])])]),s._v(" "),t("li",[s._v("我们需要新建一个"),t("code",[s._v("/etc/my.cnf")]),s._v("文件，并添加如下内容："),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("mysqld"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\ncharacter-set-server"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf8\ncollation-server"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf8_general_ci\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("client"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\ndefault-character-set"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf8\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\ndefault-character-set"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf8\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("ul",[t("li",[s._v("保存退出")]),s._v(" "),t("li",[s._v("重启mysql服务, "),t("code",[s._v("sudo /usr/local/mysql/support-files/mysql.server restart")])]),s._v(" "),t("li",[s._v("再进入mysql命令行，输入"),t("code",[s._v("\\s")]),s._v("查看，可以看到字符编码已经统一")]),s._v(" "),t("li",[t("img",{attrs:{src:a(518),alt:""}})])])])]),s._v(" "),t("h2",{attrs:{id:"windows系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#windows系统"}},[s._v("#")]),s._v(" Windows系统")])])}),[],!1,null,null,null);t.default=l.exports}}]);