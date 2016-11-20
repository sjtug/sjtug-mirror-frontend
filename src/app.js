import 'babel-polyfill';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize';
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import main from './main.vue';
import helps from './helps.vue';
import news from './news.vue';
import update from './update';

Vue.use(VueRouter);

const routes = [
    { path: '/',
        component: main,
    },
    { path: '/news',
        component: news,
    },
    { path: '/helps',
        component: helps,
    },
];

const router = new VueRouter({
    routes,
});

export default new Vue({
    router,
    components: {
        app,
    },
}).$mount('#main');

update.start();
