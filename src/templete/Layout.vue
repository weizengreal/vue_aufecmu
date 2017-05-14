<template>

  <div class="weui-tabbar" style="position: fixed">
    <router-link to="/theme" href="javascript:;" v-bind:class="this.$store.state.themeClass"  class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img v-bind:src="this.$store.state.themeImg" alt="" class="weui-tabbar__icon">
                    </span>
      <p class="weui-tabbar__label">主题</p>
    </router-link>
    <router-link to="/find/find" href="javascript:;" v-bind:class="this.$store.state.findClass"  class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img v-bind:src="this.$store.state.findImg" alt="" class="weui-tabbar__icon">
                      <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
                    </span>
      <p class="weui-tabbar__label">发现</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data() {
        return {
        };
    },
    computed: {
    },
    methods : {
    },
    watch : {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if(to.path === "/theme") {
          // 跳转到主题帖子
          this.$store.state.findClass = {"weui-bar__item_on" : false};
          this.$store.state.themeClass = {"weui-bar__item_on" : true};
          this.$store.state.findImg = require("../assets/images/find.png");
          this.$store.state.themeImg = require("../assets/images/theme_click.png");
        }
        else {
          // 默认显示为发现
          this.$store.state.findClass = {"weui-bar__item_on" : true};
          this.$store.state.themeClass = {"weui-bar__item_on" : false};
          this.$store.state.findImg = require("../assets/images/find_click.png");
          this.$store.state.themeImg = require("../assets/images/theme.png");
        }
      }
    },
    mounted : function () {

      if(location.href.split("#/")[1].indexOf("theme") === "theme") {
        this.$store.state.findClass = {"weui-bar__item_on" : false};
        this.$store.state.themeClass = {"weui-bar__item_on" : true};
        this.$store.state.findImg = require("../assets/images/find.png");
        this.$store.state.themeImg = require("../assets/images/theme_click.png");
      }
      else if (location.href.split("#/")[1] === "") {
          // 默认路径将导向find/find
        this.$router.push("/find/find");
      }
      else {
        this.$store.state.findClass = {"weui-bar__item_on" : true};
        this.$store.state.themeClass = {"weui-bar__item_on" : false};
        this.$store.state.findImg = require("../assets/images/find_click.png");
        this.$store.state.themeImg = require("../assets/images/theme.png");
      }
    }
  }
</script>

<style>

</style>
