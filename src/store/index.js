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
      loadState : 1,
        themeName : '校友圈',
        savePosition : 0,
    },
    // 一张图表示你在哪里  schoolOfficial
    where  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '一张图说说你在哪儿',
        savePosition : 0,
    },
    // 失物招领
    lostAndFound  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '龙子湖失物招领处',
        savePosition : 0,
    },
    // 表白区
    love  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '表白区，虐虐单身狗',
        savePosition : 0,
    },
    // 交易中心
    tradeCenter  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '曹山路二手交易中心',
        savePosition : 0,
    },
    // 诚信博学、知行统一
    schoolOfficial  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '诚信博学，知行统一',
        savePosition : 0,
    },
    // 官方吐槽区
    officialTucao  : {
      page : 1,
      data : [],
      loadState : 1,
        themeName : '官方吐槽区',
        savePosition : 0,
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




