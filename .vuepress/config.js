module.exports = {
    base: '/vuepress-docs/',
    title: 'Hi!小柴自习室',
    description: '这是我的第一个 VuePress 站点',
    // "dest": "public",
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/logo1.png',
            },
        ],
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no',
            },
        ],
    ],
    theme: 'reco',
    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/',
                icon: 'reco-home',
            },
            {
                text: 'TimeLine',
                link: '/timeline/',
                icon: 'reco-date',
            },
            {
                text: 'Docs',
                icon: 'reco-message',
                items: [
                    {
                        text: 'vuepress-reco',
                        link: '/docs/theme-reco/',
                    },
                    {
                        text: 'ES6-11',
                        link: '/docs/es6/',
                    },
                    {
                        text: 'NodeJS',
                        link: '/docs/nodejs/',
                    },
                    {
                        text: 'Promise+Ajax+Axios',
                        link: '/docs/promise/',
                    },
                    {
                        text: 'WebPack5',
                        link: '/docs/webpack/',
                    },
                    {
                        text: 'Vue3',
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
                ],
            },
            {
                text: '读书会',
                icon: 'reco-message',
                items: [
                    {
                        text: '读书笔记',
                        link: '/blogs/books/',
                    },
                    {
                        text: '学习笔记',
                        link: '/blogs/books/',
                    },
                ],
            },
            {
                text: '面经汇总',
                icon: 'reco-message',
                items: [
                    {
                        text: 'CSS&HTML',
                        link: '/blogs/interview/',
                    },
                    {
                        text: 'JavaScript&ES6',
                        link: '/blogs/interview/',
                    },
                    {
                        text: 'Vue',
                        link: '/blogs/interview/',
                    },
                    {
                        text: 'React',
                        link: '/blogs/interview/',
                    },
                    {
                        text: '前端性能优化',
                        link: '/blogs/interview/',
                    },
                ],
            },
            {
                text: 'LeetCode',
                link: '/leetcode/',
            },
            {
                text: 'Contact',
                icon: 'reco-message',
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
            '/docs/theme-reco/': ['', 'theme', 'plugin', 'api'],
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
                        "senior/intro", 
                        "senior/enhanceExperience", 
                        "senior/liftingSpeed", 
                        "senior/reduceVolume", 
                        "senior/optimizePerformance", 
                        "senior/summary",
                    ]
                },
                {
                    title: "项目配置",
                    children: [
                        "project/intro",
                        "project/react-cli",
                        "project/vue-cli",
                        "project/summary"
                    ],
                },
                {
                    title: "原理分析",
                    children: [
                        "origin/intro",
                        "origin/loader",
                        "origin/plugin",
                        "origin/summary"
                    ],
                },
            ],
        },
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,
                text: 'Category',
            },
            tag: {
                location: 3,
                text: 'Tag',
            },
        },
        friendLink: [
            {
                title: '午后南杂',
                desc: 'Enjoy when you can, and endure when you must.',
                email: '1156743527@qq.com',
                link: 'https://www.recoluan.com',
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
        // record: 'xxxx',
        // startYear: '2017',
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [
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
        // // 樱花插件
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
                    // 网络文件示例
                    {
                        name: '강남역 4번 출구',
                        artist: 'Plastic / Fallin` Dild',
                        url: 'https://assets.smallsunnyfox.com/music/2.mp3',
                        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
                    },
                    {
                        name: '用胳膊当枕头',
                        artist: '최낙타',
                        url: 'https://assets.smallsunnyfox.com/music/3.mp3',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
                    }
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
                autoShrink: false,  // 自动缩小
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
