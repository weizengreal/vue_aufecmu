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
import { WechatPlugin } from 'vux'

import "weui/dist/style/weui.css"
Vue.use(VueRouter);
Vue.use(WechatPlugin);
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

// window['localStorage']['access_token']="$2y$10$Zz/djGPUFc6BvdS3uK7XjuOvMIxTW4m0RfKFZP1CWCnZZar4c6tmu";
// window['localStorage']['timeOut']="1495281585";



var app = new Vue({
  el: '#app',
  data : {
    height : "auto",
  },
  router ,
  store,
  ...App,
  created : function () {
    Axios({
      method: 'post',
      url: '//api.aufe.vip/jssdk/zacShare',
      data: JSON.stringify({
        url: `${window.location.host}?${window.location.href.split('?')[1]}`,
      })
    }).then(res => {
      this.$wechat.config(res.data)
    })
    console.log("初始化应用配置");
    // 初始化权限配置
    // 1、初始化权限
    var auth = true;
    try {
      if('localStorage' in window && window['localStorage'] !== null && typeof window['localStorage']['access_token'] !== "undefined" && typeof window['localStorage']['timeOut'] !== "undefined") {
        Axios.default.access_token = window['localStorage']['access_token'];
        auth = new Date().getTime()/1000 < window['localStorage']['timeOut'];
      }
      else {
        // 设置accessToken超时
        Axios.default.access_token = "";
          auth = false;
      }
    } catch (e) {
      // 设置accessToken超时
      Axios.default.access_token = "";
        auth = false;
    }
    if(!auth) {
        var url = encodeURIComponent("http://wx.aufe.vip/aufecmu_v4/xyq?redirectUri="+encodeURIComponent(window.location.href));
        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5aba40d737e98b5d&redirect_uri='+url
            +'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    }
    // 初始化可见区域的高度
    // this.height = (window.screen.availHeight - 53) + "px";
    // 初始化主题配置文件
    // store.dispatch();
  }
});
