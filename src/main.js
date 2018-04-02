// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const isProduction = process.env.NODE_ENV === 'production';
// 引入基本类库
import Vue from 'vue'
import VueRouter from "vue-router"

// 引入自身组件
import Axios from "axios"
import store from './store'
import App from './App.vue'
import Theme from './components/Theme.vue'
import Find from './components/Find.vue'
import Detail from './components/Detail.vue'
import Publish from './components/Publish.vue'
import NotFound from './components/404.vue'

// 引入第三方组件
import { WechatPlugin , ToastPlugin } from 'vux'

// 引入自身组件
import shareReady from './utils/share'

// 使用组件
Vue.use(VueRouter);
Vue.use(WechatPlugin);
Vue.use(ToastPlugin);
Axios.default.baseURI="http://api.aufe.vip/xyq/";





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
    methods : {
        getQueryString : function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
    },
  created : function () {
    console.log("初始化应用配置");
    // 初始化权限配置
    // 1、初始化权限  wx.aufe.vip/aufecmu_v4/share
      const noteid=this.getQueryString("noteid");
      if(noteid != null && noteid.toString().length>1) {
          this.$store.state.isShare = true;
          this.$router.push({ path : "/detail/"+noteid });
      }
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
      Axios.default.baseURI="http://api.aufe.vip/xyqdev/";
      Axios.default.access_token = "$2y$10$GZIXZ0fw2UFQG47qBRqFHetwlm/1i4NIfgB8VW/xA5MBjxHIHkpVu";
        window['localStorage']['headimgurl']='http://wx.qlogo.cn/mmopen/icmQ48CnYice8MUpvmcQF6yDzZqVjcypYvcDyCrff1L3np3flwV1gPn39tUHibhaWzrbqLt5YPK1frHB6qwnzrQV4nZduemCqLp/0';
        window['localStorage']['nickname']='Lego';
    }
    // 初始化分享

    const self = this,wx = this.$wechat,sourceData = new URLSearchParams();
    sourceData.append('url', encodeURIComponent(location.href.split('#')[0]));
      Axios.post('http://api.aufe.vip/jssdk/zacShare',sourceData).then(function (response) {
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

          shareReady(wx);

      })




  }
});
