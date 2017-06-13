import * as types from './mutation-types'
import Axios from "axios"


export default {
  getFindData({ commit , state } , findType ) {
    Axios.get(Axios.default.baseURI+"getAllData?access_token="+Axios.default.access_token,{
      params : {
        page  : state.findData[findType].page,
        theme  : findType,
      }
    }).then(function (response) {
      if (response.status == 200 ) {
        commit(types.FIND_DATA,{
          "responseData" : response.data,
          "type" : findType
        } );
      }
      else {
        commit(types.FIND_DATA,{"data" : null , "type" : findType } );
      }
    });
  },
  initTheme( { commit } ) {
    // 获得主题

  },
    // savePosition({ commit , state } , findType , positionY) {
    //     state.findData[findType].savePosition = positionY;
    // }
};
