import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  findData : {
    // 发现部分的时间流数据（所有数据)
    find : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 一张图表示你在哪里  schoolOfficial
    where  : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 失物招领
    lostAndFound  : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 表白区
    love  : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 交易中心
    tradeCenter  : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 诚信博学、知行统一
    schoolOfficial  : {
      page : 1,
      data : [],
      loadState : 1
    },
    // 官方吐槽区
    officialTucao  : {
      page : 1,
      data : [],
      loadState : 1
    },
  },
  findDataState : 0,
  newNoteData : [],
  tabbar : true,
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});




