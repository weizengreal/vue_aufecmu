<template>
  <div class="page js_show">
    <div class="page__bd">
      <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <div class="weui-cell" @click="goFind('schoolOfficial')" style="padding: 5px 15px;">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/schoolOfficial.png"
                       style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">诚信博学，知行统一</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
              </div>
              <div class="weui-cell" @click="goFind('where')">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/where.png"
                    style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">一张图说说你在哪儿</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell" @click="goFind('lostAndFound')">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/lostAndFound.png"
                    style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">龙子湖失物招领处</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell" @click="goFind('love')">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/love.png"
                    style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">表白区，虐虐单身狗</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
              </div>

              <div class="weui-cell" @click="goFind('tradeCenter')">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/tradeCenter.png"
                       style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">曹山路二手交易中心</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
              </div>
              <div class="weui-cell" @click="goFind('officialTucao')">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                  <img src="../assets/icon/officialTucao.png"
                       style="width: 40px;display: block">
                </div>
                <div class="weui-cell__bd">
                  <span style="vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 60%;">官方吐槽区</span>
                </div>
                <div style="width: 8px;height: 8px;border-bottom: 2px solid #999999;border-right: 2px solid #999999;transform:rotate(-45deg);"></div>
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

</style>
