import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  findClass : {"weui-bar__item_on" : true },
  themeClass : {"weui-bar__item_on" : false },
  findImg : require("../assets/images/find_click.png"),
  themeImg : require("../assets/images/theme.png"),
  findData : {
    // 发现部分的时间流数据（所有数据)
    find : {
      page : 1,
      data : []
    },
    // 一张图表示你在哪里  schoolOfficial
    where  : {
      page : 1,
      data : []
    },
    // 失物招领
    lostAndFound  : {
      page : 1,
      data : []
    },
    // 表白区
    love  : {
      page : 1,
      data : []
    },
    // 交易中心
    tradeCenter  : {
      page : 1,
      data : []
    },
    // 诚信博学、知行统一
    schoolOfficial  : {
      page : 1,
      data : []
    },
  },
  findDataState : 0,
  newNoteData : [],
  themeData : [],
  testCount : 0,
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});




