<template>
  <div class="topic_wrapper wrap">
    <div class="theme_header" id="group">
      <div class="fl theme_header_left">
        <span class="fl">校友圈</span>
      </div>
      <a class="fr create_a" @click="goPublish"><span>发表</span></a>
    </div>
    <div class="content">

      <ul class="theme_list" id="topics"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="50">
        <li v-for="item in noteData" @click="goToDetail(item.noteid)">
          <div class="topic-main">
            <div class="topic-li"><p class="fl top-m-img">
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
            </div>
          </div>
        </li>
      </ul>

    </div>
    <loadmore :state="state"></loadmore>
    <toast :toast="toastState" :message="message"></toast>
  </div>
</template>

<script>

  import Vue from 'vue';
  import Axios from "axios";
  import Loadmore from "../templete/Loadmore.vue";
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
          findStore : this.$store.state
        }
    },
    methods : {
      goPublish : function () {
        this.$router.push("/publish");
      },
      goToDetail : function (noteid) {
        this.$router.push({ path : "/detail/"+noteid });
      },
      loadMore : function () {
        // 初始化数据，初始状态下也会默认会执行一次
//        console.log("loadMore");
        // 状态码等于1，可以动态加载
        if(this.state === 1) {
          this.$store.dispatch("getFindData",this.$route.params.sign);
        }
      },
//      handleData : function (data) {
//        console.log(data);
//      },
      setThisNoteImgInfo : function (imgInfo) {
//          console.log(imgInfo);
        this.noteImgData= imgInfo;
//        console.log("setThisNoteImgInfo");
//        console.log(imgInfo);
//        this.noteImgData = JSON.parse(imgInfo);
//        if(this.noteImgData.length > 1) {
//          this.noteImgClass="noteImgInfo2";
//        }
      }
    },
    components : {
      Loadmore,
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
                this.message = "API处message";
                break;
              }
              case -4: {
                this.state = 3;
                this.toastState = 1;
                this.message = "API处message";

                break;
              }
              default: {
                this.state = 3;
                this.toastState = 1;
                this.message = "API处message";
              }
            }
        },
        'findStore.newNoteData' :  function () {
//            console.log(typeof this.noteData);
            for(var index in this.findStore.newNoteData) {
//              console.log(this.findStore.newNoteData[index]);
              this.noteData.push(this.findStore.newNoteData[index]);
            }
//          console.log(this.noteData);
        }
    },
    created : function () {
      // 先从vuex中加载相关数据
      if(typeof this.findStore.findData[this.$route.params.sign] !== "undefined") {
          for (var index in this.findStore.findData[this.$route.params.sign].data) {
            this.noteData.push(this.findStore.findData[this.$route.params.sign].data[index]);
          }
      }
      else {
        this.$router.push("404");
      }
//      console.log(typeof this.noteData);
//      console.log(this.noteData);
//      console.log("created");
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
