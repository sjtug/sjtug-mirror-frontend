<template>
    <div>
        <nav>
            <div class="light-blue nav-wrapper">
                <div class="container">
                    <a href="#" class="brand-logo center" style="height: 100%"><img src="https://raw.githubusercontent.com/sjtug/sjtug.github.io/master/img/Rocket120.png" alt="logo" style="vertical-align: middle; max-height: 80%; margin: auto"> SJTUG Mirror</a>
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li><router-link to="/" exact>首页</router-link></li>
                        <li><router-link to="/news">新闻</router-link></li>
                        <li><router-link to="/helps">帮助</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="body-container container">
            <noscript>
                你的浏览器似乎不支持Javascript。
            </noscript>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <!-- 
            -->
        </div>

        <footer class="page-footer light-blue darken-4">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">SJTUG软件源镜像</h5>
                        <p class="grey-text text-lighten-4">Supported by SJTU Net&amp;Infomation Center</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">链接</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="http://sjtug.org">SJTUG主页</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
body, button, input, select, textarea, h1 ,h2, h3, h4, h5, h6 { 
    font-family: "Heiti SC", "Hiragino Sans GB", "STHeiti", "Source Han Sans CN", "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", "微软雅黑", sans-serif;
}

.body-container
{
    margin-top: 2em;
	/*margin-left: 4%;
	 margin-right: 0%;*/
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
<script>
    export default {};
</script>
