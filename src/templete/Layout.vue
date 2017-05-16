<template>

  <div class="weui-tabbar" style="position: fixed" v-if="this.$store.state.tabbar">
    <router-link to="/theme" href="javascript:;"  class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img v-bind:src="this.themeImg" alt="" class="weui-tabbar__icon">
                    </span>
      <p class="weui-tabbar__label" v-bind:style="{ 'color' : clickTabbar == 2 ? '#000' : '#999999' }" >主题</p>
    </router-link>
    <router-link to="/find/find" href="javascript:;"  class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img v-bind:src="this.findImg" alt="" class="weui-tabbar__icon">
                      <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
                    </span>
      <p class="weui-tabbar__label" v-bind:style="{ 'color' : clickTabbar == 1 ? '#000' : '#999999' }" >发现</p>
    </router-link>
  </div>
</template>

<script>
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
        this.$store.state.tabbar = true;
        if(to.path === "/theme") {
          // 跳转到主题帖子
//          this.findClass = {"weui-bar__item_on" : false};
//          this.themeClass = {"weui-bar__item_on" : true};
          this.clickTabbar = 2;
          this.findImg = require("../assets/images/find.png");
          this.themeImg = require("../assets/images/theme_click.png");
        }
        else if(to.path.indexOf("/detail") === 0) {
          this.$store.state.tabbar = false;
        }
        else {
          // 默认显示为发现
//          this.findClass = {"weui-bar__item_on" : true};
//          this.themeClass = {"weui-bar__item_on" : false};
          this.clickTabbar = 1;
          this.findImg = require("../assets/images/find_click.png");
          this.themeImg = require("../assets/images/theme.png");
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
        this.themeImg = require("../assets/images/theme.png");}
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
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #000;
  }
</style>
