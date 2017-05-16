// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from "vue-router"
import Axios from "axios"
import store from './store'

import App from './App.vue'
import Theme from './components/Theme.vue'
import Find from './components/Find.vue'
import Detail from './components/Detail.vue'
import Publish from './components/Publish.vue'
import NotFound from './components/404.vue'

import "weui/dist/style/weui.css"


Vue.use(VueRouter);
Axios.default.baseURI="https://api.aufe.vip/xyq/";



const routes = [{
  path : "/",
    redirect: '/find/find'
},{
  path : "/theme",
  component : Theme,
},{
  path : "/find/:sign",
  component : Find,
},{
  path : "/detail/:noteid",
  component : Detail,
},{
  path : "/publish/:type",
  component : Publish,
},{
  path : "*",
  component : NotFound,
}];

const router = new VueRouter({
  // mode: 'history',
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   // return 期望滚动到哪个的位置
  //   console.log(to.hash);
  //   if (savedPosition) {
  //     console.log(savedPosition);
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // }
});


var app = new Vue({
  el: '#app',
  data : {
    imgUrl : "http://wx.aufe.vip/aufecmu_v4/public/images/share.png",
  },
  router ,
  store,
  ...App,
  created : function () {
    console.log("初始化应用配置");
    // 初始化权限配置
    // 1、初始化权限
    try {
      if('localStorage' in window && window['localStorage'] !== null) {
        Axios.default.access_token = window['localStorage']['access_token'];
        Axios.default.authority = new Date().getTime()/1000 < window['localStorage']['timeOut'];
      }
      else {
        // 设置accessToken超时
        Axios.default.access_token = "";
        Axios.default.authority = false;
      }
    } catch (e) {
      // 设置accessToken超时
      Axios.default.access_token = "";
      Axios.default.authority = false;
    }
    // 初始化分享
    const self = this,sourceData = new URLSearchParams();
    sourceData.append('url', encodeURIComponent(location.href.split('#')[0]));
  }
});
