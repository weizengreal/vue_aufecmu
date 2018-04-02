<template>

    <div id="menu" class="menu">
        <router-link class="subMenu text-center" to="/theme" href="javascript:;">
            <img v-bind:src="this.themeImg" class="menu_img" />
            <p class="menu_name" v-bind:style="{ 'color' : clickTabbar == 2 ? '#000' : '#999999' }">主题</p>
        </router-link>
        <router-link class="subMenu text-center" to="/find/find" href="javascript:;">
            <img v-bind:src="this.findImg" class="menu_img" />
            <p class="menu_name" v-bind:style="{ 'color' : clickTabbar == 1 ? '#000' : '#999999' }">发现</p>
        </router-link>
    </div>

</template>

<script>
    import shareReady from '../utils/share';
  export default {
    name: 'layout',
    data() {
        return {
          clickTabbar : 1,
          findImg : require("../assets/images/find_click.png"),
          themeImg : require("../assets/images/theme.png"),
        };
    },
    computed: {
    },
    methods : {
    },
    watch : {
      '$route' (to, from) {
            // 对路由变化作出响应...
          const wx = this.$wechat,shareUrl='wx.aufe.vip/aufecmu_v4/share';
          wx.showAllNonBaseMenuItem();
          this.$store.state.tabbar = true;
        if(to.path === "/theme") {
            // 跳转到主题帖子
            this.clickTabbar = 2;
            this.findImg = require("../assets/images/find.png");
            this.themeImg = require("../assets/images/theme_click.png");
            shareReady(wx);
        }
        else if(to.path.indexOf("/detail") === 0) {
            this.$store.state.tabbar = false;
        }
        else if(to.path.indexOf("/publish") === 0) {
            // 禁止微信分享
            wx.hideAllNonBaseMenuItem();
        }
        else {
            // 默认显示为发现
            this.clickTabbar = 1;
            this.findImg = require("../assets/images/find_click.png");
            this.themeImg = require("../assets/images/theme.png");
            shareReady(wx);
        }
      }
    },
    mounted : function () {
        this.$store.state.tabbar = true;
      if(location.href.split("#/")[1].indexOf("theme") === 0) {
//        this.findClass = {"weui-bar__item_on" : false};
//        this.themeClass = {"weui-bar__item_on" : true};
        this.clickTabbar = 2;
        this.findImg = require("../assets/images/find.png");
        this.themeImg = require("../assets/images/theme_click.png");
      }
      else if (location.href.split("#/")[1] === "") {
          // 默认路径将导向find/find
        this.$router.push("/find/find");
      }
      else if (location.href.split("#/")[1].indexOf("detail") === 0) {
        this.$store.state.tabbar = false;
        this.clickTabbar = 2;
        this.findImg = require("../assets/images/find_click.png");
        this.themeImg = require("../assets/images/theme.png");
      }
      else {
//        this.findClass = {"weui-bar__item_on" : true};
//        this.themeClass = {"weui-bar__item_on" : false};
        this.clickTabbar = 1;
        this.findImg = require("../assets/images/find_click.png");
        this.themeImg = require("../assets/images/theme.png");
      }
    }
  }
</script>

<style>

  .menu {
      display: block;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 45px;
      color: #474747;
      /*padding-top: 10px;*/
      border-top: 1px solid #c0bfc466;
      background-color: #f7f7fa;
  }

  .subMenu {
      width: 50%;
      float: left;
      cursor: pointer;
  }

  .menu_name {
      height: 30px;
      width: 100%;
      font-size: 10px;
      line-height: 1.5;
      padding-top: 1px;
  }

  img.menu_img {
      height: 22px;
      width: 22px;
      padding-top: 1px;
  }

  img {
      vertical-align: middle;
      border: 0;
  }

  .text-center {
      text-align: center
  }

</style>
