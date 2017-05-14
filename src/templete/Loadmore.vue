<template>
  <div class="loadmore">
    <div class="page__bd">
      <div class="weui-loadmore" v-bind:class="{ 'hide' : state != 1 }">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot" v-bind:class="{ 'hide' : state != 2 }">
        <span class="weui-loadmore__tips">到底啦</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-bind:class="{ 'hide' : state != 3 }">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name : "loadmore",
    props : ['state'],
    data() {
      return {
      }
    },
    computed : {

    }
  }


</script>

<style>

</style>
