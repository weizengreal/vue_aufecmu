<template>
  <div class="topic_wrapper wrap">
    <div class="theme_header" id="group">
      <div class="fl theme_header_left">
        <span class="fl">校友圈</span>
      </div>
      <a v-if="isPublish" class="fr create_a" @click="goPublish"><span>发表</span></a>
    </div>
    <div class="content">

      <ul class="theme_list" id="topics"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="50">
        <li v-for="item in noteData" @click="goToDetail(item.noteid)">
          <div class="topic-main">
            <div class="topic-li">
              <p class="fl top-m-img">
                <img :src="item.headimgurl">
              </p>
              <div class="topic-p"><p class="f-3-16">{{ item.nickname }}</p>
                <p class="f-g-11 pt4">{{ item.signtime }}</p></div>
              <em class="theme-narrow"></em></div>
            <div class="f-3-16 topic-m-div">{{ item.content }}<span class="dot"></span></div>
            <div v-if=" item.imgInfo " class="topic-m-img clearfix">
              <ul class="img_list" >
                <li v-for="it in item.imgInfo" :class="item.imgInfo.length > 1 ? 'noteImgInfo1' : 'noteImgInfo2'">
                  <img :src="it" style="margin-top: 0px;">
                </li>
              </ul>
            </div>
            <div v-else></div>
            <div class="pay-list" style="padding-left: 0 !important;">
              <span class="pay-like">{{ item.zan }}</span>
              <span class="pay-reply">{{ item.comcount}}</span>
              <span style="float: right;margin-right: 0;font-size: 1.2rem;">{{ item.theme }}</span>
            </div>
          </div>
        </li>
      </ul>

    </div>
    <!--<loadmore :state="loadState"></loadmore>-->
    <load-more v-show="this.findStore.findData[this.findType].loadState === 1" :tip="'正在加载'"></load-more>
    <load-more v-show="this.findStore.findData[this.findType].loadState === 2" :show-loading="false" :tip="'到底啦'"></load-more>
    <load-more v-show="this.findStore.findData[this.findType].loadState === 3" :show-loading="false" :tip="'暂无数据'"></load-more>
    <toast :toast="toastState" :message="message"></toast>
  </div>
</template>

<script>

  import Vue from 'vue';
  import Axios from "axios";
  import { LoadMore } from 'vux';
  import Toast from "../templete/toast.vue";
  const infiniteScroll =  require('vue-infinite-scroll');
  Vue.use(infiniteScroll);
  export default{
    directives: {infiniteScroll},
    name : "find",
    data () {
        return {
          noteData : [],
          state : 1,
          toastState : 3,
          message : "kong",
          noteImgData : {},
          noteImgClass : "noteImgInfo1",
          findStore : this.$store.state,
          isPublish : true,
          findType : this.$route.params.sign
        }
    },
    methods : {
      goPublish : function () {
        this.$router.push("/publish/"+this.findType);
      },
      goToDetail : function (noteid) {
        this.$router.push({ path : "/detail/"+noteid });
      },
      loadMore : function () {
        // 初始化数据，初始状态下也会默认会执行一次
        // 状态码等于1，可以动态加载
          console.log('loadState', this.findStore.findData[this.findType].loadState);
        if(this.findStore.findData[this.findType].loadState === 1) {
            this.$store.dispatch("getFindData",this.findType);
            this.findStore.findData[this.findType].loadState = 2;
        }
      },
//      handleData : function (data) {
//        console.log(data);
//      },
      setThisNoteImgInfo : function (imgInfo) {
        this.noteImgData= imgInfo;
      }
    },
    components : {
      LoadMore,
      Toast
    },
    watch : {
        'findStore.findDataState' : function () {
            switch (this.$store.state.findDataState) {
              case 1: {
                this.state = 1;
                  break;
              }
              case 2: {
                this.state = 2;
                break;
              }
              case -1: {
                this.state = 3;
                this.toastState = 5;
                this.message = "网络错误";
                break;
              }
              case -2: {
                this.state = 3;
                this.toastState = 1;
                this.message = "请刷新再试";
                break;
              }
              case -4: {
                this.state = 3;
                this.toastState = 1;
                this.message = "主题不存在";
                break;
              }
              default: {
                this.state = 3;
                this.toastState = 1;
                this.message = "网络错误3";
              }
            }
        },
        'findStore.newNoteData' :  function () {
//            console.log(typeof this.noteData);
            for(var index in this.findStore.newNoteData) {
//              console.log(this.findStore.newNoteData[index]);
              this.noteData.push(this.findStore.newNoteData[index]);
            }
            if(this.findStore.findData[this.findType].loadState === 2 || this.findStore.findData[this.findType].loadState === -2){
                this.loadState = 2;
            }
        }
    },
    created : function () {
      // 1.先从vuex中加载相关数据，需要判断当前路由参数是否正确
      if(typeof this.findStore.findData[this.findType] !== "undefined") {
          for (var index in this.findStore.findData[this.findType].data) {
            this.noteData.push(this.findStore.findData[this.findType].data[index]);
          }
      }
      else {
        this.$router.push("404");
      }
      // 2、检测是否为默认发现页，默认则不显示发帖按钮
      if(this.findType === "find") {
          this.isPublish = false;
      }
      else {
          this.isPublish = true;
      }
    },
      beforeRouteUpdate (to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 `this`
          this.noteData=[];
          this.findType = to.params.sign;
          if(typeof this.findStore.findData[this.findType] !== "undefined") {
              for (var index in this.findStore.findData[this.findType].data) {
                  this.noteData.push(this.findStore.findData[this.findType].data[index]);
              }
          }
          else {
              this.$router.push("404");
          }
          // 2、检测是否为默认发现页，默认则不显示发帖按钮
          if(this.findType === "find") {
              this.isPublish = false;
          }
          else {
              this.isPublish = true;
          }
          this.loadMore();
      },
  }

</script>

<style>
  @import "../assets/_css/main.css";
  @import "../assets/_css/join_group.css";

  .noteImgInfo1 {
    width: 90px;
    height: 90px;
    max-height: 90px;
  }

  .noteImgInfo2 {
    /*width: 270px;*/
    max-height: 270px;
    max-width: 270px;
  }
</style>
