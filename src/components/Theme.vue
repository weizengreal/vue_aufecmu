<template>
    <div class="theme" ontouchstart>
        <div class="theme_item weui-cell_access" v-on:click="goFind('schoolOfficial')">
            <div class="theme_item_img">
                <img src="../assets/icon/schoolOfficial.png">
            </div>
            <div class="theme_item_text">
                诚信博学，知行统一
            </div>
            <div class="theme_item_arrow"></div>
        </div>


        <div class="theme_item weui-cell_access" v-on:click="goFind('where')">
            <div class="theme_item_img">
                <img src="../assets/icon/where.png">
            </div>
            <div class="theme_item_text">
                一张图说说你在哪儿
            </div>
            <div class="theme_item_arrow"></div>
        </div>


        <div class="theme_item weui-cell_access" v-on:click="goFind('lostAndFound')">
            <div class="theme_item_img">
                <img src="../assets/icon/lostAndFound.png">
            </div>
            <div class="theme_item_text">
                龙子湖失物招领处
            </div>
            <div class="theme_item_arrow"></div>
        </div>

        <div class="theme_item weui-cell_access" @click="goFind('love')">
            <div class="theme_item_img">
                <img src="../assets/icon/love.png">
            </div>
            <div class="theme_item_text">
                表白区，虐虐单身狗
            </div>
            <div class="theme_item_arrow"></div>
        </div>

        <div class="theme_item weui-cell_access" @click="goFind('tradeCenter')">
            <div class="theme_item_img">
                <img src="../assets/icon/tradeCenter.png">
            </div>
            <div class="theme_item_text">
                曹山路二手交易中心
            </div>
            <div class="theme_item_arrow"></div>
        </div>

        <div class="theme_item" @click="goFind('officialTucao')">
            <div class="theme_item_img">
                <img src="../assets/icon/officialTucao.png">
            </div>
            <div class="theme_item_text">
                官方吐槽区
            </div>
            <div class="theme_item_arrow"></div>
        </div>
        <!--<div>This is 404 page!</div>-->
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
        console.log('dwa');
      this.$router.push({path : "/find/"+id});
    }
  }
}
</script>

<style lang="scss" scoped>

    * {
        -moz-box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    *:not(input,textarea) {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

    .theme {
        width : 100%;

        height: auto;

        .theme_item {
            height: 52px;

            padding-left: 15px;

            padding-top: 5px;


            .theme_item_img {
                /*padding-left: 5px;*/
                /*padding-bottom: 30px;*/
                display: inline-block;
                img {
                    width: 40px;
                    display: block;
                    border-radius: 2px;
                    /*box-shadow: 1px 1px 1px #888888;*/
                }
            }

            .theme_item_text {
                padding-left: 8px;
                padding-bottom: 30px;
                display: inline-block;
                vertical-align: middle;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 75%;
                font-size: 15px;
            }

            .theme_item_arrow {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-bottom: 1px solid #BFBBBB;
                border-right: 1px solid #BFBBBB;
                transform:rotate(-45deg);
                margin-bottom: 12px;
            }

        }



    }

</style>
