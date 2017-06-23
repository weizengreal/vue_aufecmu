import * as types from './mutation-types'

export default {

  [types.FIND_DATA] (state,allData) {
    // state.testCount += testVar;  undefined findType
    if(typeof state.findData[allData.type]  !== "undefined") {
      // 成功时，向newNoteData中添加数据，同时更新vuex中对应下标的数据
      if(allData.responseData.status == 1) {
        if(allData.responseData.data.length === 8) {
          state.newNoteData = allData.responseData.data;
          for (const index in allData.responseData.data) {
            state.findData[allData.type].data.push(allData.responseData.data[index]) ;
          }
          // state.findData[allData.type].data += allData.responseData.data;
          state.findData[allData.type].page ++ ;
          state.findDataState = 1;
          state.findData[allData.type].loadState = 1;
        }
        else if(allData.responseData.data.length < 8) {
          for (var index in allData.responseData.data) {
            state.findData[allData.type].data.push(allData.responseData.data[index]) ;
          }
          state.newNoteData = allData.responseData.data;
          state.findDataState = 2;
          state.findData[allData.type].loadState = 2;
        }
        else {
          state.findDataState = -2;
        }
      }
      else{
        // 其他基本错误
        state.findDataState = typeof allData.responseData === "undefined" ? -1 : allData.responseData;
      }
    }
    else {
      // state.findData[allData.type].data
      // console.log(allData.data);
      state.findDataState = -4;
    }
  },

  [types.THEME_CONF] ( state , themeData ) {
    console.log(themeData);
  },
    [types.SAVE_POSITION] ( state , positionData ) {
        state.findData[positionData.findType].savePosition = positionData.positionY;
    }

};
