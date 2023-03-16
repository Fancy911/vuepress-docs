module.exports = {
    base: '/vuepress-docs/',
    title: 'Hi! CC自习室',
    description: '这是我的第一个 VuePress 站点',
    head: [
        ['link',{rel: 'icon',href: '/logo1.png',}], //浏览器的标签栏的网页图标
        ['meta',{name: 'viewport',content: 'width=device-width,initial-scale=1,user-scalable=no',}], //移动端适配
        ['link', { rel: 'dns-prefetch', href: 'https://s2.loli.net' }], //DNS 预解析 dns-prefetch , 是为了优化图片加载的速度
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
                text: '学习笔记',
                icon: 'reco-document',
                items: [
                    {
                        text: 'ES6-11',
                        link: '/docs/es6/',
                    },
                    {
                        text: 'TypeScript',
                        link: '/docs/typescript/',
                    },
                    {
                        text: 'NodeJS',
                        link: '/docs/nodejs/',
                    },
                    {
                        text: '异步请求',
                        link: '/docs/request/',
                    },
                    {
                        text: 'WebPack5',
                        link: '/docs/webpack/',
                    },
                    {
                        text: 'Vue',
                        link: '/docs/vue/',
                    },
                    {
                        text: 'React',
                        link: '/docs/react/',
                    },
                    {
                        text: '小程序',
                        link: '/docs/wxapp/',
                    },
                    {
                        text: '数据可视化',
                        link: '/docs/data-visual/',
                    },
                ],
            },
            {
                text: '读书会',
                icon: 'reco-menu',
                items: [
                    {
                        text: '观读列表',
                        link: '/books/list/',
                    },
                    {
                        text: '读后感',
                        link: '/books/textType/',
                    },
                    {
                        text: '观后感',
                        link: '/books/mediaType/',
                    },
                    {
                        text: '技术类',
                        link: '/books/tecnType/',
                    },
                ],
            },
            {
                text: '面经汇总',
                icon: 'reco-coding',
                items: [
                    {
                        text: 'CSS&HTML',
                        link: '/interview/csshtml/',
                    },
                    {
                        text: 'JavaScript&ES6',
                        link: '/interview/js/',
                    },
                    {
                        text: '计算机网络',
                        link: '/interview/network/',
                    },
                    {
                        text: 'Vue',
                        link: '/interview/vue/',
                    },
                    {
                        text: 'React',
                        link: '/interview/react/',
                    },
                    {
                      text: 'React',
                      link: '/interview/leetcode/',
                  },
                ],
            },
            // {
            //     text: '小游戏',
            //     icon: 'reco-api',
            //     link: '/miniGame/',
            // },
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
            },
        ],
        sidebar: {
            '/books/list/':[
                '', //书单
                '/books/list/documentaryList', //纪录片
                '/books/list/movieList', //电影
                '/books/list/tvList', //电视剧
                '/books/list/photographyWebsite', //摄影网站
            ],
            '/books/textType/' : [],
            '/books/mediaType/' : [],
            '/books/tecnType/' : [],
            '/docs/webpack/': [
                '',
                {
                    title: '基础配置',
                    children: [
                        "/docs/webpack/base/intro.md",
                        "/docs/webpack/base/base.md",
                        "/docs/webpack/base/config.md",
                        "/docs/webpack/base/development.md",
                        "/docs/webpack/base/css.md",
                        "/docs/webpack/base/image.md",
                        "/docs/webpack/base/output.md",
                        "/docs/webpack/base/clean.md",
                        "/docs/webpack/base/font.md",
                        "/docs/webpack/base/other.md",
                        "/docs/webpack/base/javascript.md",
                        "/docs/webpack/base/html.md",
                        "/docs/webpack/base/server.md",
                        "/docs/webpack/base/production.md",
                        "/docs/webpack/base/optimizeCss.md",
                        "/docs/webpack/base/minifyHtml.md",
                        "/docs/webpack/base/summary.md",
                    ],
                },
                {
                    title: '高级优化',
                    children: [
                        "/docs/webpack/senior/intro", 
                        "/docs/webpack/senior/enhanceExperience", 
                        "/docs/webpack/senior/liftingSpeed", 
                        "/docs/webpack/senior/reduceVolume", 
                        {
                            title:'优化代码性能',
                            children: [
                                "/docs/webpack/senior/codeSplit", 
                                "/docs/webpack/senior/preloadPrefetch", 
                                "/docs/webpack/senior/networkCache", 
                                "/docs/webpack/senior/coreJs", 
                                "/docs/webpack/senior/pwa",
                            ]
                        },
                        "/docs/webpack/senior/summary",
                    ]
                },
                {
                    title: "项目配置",
                    children: [
                        "/docs/webpack/project/intro",
                        "/docs/webpack/project/react-cli",
                        "/docs/webpack/project/vue-cli",
                        "/docs/webpack/project/summary"
                    ],
                },
                {
                    title: "原理分析",
                    children: [
                        "/docs/webpack/origin/intro",
                        "/docs/webpack/origin/loader",
                        "/docs/webpack/origin/plugin",
                        "/docs/webpack/origin/summary"
                    ],
                },
            ],
            '/docs/es6/': [],
            '/docs/typescript/': [
                '',
                {
                    title: 'Ts入门',
                    children: [
                        '/docs/typescript/base/intro',
                        '/docs/typescript/base/environment',
                        '/docs/typescript/base/type',
                        '/docs/typescript/base/compile',
                        '/docs/typescript/base/webpack',
                    ]
                },
                {
                    title: 'Ts面向对象',
                    children: [
                        '/docs/typescript/oop/面向对象',
                        '/docs/typescript/oop/class',
                        '/docs/typescript/oop/constructor',
                        '/docs/typescript/oop/extends',
                        '/docs/typescript/oop/abstract',
                        '/docs/typescript/oop/interface',
                        '/docs/typescript/oop/encapsulation',
                        '/docs/typescript/oop/generic',
                    ]
                },
                {
                    title: 'TS实现简单的贪吃蛇游戏',
                    children: [
                        '/docs/typescript/game/start',
                        '/docs/typescript/game/staticHtml',
                        '/docs/typescript/game/less',
                        '/docs/typescript/game/ts',
                    ]
                },
                {
                    title: 'Ts读书笔记',
                    children: [
                    ]
                }
            ],
            '/docs/nodejs/': [
                '',
                '/docs/nodejs/intro.md',
                {
                    title: 'CommonJS模块化规范',
                    children: [
                        '/docs/nodejs/commonjs/intro',
                        '/docs/nodejs/commonjs/demo',
                    ]
                },
                {
                    title: 'NodeJS常用内置模块',
                    children: [
                        '/docs/nodejs/nodeModule/path',
                        '/docs/nodejs/nodeModule/fs',
                    ]
                },
            ],
            '/docs/request/': [
                '',
                {
                    title: 'Part1-AJAX',
                    children: [
                        '/docs/request/ajax/intro',
                        '/docs/request/ajax/案例',
                        '/docs/request/ajax/jquery',
                        '/docs/request/ajax/axios',
                        '/docs/request/ajax/fetch',
                        '/docs/request/ajax/跨域',
                        '/docs/request/ajax/手写ajax',
                    ]
                },
                {
                    title: 'Part2-Promise',
                    children: [
                        '/docs/request/promise/intro',
                        '/docs/request/promise/base',
                        '/docs/request/promise/properties',
                        '/docs/request/promise/api',
                        '/docs/request/promise/question',
                        '/docs/request/promise/custom',
                        '/docs/request/promise/asyncAwait',
                    ]
                },
                {
                    title: 'Part3-Axios',
                    children: [
                        '/docs/request/axios/intro',
                        '/docs/request/axios/base',
                        '/docs/request/axios/源码分析',
                    ]
                }
            ],
            '/docs/react/': [
                '',
                {
                    title: 'React16-17',
                    children: [
                        {
                            title: 'React基础',
                            children: [
                                '/docs/react/react17/basic/intro',
                                '/docs/react/react17/basic/base',
                                '/docs/react/react17/basic/jsx',
                                '/docs/react/react17/basic/module',
                            ]
                        },
                        {
                            title: 'React面向组件',
                            children: [
                                '/docs/react/react17/component/basic',
                                '/docs/react/react17/component/state',
                                '/docs/react/react17/component/props',
                                '/docs/react/react17/component/refs',
                                '/docs/react/react17/component/eventDeal',
                                '/docs/react/react17/component/受控和非受控组件',
                                '/docs/react/react17/component/lifeCycle',
                                '/docs/react/react17/component/domDiff',
                            ]   
                        },
                        {
                            title: 'React脚手架',
                            children: [
                                '/docs/react/react17/cli/intro',
                                '/docs/react/react17/cli/todo',
                            ]
                        },
                        {
                            title: '网络请求',
                            children: [
                                '/docs/react/react17/netRequest/ajax',
                                '/docs/react/react17/netRequest/proxy',
                                '/docs/react/react17/netRequest/githubDemo',
                            ]
                        },
                        {
                            title: 'React路由',
                            children: [
                                '/docs/react/react17/router/intro',
                                '/docs/react/react17/router/base',
                            ]
                        },
                        '/docs/react/react17/antd/intro',
                        {
                            title: 'Redux',
                            children: [
                                '/docs/react/react17/redux/intro',
                                '/docs/react/react17/redux/redux-api',
                                '/docs/react/react17/redux/react-redux',
                                '/docs/react/react17/redux/纯函数',
                                '/docs/react/react17/redux/案例',
                            ]
                        },
                    ]
                },
                {
                    title: 'React-18',
                    children: []
                },
                {
                    title: 'React-Native',
                    children: []
                },
            ],
            '/docs/wxapp/': [],
            '/docs/vue3/': [],
            '/docs/data-visual/': [],
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
                theme: ["wanko"],
                clean: false,
                info: 'https://github.com/mengqiuleo',
                messages: {
                    welcome: '欢迎来到',
                    home: '心里的花，我想要带你回家',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '你知道我喜欢吃什么吗？痴痴地望着你。'
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
                    bottom: '36px'
                },
            }
        ],
        // 樱花插件
        [
            "sakura", 
            {
                num: 20,  // 默认数量
                show: true, //  是否显示
                zIndex: -1,   // 层级
                img: {
                    replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
                    httpUrl: '...'     // 绝对路径
                }     
            }
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
                        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
                    },
                    {
                        name: '阿拉斯加海湾',
                        artist: '蓝心羽',
                        url: 'http://music.163.com/song/media/outer/url?id=1500569811',
                        cover: 'http://p1.music.126.net/CbWwREaA22LmAv1oOtJt2w==/109951165518862422.jpg?param=130y130'
                    },
                    {
                        name: '骂醒我',
                        artist: '周汤豪',
                        url: 'http://music.163.com/song/media/outer/url?id=202360',
                        cover: 'http://p1.music.126.net/NXhja1ltxdNR0K1yQnxi6A==/109951167389055522.jpg?param=130y130'
                    },
                    {
                        name: '电台情歌',
                        artist: '莫文蔚',
                        url: 'http://music.163.com/song/media/outer/url?id=277822',
                        cover: 'http://p1.music.126.net/ImOQNmJZTzogPdt0-AsyDA==/19045740416582430.jpg?param=130y130'
                    },
                    {
                        name: 'Last Dance',
                        artist: '伍佰 & China Blue',
                        url: 'http://music.163.com/song/media/outer/url?id=157276',
                        cover: 'http://p2.music.126.net/HDdQFXVIlRvR96s0mQyu9g==/109951164170257125.jpg?param=130y130'
                    },
                    {
                        name: '我们俩',
                        artist: '郭顶',
                        url: 'http://music.163.com/song/media/outer/url?id=85571',
                        cover: 'http://p2.music.126.net/WpUDvtRGZc-WE3nuw-PgsA==/85761906967212.jpg?param=130y130'
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
                autoShrink: true,  // 自动缩小
                shrinkMode: 'float', // 缩小模式',  
                floatPosition: 'left', // 指定浮窗模式浮动在哪一侧
                floatStyle: {
                    bottom: '100px',
                    'z-index': '999999'
                },
            }
        ],
    ]
};
