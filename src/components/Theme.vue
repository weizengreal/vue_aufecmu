<template>
  <div class="page js_show" ontouchstart>
    <div class="page__bd">
      <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <div class="weui-cell weui-cell_access" @click="goFind('schoolOfficial')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/schoolOfficial.png" class="weui-cell-img">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">诚信博学，知行统一</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>
              <div class="weui-cell weui-cell_access" @click="goFind('where')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/where.png"
                    class="weui-cell-img">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">一张图说说你在哪儿</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell weui-cell_access" @click="goFind('lostAndFound')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/lostAndFound.png"
                    class="weui-cell-img">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">龙子湖失物招领处</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell weui-cell_access" @click="goFind('love')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/love.png"
                    class="weui-cell-img">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">表白区，虐虐单身狗</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell weui-cell_access" @click="goFind('tradeCenter')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/tradeCenter.png"
                       class="weui-cell-img">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">曹山路二手交易中心</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>
              <div class="weui-cell weui-cell_access" @click="goFind('officialTucao')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img class="weui-cell-img" src="../assets/icon/officialTucao.png">
                </div>
                <div class="weui-cell__bd">
                  <span class="weui-cell-text">官方吐槽区</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #BFBBBB;border-right: 2px solid #BFBBBB;transform:rotate(-45deg);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default{
  name : "theme",
  data () {
      return {};
  },
  methods : {
    goFind : function (id) {
      this.$router.push({path : "/find/"+id});
    }
  }
}
</script>

<style>
    * {
        -moz-box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    *:not(input,textarea) {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

    .weui-cell-img {
        width: 40px;
        display: block;
        border-radius: 2px;
        /*box-shadow: 1px 1px 1px #888888;*/
    }

    .weui-cell-text {
        vertical-align: middle;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 60%;
        font-size: 15px;
    }



</style>
