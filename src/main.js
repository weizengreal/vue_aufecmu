// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var isProduction = process.env.NODE_ENV === 'production';
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
import { WechatPlugin , ToastPlugin } from 'vux'


// import "weui/dist/style/weui.css"


Vue.use(VueRouter);
Vue.use(WechatPlugin);
Vue.use(ToastPlugin);
Axios.default.baseURI="https://api.aufe.vip/xyqdev/";





const routes = [{
  path : "/",
    redirect: '/theme'
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
    if (isProduction) {
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
    } else {
      var auth = true;
      Axios.default.baseURI="https://api.aufe.vip/xyqdev/";
      Axios.default.access_token = "$2y$10$GZIXZ0fw2UFQG47qBRqFHetwlm/1i4NIfgB8VW/xA5MBjxHIHkpVu";
        window['localStorage']['headimgurl']='http://wx.qlogo.cn/mmopen/icmQ48CnYice8MUpvmcQF6yDzZqVjcypYvcDyCrff1L3np3flwV1gPn39tUHibhaWzrbqLt5YPK1frHB6qwnzrQV4nZduemCqLp/0';
        window['localStorage']['nickname']='Lego';
    }
    // 初始化分享
    const self = this,wx = this.$wechat,sourceData = new URLSearchParams(),
        title='安财人的聚集地-连接十万安财人',desc='我们身处世界各地，我们是彼此最坚强的后盾。',imgUrl='http://wx.aufe.vip/static/share.jpg';
    sourceData.append('url', encodeURIComponent(location.href.split('#')[0]));
      Axios.post('https://api.aufe.vip/jssdk/zacShare',sourceData).then(function (response) {
          const data = response.data;
          wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: [
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'onMenuShareQZone',
                  'previewImage',
                  'hideAllNonBaseMenuItem',
                  'showAllNonBaseMenuItem'
              ]
          });

          wx.ready(function () {

              wx.onMenuShareTimeline({
                  title: title, // 分享标题
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: imgUrl, // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });

              wx.onMenuShareAppMessage({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: imgUrl, // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });


              wx.onMenuShareQQ({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: imgUrl, // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });


              wx.onMenuShareWeibo({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: imgUrl, // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });


              wx.onMenuShareQZone({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: imgUrl, // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });



          });

      })



  }
});
