import {defineUserConfig} from 'vuepress';
import {defaultTheme} from 'vuepress';
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
    // 站点配置
    base: '/vuepress-docs/',
    lang: 'zh-CN',
    title: 'Hello！CC学习伴侣',
    head: [['link', {rel: 'icon', href: '/images/logo.svg'}]],
    description: '这是我的第一个 VuePress 站点',
    // 主题配置
    theme: defaultTheme({
        // Public 文件路径
        logo: '/images/logo.png',
        // 默认主题配置
        navbar: [
            // NavbarItem
            {
                text: 'ES6-11',
                link: '/es6/',
            },
            {
                text: 'NodeJS',
                link: '/nodejs/',
            },
            {
                text: 'Promise+Ajax+Axios',
                link: '/promise/',
            },
            {
                text: 'WebPack5',
                link: '/webpack/',
            },
            {
                text: 'Vue3',
                link: '/vue/',
            },
            {
                text: 'React',
                link: '/react/',
            },
            {
                text: '小程序',
                link: '/wxapp/',
            },
            // {
            //     text: 'ESlint',
            //     link: '/eslint/',
            // },
            // {
            //     text: '单元测试',
            //     link: '/jest/',
            // },
            // {
            //     text: 'Nginx',
            //     link: '/nginx/',
            // },
            {
                text: '前端读书',
                link: '/books/',
            },
            {
                text: '面经汇总',
                link: '/employ/',
            },
            {
                text: 'LeetCode',
                link: '/leetcode/',
            },
        ],
        // 侧边栏对象
        sidebar: {
            '/vue/': [
                {
                    text: 'Guide1',
                    children: ['/page/1.md'],
                },
            ],
            'react/': [ 
                {
                    text: '基础配置',
                    collapsible: true,
                    children: [
                        "/react/base/README.md",
                        "/react/base/base.md",
                        "/react/base/config.md",
                    ],
                },
            ],
            '/webpack/': [
                {
                    text: '基础配置',
                    collapsible: true,
                    children: [
                        "/webpack/base/README.md",
                        "/webpack/base/base.md",
                        "/webpack/base/config.md",
                        "/webpack/base/development.md",
                        "/webpack/base/css.md",
                        "/webpack/base/image.md",
                        "/webpack/base/output.md",
                        "/webpack/base/clean.md",
                        "/webpack/base/font.md",
                        "/webpack/base/other.md",
                        "/webpack/base/javascript.md",
                        "/webpack/base/html.md",
                        "/webpack/base/server.md",
                        "/webpack/base/production.md",
                        "/webpack/base/optimizeCss.md",
                        "/webpack/base/minifyHtml.md",
                        "/webpack/base/summary.md",
                    ],
                },
                {
                    text: '高级优化',
                    collapsible: true,
                    children: [
                        "/webpack/senior/README.md", 
                        "/webpack/senior/enhanceExperience.md", 
                        "/webpack/senior/liftingSpeed.md", 
                        "/webpack/senior/reduceVolume.md", 
                        "/webpack/senior/optimizePerformance.md", 
                        "/webpack/senior/summary.md",
                    ]
                },
                {
                    text: "项目配置",
                    collapsible: true,
                    children: [
                        "/webpack/project/README.md",
                        "/webpack/project/react-cli.md",
                        "/webpack/project/vue-cli.md",
                        "/webpack/project/summary.md"
                    ],
                },
                {
                    text: "原理分析",
                    collapsible: true,
                    children: [
                        "/webpack/origin/README.md",
                        "/webpack/origin/loader.md",
                        "/webpack/origin/plugin.md",
                        "/webpack/origin/summary.md"
                    ],
                },
            ],
            '/eslint/': [
                {
                    text: 'Guide2',
                    children: ['/eslint/2.md'],
                },
            ],
            '/jest/': [
                {
                    text: 'Guide3',
                    children: ['/jest/3.md'],
                },
            ],
            '/books/': [
                {
                    text: '深入理解ES6',
                    collapsible: true,
                    children: ['/books/deepes6/1.md'],
                },
                {
                    text: 'CSS揭秘',
                    collapsible: true,
                    children: ['/books/cssSecret/1.md'],
                }
            ],
            '/leetcode/': [
                {
                    text: 'Guide4',
                    children: ['/leetcode/4.md'],
                },
            ],
        },
    }),
    // 插件
    plugins: [
        searchPlugin({
            // 排除首页
            isSearchable: (page) => page.path !== '/',
            locales: {
                '/': {
                    placeholder: '搜索',
                },
            },
        }),
    ],
});
