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
                        text: 'NodeJS',
                        link: '/docs/nodejs/',
                    },
                    {
                        text: '异步请求',
                        link: '/docs/promise/',
                    },
                    {
                        text: 'WebPack5',
                        link: '/docs/webpack/',
                    },
                    {
                        text: 'Vue3',
                        link: '/docs/vue3/',
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
                icon: 'reco-menu',
                items: [
                    {
                        text: '读书笔记',
                        link: '/books/normal/',
                    },
                    {
                        text: '学习笔记',
                        link: '/books/tecn/',
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
                        link: '/interview/js',
                    },
                    {
                        text: '计算机网络',
                        link: '/interview/network',
                    },
                    {
                        text: 'Vue',
                        link: '/interview/vue',
                    },
                    {
                        text: 'React',
                        link: '/interview/react',
                    },
                ],
            },
            {
                text: 'LeetCode',
                icon: 'reco-api',
                link: '/blogs/leetcode/',
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
            },
        ],
        sidebar: {
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
                        "/docs/webpack/senior/optimizePerformance", 
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
            '/docs/nodejs/': [
                '',
                '/docs/nodejs/intro.md',
                '/docs/nodejs/commonJS.md',
            ],
            '/docs/promise/': [],
            '/docs/react/': [],
            '/docs/wxapp/': [],
            '/docs/vue3/': [],
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
        subSidebar: 'auto',
        // record: 'xxxx',
        // startYear: '2017',
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [
        // 鼠标点击特效
        [
            'cursor-effects',
            {
               size: 4, // size of the particle, default: 2
               shape: ['star'], // shape of the particle, default: 'star'
               zIndex: 999999999, // z-index property of the canvas, default: 999999999
            },
        ],
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
                    },
                    {
                        name: '白色风车',
                        artist: '周杰伦',
                        url: 'https://hainueducn-my.sharepoint.com/personal/wangluoxinxizhongxin_hainu_edu_cn/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E4%BE%9D%E7%84%B6%E8%8C%83%E7%89%B9%E8%A5%BF%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%20%2D%20%E7%99%BD%E8%89%B2%E9%A3%8E%E8%BD%A6%2Eflac&parent=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E4%BE%9D%E7%84%B6%E8%8C%83%E7%89%B9%E8%A5%BF',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
                    },
                    {
                        name: '开不了口',
                        artist: '周杰伦',
                        url:'https://hainueducn-my.sharepoint.com/personal/wangluoxinxizhongxin_hainu_edu_cn/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E8%8C%83%E7%89%B9%E8%A5%BF%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%20%2D%20%E5%BC%80%E4%B8%8D%E4%BA%86%E5%8F%A3%2Eflac&parent=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E8%8C%83%E7%89%B9%E8%A5%BF',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
                    },
                    {
                        name: 'Mine Mine',
                        artist: '周杰伦',
                        url: 'https://hainueducn-my.sharepoint.com/personal/wangluoxinxizhongxin_hainu_edu_cn/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E6%83%8A%E5%8F%B9%E5%8F%B7%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%20%2D%20Mine%20Mine%2Eflac&parent=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E6%83%8A%E5%8F%B9%E5%8F%B7',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
                    },
                    {
                        name: '半岛铁盒',
                        artist: '周杰伦',
                        url: 'https://hainueducn-my.sharepoint.com/personal/wangluoxinxizhongxin_hainu_edu_cn/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E5%85%AB%E5%BA%A6%E7%A9%BA%E9%97%B4%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%20%2D%20%E5%8D%8A%E5%B2%9B%E9%93%81%E7%9B%92%2Eflac&parent=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E5%85%AB%E5%BA%A6%E7%A9%BA%E9%97%B4',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
                    },
                    {
                        name: '晴天',
                        artist: '周杰伦',
                        url: 'https://hainueducn-my.sharepoint.com/personal/wangluoxinxizhongxin_hainu_edu_cn/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E5%8F%B6%E6%83%A0%E7%BE%8E%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%20%2D%20%E6%99%B4%E5%A4%A9%2Eflac&parent=%2Fpersonal%2Fwangluoxinxizhongxin%5Fhainu%5Fedu%5Fcn%2FDocuments%2FMUSIC%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%2F%E5%8F%B6%E6%83%A0%E7%BE%8E',
                        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
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
