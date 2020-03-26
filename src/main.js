/*
 * @Author: your name
 * @Date: 2020-02-13 15:02:04
 * @LastEditTime: 2020-03-08 21:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.axios = axios;
/* eslint-disable no-new */
import Login from '../src/components/login.vue'
import Register from '../src/components/register.vue'
import Home from '../src/components/home.vue'
import Recommand from '../src/components/content/news_recommand.vue'
import Hot from '../src/components/content/news_hot.vue'
import Game from '../src/components/content/news_game.vue'
import Finance from '../src/components/content/news_finance.vue'
import Sport from '../src/components/content/news_sport.vue'
import Star from '../src/components/content/news_star.vue'
import Tech from '../src/components/content/news_tech.vue'
import ReDetail from '../src/components/detail/recommand_detail.vue'

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/register', component: Register },
  {
    path:'/',
    component:Home,
    children:[
      {path:'/',component:Recommand}, //格式是这个格式一个/:+名字
      {path:'/content/news_hot',component:Hot},
      {path:'/content/news_game',component:Game},
      {path:'/content/news_finance',component:Finance},
      {path:'/content/news_sport',component:Sport},
      {path:'/content/news_star',component:Star},
      {path:'/content/news_tech',component:Tech},

    ]
  },
  {path:'/login',component:Login},
  {path:'/re_detail',component:ReDetail},
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
