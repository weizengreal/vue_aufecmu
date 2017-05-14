import * as types from './mutation-types'
import Axios from "axios"


export default {
  fn_test({commit} , testVar) {
    console.log("action fn_test");
    commit(types.TEST,testVar);
  },
  getFindData({ commit , state } , findType ) {
    Axios.get(Axios.default.baseURI+"getAllData?access_token="+Axios.default.access_token,{
      params : {
        page  : state.findData[findType].page,
        theme  : findType,
      }
    }).then(function (response) {
      if (response.status == 200 ) {
        var jsonData = {
          "responseData" : response.data,
          "type" : findType
        };
        commit(types.FIND_DATA,jsonData );
      }
      else {
        commit(types.FIND_DATA,{"data" : null , "type" : findType } );
      }
    });
  },
  initTheme( { commit } ) {
    // 获得主题

  }
};
