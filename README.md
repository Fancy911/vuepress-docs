---
home: true
heroText: CC自习室
tagline: A simple and beautiful vuepress blog theme.
# heroImage: /hero.png
# heroImageStyle: {
#   maxWidth: '600px',
#   width: '100%',
#   display: block,
#   margin: '9rem auto 2rem',
#   background: '#fff',
#   borderRadius: '1rem',
# }
bgImage: /bg.svg
bgImageStyle: {
  top: '-80px',
  height: '980px',
}
isShowTitleInHome: false
actionText: Guide
actionLink: /views/other/guide
features:
- title: Yesterday
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题
- title: Today
  details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
- title: Tomorrow
  details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
---
<style>
    body {        
      background-image: url(.vuepress/public/star.gif);   
      /* background-repeat: repeat-x ; */
      /* background-size:100% 100%; */
    }  
    .navbar {
        background: transparent !important;
    }
    .navbar .site-name {
        font-family: Hannotate SC;
        font-size: 1.3rem !important;
    }
    .nav-links .nav-item {
        font-family: Wawati SC;
        font-size: 1.2rem !important;
    }
    .home-blog .hero h1 {
        font-size: 5.5rem !important;
        font-weight: 900 !important;
        text-shadow: 1px 1px 9px #f96, -1px -1px 2px #f96;
        /* text-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 50px #fff, 0 0 50px #1123d5, 0 0 72px #1123d5; */
        font-family: Hannotate SC;
    }
    .home-blog .hero .description {
        font-family: Hannotate SC;
    }
    .links {
        background-color: transparent !important;
    }
    .anchor-down {
        display: block;
        margin: 12rem auto 0;
        bottom: 45px;
        width: 20px;
        height: 20px;
        font-size: 34px;
        text-align: center;
        animation: bounce-in 5s 3s infinite;
        position: absolute;
        left: 50%;
        bottom: 30%;
        margin-left: -10px;
        cursor: pointer;
    }
    @-webkit-keyframes bounce-in {
        0% {
            transform: translateY(0);
        }
        20% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
        80% {
            transform: translateY(0);
        }
        to {
            transform: translateY(0);
        }
    }
    .anchor-down::before {
        content: "";
        width: 20px;
        height: 20px;
        display: block;
        border-right: 3px solid var(--text-color);
        border-top: 3px solid var(--text-color);
        transform: rotate(135deg);
        position: absolute;
        bottom: 10px;
    }
    .anchor-down::after {
        content: "";
        width: 20px;
        height: 20px;
        display: block;
        border-right: 3px solid var(--text-color);
        border-top: 3px solid var(--text-color);
        transform: rotate(135deg);
    }
</style>
<script>
    export default {     
        mounted () {       
            const ifJanchor = document.getElementById("JanchorDown");        
            ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);       
            let a = document.createElement('a');       
            a.id = 'JanchorDown';       
            a.className = 'anchor-down';       
            document.getElementsByClassName('hero')[0].append(a);       
            let targetA = document.getElementById("JanchorDown");       
            targetA.addEventListener('click', e => { 
                // 添加点击事件         
                this.scrollFn();       
            })     
        },        
        methods: {       
            scrollFn() {         
                const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度         
                document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置       
            }     
        }   
    }
</script>
