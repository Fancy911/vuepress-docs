import {defineUserConfig} from 'vuepress';
import type {DefaultThemeOptions} from 'vuepress';
import {searchPlugin} from '@vuepress/plugin-search';
import recoTheme from 'vuepress-theme-reco';
import { palettePlugin } from '@vuepress/plugin-palette'

export default defineUserConfig({
    // 站点配置
    base: '/vuepress-docs/',
    lang: 'zh-CN',
    title: 'Hello！CC学习伴侣',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
    ],
    description: '这是我的第一个 VuePress 站点',
    
    theme: recoTheme({
        catalogTitle: '本页目录大纲',
        autoSetBlogCategories: true,         // 自动设置分类
        // autoAddCategoryToNavbar: true,  // 自动将首页、分类和标签添加至头部导航条
        style: '@vuepress-reco/style-default',
        logo: '/logo.png',
        author: 'lizhiwei09',
        docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
        docsBranch: 'main',
        docsDir: 'example',
        lastUpdatedText: '',
        // series 为原 sidebar
        series: {
            '/docs/theme-reco/': [
                {
                    text: 'module one',
                    children: ['home', 'theme'],
                },
                {
                    text: 'module two',
                    children: ['api', 'plugin'],
                },
            ],
            '/blogs/webpack/': [
                {
                    text: '基础配置',
                    children: [
                        "/blogs/webpack/base/README.md",
                        "/blogs/webpack/base/base.md",
                        "/blogs/webpack/base/config.md",
                        "/blogs/webpack/base/development.md",
                        "/blogs/webpack/base/css.md",
                        "/blogs/webpack/base/image.md",
                        "/blogs/webpack/base/output.md",
                        "/blogs/webpack/base/clean.md",
                        "/blogs/webpack/base/font.md",
                        "/blogs/webpack/base/other.md",
                        "/blogs/webpack/base/javascript.md",
                        "/blogs/webpack/base/html.md",
                        "/blogs/webpack/base/server.md",
                        "/blogs/webpack/base/production.md",
                        "/blogs/webpack/base/optimizeCss.md",
                        "/blogs/webpack/base/minifyHtml.md",
                        "/blogs/webpack/base/summary.md",
                    ],
                },
                {
                    text: '高级优化',
                    collapsible: true,
                    children: [
                        "/blogs/webpack/senior/README.md", 
                        "/blogs/webpack/senior/enhanceExperience.md", 
                        "/blogs/webpack/senior/liftingSpeed.md", 
                        "/blogs/webpack/senior/reduceVolume.md", 
                        "/blogs/webpack/senior/optimizePerformance.md", 
                        "/blogs/webpack/senior/summary.md",
                    ]
                },
                {
                    text: "项目配置",
                    collapsible: true,
                    children: [
                        "/blogs/webpack/project/README.md",
                        "/blogs/webpack/project/react-cli.md",
                        "/blogs/webpack/project/vue-cli.md",
                        "/blogs/webpack/project/summary.md"
                    ],
                },
                {
                    text: "原理分析",
                    collapsible: true,
                    children: [
                        "/blogs/webpack/origin/README.md",
                        "/blogs/webpack/origin/loader.md",
                        "/blogs/webpack/origin/plugin.md",
                        "/blogs/webpack/origin/summary.md"
                    ],
                },
            ],
        },
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
                text: '异步请求',
                children: [
                    {text: 'Promise', link: '/docs/theme-reco/theme'},
                    {text: 'Ajax', link: '/blogs/other/guide'},
                    {text: 'Axios', link: '/blogs/other/guide'},
                ],
            },
            {
                text: 'WebPack5',
                link: '/blogs/webpack/',
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
                text: '前端面试',
                children: [
                    {text: '面经汇总', link: '/docs/theme-reco/theme'},
                    {text: 'LeetCode刷题', link: '/blogs/other/guide'},
                ],
            },
        ],
        // debug: true,
        // navbar: [
        //     {text: 'Home', link: '/'},
        //     {text: 'Categories', link: '/categories/reco/1/'},
        //     {text: 'Tags', link: '/tags/tag1/1/'},
        // ],
        // bulletin: {
        //     body: [
        //         {
        //             type: 'text',
        //             content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
        //             style: 'font-size: 12px;',
        //         },
        //         {
        //             type: 'hr',
        //         },
        //         {
        //             type: 'title',
        //             content: 'QQ 群',
        //         },
        //         {
        //             type: 'text',
        //             content: `
        //   <ul>
        //     <li>QQ群1：1037296104</li>
        //     <li>QQ群2：1061561395</li>
        //     <li>QQ群3：962687802</li>
        //   </ul>`,
        //             style: 'font-size: 12px;',
        //         },
        //         {
        //             type: 'hr',
        //         },
        //         {
        //             type: 'title',
        //             content: 'GitHub',
        //         },
        //         {
        //             type: 'text',
        //             content: `
        //   <ul>
        //     <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
        //     <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
        //   </ul>`,
        //             style: 'font-size: 12px;',
        //         },
        //         {
        //             type: 'hr',
        //         },
        //         {
        //             type: 'buttongroup',
        //             children: [
        //                 {
        //                     text: '打赏',
        //                     link: '/docs/others/donate.html',
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // valineConfig 配置与 1.x 一致
        // valineConfig: {
        //   appId: 'xxx',
        //   appKey: 'xxx',
        //   placeholder: '填写邮箱可以收到回复提醒哦！',
        //   verify: true, // 验证码服务
        //   // notify: true,
        //   recordIP: true,
        //   // hideComments: true // 隐藏评论
        // },
    }),
    plugins: [
        palettePlugin({ preset: 'sass' }),
    ],
});