module.exports = {
    base: '/vuepress-docs/',
    title: 'Hi! CC自习室',
    description: '这是我的第一个 VuePress 站点',
    head: [
        ['link', {rel: 'icon', href: '/logo1.png'}], //浏览器的标签栏的网页图标
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}], //移动端适配
        ['link', {rel: 'dns-prefetch', href: 'https://s2.loli.net'}], //DNS 预解析 dns-prefetch , 是为了优化图片加载的速度
    ],
    theme: 'reco',
    themeConfig: {
        nav: [
            // {
            //     text: '首页',
            //     link: '/',
            //     icon: 'reco-home',
            // },
            {
                text: '时间线',
                link: '/timeline/',
                icon: 'reco-date',
            },
            {
                text: '大前端',
                icon: 'reco-api',
                items: [
                    {
                        text: 'ES6-11',
                        link: '/fe/es6/',
                    },
                    {
                        text: 'TypeScript',
                        link: '/fe/typescript/',
                    },
                    {
                        text: 'NodeJS',
                        link: '/fe/nodejs/',
                    },
                    {
                        text: '异步请求',
                        link: '/fe/request/',
                    },
                    {
                        text: 'WebPack5',
                        link: '/fe/webpack/',
                    },
                    {
                        text: 'Vue',
                        link: '/fe/vue/',
                    },
                    {
                        text: 'React',
                        link: '/fe/react/',
                    },
                    {
                        text: '小程序',
                        link: '/fe/wxapp/',
                    },
                    {
                        text: '数据可视化',
                        link: '/fe/data-visual/',
                    }
                ],
            },
            {
                text: 'Python全栈',
                icon: 'reco-three',
                items: [
                    {
                        text: 'Python-Web',
                        link: '/python/web/',
                    },
                    {
                        text: 'Python-爬虫',
                        link: '/python/spider/',
                    },
                    {
                        text: '数据库',
                        link: '/python/database/',
                    },
                ],
            },
            {
                text: '信息安全',
                icon: 'reco-other',
                items: [
                    {
                        text: '磐石计划',
                        link: '/safe/stone/',
                    }
                ],
            },
            {
                text: '价值积累',
                icon: 'reco-menu',
                items: [
                    {
                        text: '观读列表',
                        link: '/books/list/',
                    },
                    {
                        text: '读书笔记',
                        link: '/books/textType/',
                    },
                    {
                        text: '课程笔记',
                        link: '/books/mediaType/',
                    },
                    {
                        text: '技术笔记',
                        link: '/books/tecnType/',
                    },
                ],
            },
            {
                text: 'Contact',
                icon: 'reco-account',
                items: [
                    {
                        text: 'GitHub',
                        link: 'https://github.com/recoluan',
                        icon: 'reco-github',
                    },
                ],
            }
        ],
        sidebar: {
            '/books/list/': [
                '', //书单
                '/books/list/documentaryList', //纪录片
                '/books/list/movieList', //电影
                '/books/list/tvList', //电视剧
                '/books/list/photographyWebsite', //摄影网站
            ],
            '/books/textType/': [],
            '/books/mediaType/': [
                '/books/mediaType/shangyehuabu',   
            ],
            '/books/tecnType/': [],
            '/fe/webpack/': [
                '',
                {
                    title: '基础配置',
                    children: [
                        '/fe/webpack/base/intro.md',
                        '/fe/webpack/base/base.md',
                        '/fe/webpack/base/config.md',
                        '/fe/webpack/base/development.md',
                        '/fe/webpack/base/css.md',
                        '/fe/webpack/base/image.md',
                        '/fe/webpack/base/output.md',
                        '/fe/webpack/base/clean.md',
                        '/fe/webpack/base/font.md',
                        '/fe/webpack/base/other.md',
                        '/fe/webpack/base/javascript.md',
                        '/fe/webpack/base/html.md',
                        '/fe/webpack/base/server.md',
                        '/fe/webpack/base/production.md',
                        '/fe/webpack/base/optimizeCss.md',
                        '/fe/webpack/base/minifyHtml.md',
                        '/fe/webpack/base/summary.md',
                    ],
                },
                {
                    title: '高级优化',
                    children: [
                        '/fe/webpack/senior/intro',
                        '/fe/webpack/senior/enhanceExperience',
                        '/fe/webpack/senior/liftingSpeed',
                        '/fe/webpack/senior/reduceVolume',
                        {
                            title: '优化代码性能',
                            children: [
                                '/fe/webpack/senior/codeSplit',
                                '/fe/webpack/senior/preloadPrefetch',
                                '/fe/webpack/senior/networkCache',
                                '/fe/webpack/senior/coreJs',
                                '/fe/webpack/senior/pwa',
                            ],
                        },
                        '/fe/webpack/senior/summary',
                    ],
                },
                {
                    title: '项目配置',
                    children: [
                        '/fe/webpack/project/intro',
                        '/fe/webpack/project/react-cli',
                        '/fe/webpack/project/vue-cli',
                        '/fe/webpack/project/summary',
                    ],
                },
                {
                    title: '原理分析',
                    children: [
                        '/fe/webpack/origin/intro',
                        '/fe/webpack/origin/loader',
                        '/fe/webpack/origin/plugin',
                        '/fe/webpack/origin/summary',
                    ],
                },
            ],
            '/fe/es6/': [],
            '/fe/typescript/': [
                '',
                {
                    title: 'Ts入门',
                    children: [
                        '/fe/typescript/base/intro',
                        '/fe/typescript/base/environment',
                        '/fe/typescript/base/type',
                        '/fe/typescript/base/compile',
                        '/fe/typescript/base/webpack',
                    ],
                },
                {
                    title: 'Ts面向对象',
                    children: [
                        '/fe/typescript/oop/面向对象',
                        '/fe/typescript/oop/class',
                        '/fe/typescript/oop/constructor',
                        '/fe/typescript/oop/extends',
                        '/fe/typescript/oop/abstract',
                        '/fe/typescript/oop/interface',
                        '/fe/typescript/oop/encapsulation',
                        '/fe/typescript/oop/generic',
                    ],
                },
                {
                    title: 'TS实现简单的贪吃蛇游戏',
                    children: [
                        '/fe/typescript/game/start',
                        '/fe/typescript/game/staticHtml',
                        '/fe/typescript/game/less',
                        '/fe/typescript/game/ts',
                    ],
                },
                {
                    title: 'Ts读书笔记',
                    children: [],
                },
            ],
            '/fe/nodejs/': [
                '',
                '/fe/nodejs/intro.md',
                {
                    title: 'Buffer(缓冲器)',
                    children: [
                        '/fe/nodejs/buffer/intro', 
                        '/fe/nodejs/buffer/demo'
                    ],
                },
                {
                    title: '计算机基础',
                    children: [
                        '/fe/nodejs/computer/base', 
                        '/fe/nodejs/computer/进程与线程'
                    ],
                },
                {
                    title: 'fs内置模块',
                    children: [
                        '/fe/nodejs/fs/intro', 
                        '/fe/nodejs/fs/write',
                        '/fe/nodejs/fs/read',
                        '/fe/nodejs/fs/move',
                        '/fe/nodejs/fs/delete',
                        '/fe/nodejs/fs/dir',
                        '/fe/nodejs/fs/status',
                        '/fe/nodejs/fs/path',
                        '/fe/nodejs/fs/demo',
                    ],
                },
                {
                    title: 'path内置模块',
                    children: [
                        '/fe/nodejs/path/base', 
                    ],
                },
                {
                    title: 'HTTP',
                    children: [
                        '/fe/nodejs/http/http_proto', 
                        '/fe/nodejs/http/create_http', 
                        '/fe/nodejs/http/get_http', 
                        '/fe/nodejs/http/http_request_demo', 
                        '/fe/nodejs/http/set_http_response', 
                        '/fe/nodejs/http/load_page', 
                        '/fe/nodejs/http/asset', 
                        '/fe/nodejs/http/getpost', 
                    ],
                },
                {
                    title: '模块化',
                    children: [
                        '/fe/nodejs/modules/intro', 
                        '/fe/nodejs/modules/exportData', 
                        '/fe/nodejs/modules/requireData', 
                        '/fe/nodejs/modules/commonJS', 
                    ],
                },
                {
                    title: '包管理工具',
                    children: [
                        '/fe/nodejs/packageManger/intro', 
                        '/fe/nodejs/packageManger/npm',
                        '/fe/nodejs/packageManger/publishPackage', 
                        '/fe/nodejs/packageManger/yarn', 
                    ],
                },
                {
                    title: 'express框架',
                    children: [
                        '/fe/nodejs/express/intro', 
                        '/fe/nodejs/express/route',
                        '/fe/nodejs/express/response', 
                        '/fe/nodejs/express/middleware', 
                    ],
                },
            ],
            '/fe/request/': [
                '',
                {
                    title: 'Part1-AJAX',
                    children: [
                        '/fe/request/ajax/intro',
                        '/fe/request/ajax/案例',
                        '/fe/request/ajax/jquery',
                        '/fe/request/ajax/axios',
                        '/fe/request/ajax/fetch',
                        '/fe/request/ajax/跨域',
                        '/fe/request/ajax/手写ajax',
                    ],
                },
                {
                    title: 'Part2-Promise',
                    children: [
                        '/fe/request/promise/intro',
                        '/fe/request/promise/base',
                        '/fe/request/promise/properties',
                        '/fe/request/promise/api',
                        '/fe/request/promise/question',
                        '/fe/request/promise/custom',
                        '/fe/request/promise/asyncAwait',
                    ],
                },
                {
                    title: 'Part3-Axios',
                    children: [
                        '/fe/request/axios/intro',
                        '/fe/request/axios/base',
                        '/fe/request/axios/源码分析'
                    ],
                },
                '/fe/request/fetch/fetch'
            ],
            '/fe/react/': [
                '',
                {
                    title: 'React15+',
                    children: [
                        {
                            title: 'React基础',
                            children: [
                                '/fe/react/react17/basic/intro',
                                '/fe/react/react17/basic/base',
                                '/fe/react/react17/basic/jsx',
                                '/fe/react/react17/basic/module',
                            ],
                        },
                        {
                            title: 'React面向组件',
                            children: [
                                '/fe/react/react17/component/basic',
                                '/fe/react/react17/component/state',
                                '/fe/react/react17/component/props',
                                '/fe/react/react17/component/refs',
                                '/fe/react/react17/component/eventDeal',
                                '/fe/react/react17/component/受控和非受控组件',
                                '/fe/react/react17/component/lifeCycle',
                                '/fe/react/react17/component/domDiff',
                            ],
                        },
                        {
                            title: 'React脚手架',
                            children: [
                                '/fe/react/react17/cli/intro',
                                '/fe/react/react17/cli/todo'
                            ],
                        },
                        {
                            title: '网络请求',
                            children: [
                                '/fe/react/react17/netRequest/ajax',
                                '/fe/react/react17/netRequest/proxy',
                                '/fe/react/react17/netRequest/githubDemo',
                            ],
                        },
                        {
                            title: 'React路由',
                            children: [
                                '/fe/react/react17/router/intro',
                                '/fe/react/react17/router/base'
                            ],
                        },
                        '/fe/react/react17/antd/intro',
                        {
                            title: '扩展',
                            children: [
                                '/fe/react/react17/extension/setState',
                                '/fe/react/react17/extension/lazyload',
                                '/fe/react/react17/extension/hooks',
                                '/fe/react/react17/extension/fragment',
                                '/fe/react/react17/extension/context',
                                '/fe/react/react17/extension/组件优化',
                                '/fe/react/react17/extension/renderProps',
                                '/fe/react/react17/extension/错误边界',
                                '/fe/react/react17/extension/组件通信',
                            ],
                        },
                    ],
                },
                {
                    title: 'React17+Hooks',
                    children: [
                        {
                            title: 'React-Router6',
                            children: [
                                '/fe/react/react17/router6/intro',
                                '/fe/react/react17/router6/components',
                                '/fe/react/react17/router6/hooks',
                                '/fe/react/react17/router6/demo',
                            ],
                        },
                        {
                            title: '订餐APP实战',
                            children: [
                                '/fe/react/react18/orderFood/intro',
                                '/fe/react/react18/orderFood/fontAwesome',
                                '/fe/react/react18/orderFood/context',
                                '/fe/react/react18/orderFood/setState',
                                '/fe/react/react18/orderFood/effect',
                                '/fe/react/react18/orderFood/reducer',
                            ],
                        },
                        '/fe/react/react18/memo',
                        '/fe/react/react18/useCallback',
                        {
                            title: 'React接口请求实战',
                            children: [
                                '/fe/react/react18/formDemo/Strapi',
                                '/fe/react/react18/formDemo/自定义钩子',
                            ],
                        },
                    ],
                },
                {
                    title: 'Redux',
                    children: [
                        '/fe/react/redux/intro',
                        '/fe/react/redux/redux-api',
                        '/fe/react/redux/react-redux',
                        '/fe/react/redux/纯函数',
                        '/fe/react/redux/案例',
                    ],
                },
                {
                    title: 'React-Native',
                    children: [],
                },
            ],
            '/fe/wxapp/': [],
            '/fe/vue/': [
                '',
                {
                    title: 'Vue2.x',
                    children: [
                        {
                            title: 'Vue核心',
                            children: [
                                '/fe/vue/vue2/core/intro',
                                '/fe/vue/vue2/core/base',
                                '/fe/vue/vue2/core/eldata',
                                '/fe/vue/vue2/core/mvvm',
                                '/fe/vue/vue2/core/defineProperty',
                                '/fe/vue/vue2/core/事件处理',
                                '/fe/vue/vue2/core/计算属性与监听',
                                '/fe/vue/vue2/core/样式绑定',
                                '/fe/vue/vue2/core/条件渲染',
                                '/fe/vue/vue2/core/列表渲染',
                                '/fe/vue/vue2/core/vue监测数据改变的原理',
                                '/fe/vue/vue2/core/收集表单数据',
                                '/fe/vue/vue2/core/filter',
                                '/fe/vue/vue2/core/directive',
                                '/fe/vue/vue2/core/lifeCircle',
                            ],
                        },
                        '/fe/vue/vue2/component/VueComponent',
                        {
                            title: 'Vue脚手架',
                            children: [
                                '/fe/vue/vue2/cli/intro',
                                '/fe/vue/vue2/cli/组件自定义事件',
                                '/fe/vue/vue2/cli/全局事件总线',
                                '/fe/vue/vue2/cli/消息发布订阅',
                            ],
                        },
                    ],
                },
                {
                    title: 'Vue3',
                    children: [
                    ],
                },
            ],
            '/fe/data-visual/': [],
            '/python/web/': [
                '',
                '/python/web/1.install',
                '/python/web/2.yufa',
            ],
            '/python/database/': [
                '',
                {
                    title: 'MySQL',
                    children: [
                       '/python/database/mysql/intro',
                       '/python/database/mysql/sqlbase',
                    ],
                },
            ],
            '/safe/stone/': [
                '/safe/stone/初探安全.md',
                '/safe/stone/环境搭建.md',
            ]
        },
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,
                text: '类目',
            },
            tag: {
                location: 3,
                text: '标签',
            },
        },
        friendLink: [
            {
                title: "CC's Learning Park",
                desc: '银河有迹可循.',
                avatar: 'http://ssblog.cc:8090/upload/2021/12/2208x1242-9566baa110bd4c9682471c23a3db4755.jpg',
                link: 'http://ssblog.cc:8090/',
            },
            {
                title: "Zed's Script Garden",
                desc: 'Hi, Nice to Meet you.',
                avatar: 'http://blog.lonelyme.cn/upload/2021/12/logo-cdb01961def2411db8695eb1fc769eb3.png',
                link: 'http://blog.lonelyme.cn/',
            },
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
                link: 'https://vuepress-theme-reco.recoluan.com',
            },
        ],
        logo: '/logo1.png',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        author: 'lizhiwei09',
        authorAvatar: '/avatar.png',
        subSidebar: 'auto',
        // record: 'xxxx',
        // startYear: '2017',
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [
        // 鼠标点击特效
        // [
        //     'cursor-effects',
        //     {
        //        size: 4, // size of the particle, default: 2
        //        shape: ['star'], // shape of the particle, default: 'star'
        //        zIndex: 999999999, // z-index property of the canvas, default: 999999999
        //     },
        // ],
        // 看板娘插件
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang',
            {
                theme: ['wanko'],
                clean: false,
                info: 'https://github.com/mengqiuleo',
                messages: {
                    welcome: '欢迎来到',
                    home: '心里的花，我想要带你回家',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '你知道我喜欢吃什么吗？痴痴地望着你。',
                },
                messageStyle: {
                    right: '50px',
                    bottom: '150px',
                    fontSize: '14px',
                    opacity: '0.8',
                    color: '#fff',
                    backgroundColor: '#435dee',
                    height: '50px',
                },
                btnStyle: {
                    right: '70px',
                    bottom: '36px',
                },
            },
        ],
        // 樱花插件
        [
            'sakura',
            {
                num: 20, // 默认数量
                show: true, //  是否显示
                zIndex: -1, // 层级
                img: {
                    replace: false, // false 默认图 true 换图 需要填写httpUrl地址
                    httpUrl: '...', // 绝对路径
                },
            },
        ],
        // 音乐插件
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                // 播放列表
                audios: [
                    {
                        name: '小摩托 (Live)',
                        artist: '郁可唯',
                        url: 'http://music.163.com/song/media/outer/url?id=1493073534',
                        cover: 'https://assets.smallsunnyfox.com/music/2.jpg',
                    },
                    {
                        name: '阿拉斯加海湾',
                        artist: '蓝心羽',
                        url: 'http://music.163.com/song/media/outer/url?id=1500569811',
                        cover: 'http://p1.music.126.net/CbWwREaA22LmAv1oOtJt2w==/109951165518862422.jpg?param=130y130',
                    },
                    {
                        name: '骂醒我',
                        artist: '周汤豪',
                        url: 'http://music.163.com/song/media/outer/url?id=202360',
                        cover: 'http://p1.music.126.net/NXhja1ltxdNR0K1yQnxi6A==/109951167389055522.jpg?param=130y130',
                    },
                    {
                        name: '电台情歌',
                        artist: '莫文蔚',
                        url: 'http://music.163.com/song/media/outer/url?id=277822',
                        cover: 'http://p1.music.126.net/ImOQNmJZTzogPdt0-AsyDA==/19045740416582430.jpg?param=130y130',
                    },
                    {
                        name: 'Last Dance',
                        artist: '伍佰 & China Blue',
                        url: 'http://music.163.com/song/media/outer/url?id=157276',
                        cover: 'http://p2.music.126.net/HDdQFXVIlRvR96s0mQyu9g==/109951164170257125.jpg?param=130y130',
                    },
                    {
                        name: '我们俩',
                        artist: '郭顶',
                        url: 'http://music.163.com/song/media/outer/url?id=85571',
                        cover: 'http://p2.music.126.net/WpUDvtRGZc-WE3nuw-PgsA==/85761906967212.jpg?param=130y130',
                    },
                ],
                // 播放器位置
                position: {
                    left: '20px',
                    bottom: '20px',
                    width: '269px',
                    height: '80px',
                    zIndex: '999999',
                },
                autoplay: false, // 自动播放
                autoShrink: true, // 自动缩小
                shrinkMode: 'float', // 缩小模式',
                floatPosition: 'left', // 指定浮窗模式浮动在哪一侧
                floatStyle: {
                    bottom: '100px',
                    'z-index': '999999',
                },
            },
        ],
    ],
};
