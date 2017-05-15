<template>
  <div class="topic">
    <div class="join-banner" style="display: block;">
      <div class="banner-left fl">
        <div class="fl banner-p" @click="returnTofind">
          <p class="banner-f-13 banner-enter">
            <!-- <img src="../../images/group_arrow.png?v=f76cb59"> -->
            <span>进入</span>
          </p>
          <p><span id="banner-group-name">校友圈</span><span class="vertical-line"></span></p>
        </div>
        <p></p>
      </div>
      <!-- <a class="fr create_a"><span>发表</span></a> -->
      <div class="fr">
        <a class="banner-button hide b-r-4 js_up_click" @click="goPublish">
          <!-- <img src="../../images/topic01.png?v=ca15a18"> -->
          <span>发表</span>
        </a>
      </div>
    </div>
    <br>
    <div class="topic-main">
      <div id="topic_main">
        <div class="topic-ti detail-fixmt">
          <p class="fl top-m-img">
            <img  :src="thisNoteData.headimgurl">
          </p>
          <div class="topic-p">
            <p class="f-3-16">{{ thisNoteData.nickname }}</p>
            <p class="f-g-11 pt4">{{ thisNoteData.signtime }}</p>
          </div>
        </div>
        <div class="f-3-16 topic-mid-div js-topictxt" data-type="allow">
          <span class="main-content">{{ thisNoteData.content }}</span>
          <span class="topic_more">...</span>
        </div>
        <div v-if="thisNoteData.imgInfo != null" class="topic-m-img">
          <img v-for="it in thisNoteData.imgInfo" :src="it" @click="previewImg(it)" >
        </div>
        <div v-else class="topic-m-img"></div>
        <div class="top-m-header">
          <em class="topic-em"></em>
          <span class="topic-add-hr"></span>
          <div class="topic-avatar">
            <div class="topic-like b-r-4 fl" :class="{'like_false' : thisNoteData.isZan,'like_true' : !thisNoteData.isZan}" @click="zan">
              <span>{{ thisNoteData.zan }}</span>
            </div>
            <ul class="fl">
              <li v-for="zanImg in thisNoteData.zanList" class="b-r-50">
                <img :src="zanImg.headimgurl">
              </li>
            </ul>
          </div>
          <div class="topic_reply">
            <p class="reply-count"><span class="js_reply_count">{{ thisNoteData.comcount }}</span> 条评论</p>
            <div class="reply-div" data-type="parentComment" data-backuser="{$commentInfo.backuser}" data-noteid="{$commentInfo.noteid}" data-notename="{$commentInfo.cname}">
              <div class="comm_wrap b-r-2">
                <textarea placeholder="我也来评论一句" v-model="mainCommentText" @click="clickReply(0)"></textarea>
              </div>
              <div class="reply-buttons" v-if="comId == 0">
                <a class="reply-cancel b-r-4 js-reply-c" @click="cancelReply">取消</a>
                <a class="reply-submit b-r-4 js-reply-s" @click="comment(0,0,thisNoteData.nickname,index)">评论</a>
              </div>
            </div>
          </div>
          <div class="reply-list">
            <ul id="reply-list-ul">
              <li v-for="(item , index) in thisNoteData.comList" style="border-top:none">
                <div class="clear reply-show"><span class="b-r-50 reply-tx fl">
                  <img :src="item.headimgurl"></span>
                  <div class="reply-txt fl"><p class="name">{{ item.nickname }}</p>
                    <p class="txt">{{ item.comment }}</p>
                  </div>
                </div>
                <div class="reply-area"><span class="time">{{ item.time }}</span>
                  <span class="span-rep time js-reply-btns " :class="{'hide' : !item.isCom}" @click="clickReply(item.comId)">回复</span>
                </div>

                <div class="reply-div comm-div" v-if="comId == item.comId">
                  <div class="comm_wrap b-r-2"><span class="input_value">@</span>
                    <textarea class="b-r-2 expand" v-model="commentText" :placeholder="'回复'+ item.nickname +':'"></textarea>
                  </div>
                  <div class="reply-buttons">
                    <a class="reply-cancel b-r-4 js-reply-c" @click="cancelReply">取消</a>
                    <a class="reply-submit b-r-4 js-reply-s" @click="comment(item.comId,item.comId,item.nickname,index)">评论</a>
                  </div>
                </div>

                <div v-if="item.repliedComment" v-for="it in item.repliedComment" class="re-com-div">
                  <div>
                    <div class="child-com-hr"></div>
                    <div class="clear reply-show">
                      <div class="reply-com-txt fl"><span class="name">{{ it.nickname }}</span>
                        <span style="color:#aeaeae">回复</span>
                        <span class="name">{{ item.nickname }}</span><span>: </span> <span class="txt">{{ it.comment }}</span>
                      </div>
                    </div>
                    <div class="reply-area"><span class="time">{{ it.time }}</span><span
                      class="span-rep time js-reply-btns "  :class="{'hide' : !it.isCom}" @click="clickReply(it.comId)">回复</span></div>
                    <div class="reply-div comm-div"  v-if="comId == it.comId">
                      <div class="comm_wrap b-r-2"><span class="input_value">@</span>
                        <textarea class="b-r-2 expand" v-model="commentText" :placeholder="'回复'+ it.nickname +':'"></textarea>
                      </div>
                      <div class="reply-buttons">
                        <a class="reply-cancel b-r-4 js-reply-c" @click="cancelReply">取消</a>
                        <a class="reply-submit b-r-4 js-reply-s" @click="comment(it.comId,item.comId,it.nickname,index)">评论</a></div>
                    </div>
                  </div>
                </div>




              </li>
            </ul>
            <div class="dropload-down" style="display: none;"></div></div>
        </div>
      </div>
    </div>
    <gallery ref="Gallery" :bgImg="bgImg"></gallery>
    <toast :toast="toastState" :message="message"></toast>
  </div>
</template>

<script>

  import Axios from "axios"
  import Gallery from '../templete/gallery.vue'
  import Toast from "../templete/toast.vue";
  export default {
    data() {
        return {
          thisNoteData : [],
          bgImg:"",
          comId: -1,
          toastState : 3,
          message : "温馨提示",
          commentText : "",
          mainCommentText : ""
        };
    },
    methods : {
      returnTofind :function () {
          this.$router.go(-1);
      },
      goPublish : function () {
        this.$router.push("/publish");
      },
      previewImg : function (bgImg) {
          this.bgImg = bgImg;
          this.$refs.Gallery.showImg();
      },
      clickReply : function (comId) {
          this.commentText="";
          this.mainCommentText="";
          this.comId = comId;
      },
      cancelReply : function () {
          this.comId = -1;
      },
      comment : function (single, owner ,noteName,index) {
          // 1：隐藏输入框 2：判断数据是否合法 3：发送数据 4：操作反馈 5：前端渲染
        console.log("single:"+single);
        console.log("owner:"+owner);
        var _comment = single === 0 ? this.mainCommentText : this.commentText,self = this,sourceData = new URLSearchParams();
        console.log("commentText:"+_comment);
        console.log("noteid:"+this.$route.params.noteid);
        console.log("access_token:"+Axios.default.access_token);

        this.comId = -1;
        this.mainCommentText = "";
        if(_comment === '') {
          this.toastState = 5;
          this.message = "不允许空评论";
          return ;
        }
        sourceData.append('noteid', this.$route.params.noteid);
        sourceData.append('single', single);
        sourceData.append('owner', owner);
        sourceData.append('comment', _comment);
        Axios.post(Axios.default.baseURI+"createComment?access_token="+Axios.default.access_token,sourceData).then(function (response) {
          console.log(response.data.data);
          if(response.data.status === 1) {
            if(single === 0) {
              self.thisNoteData.comList.push({
                'comment' : _comment,
                'headimgurl' : window['localStorage']['headimgurl'],
                'nickname' : window['localStorage']['nickname'],
                'noteName' : noteName,
                'isCom' : false,
                'time' : '刚刚'
              });
            }
            else {
              self.thisNoteData.comList[index].repliedComment.push({
                'comment' : _comment,
                'headimgurl' : window['localStorage']['headimgurl'],
                'nickname' : window['localStorage']['nickname'],
                'noteName' : noteName,
                'isCom' : false,
                'time' : '刚刚'
              });
            }
            self.toastState = 5;
            self.message = "评论成功";
          }
          else {
            self.toastState = 5;
            self.message = "评论失败";
          }
        })
      },
      zan : function () {
        var self = this,sourceData = new URLSearchParams();
        sourceData.append('noteid', this.$route.params.noteid);
        Axios.post(Axios.default.baseURI+"zan?access_token="+Axios.default.access_token,sourceData).then(function (response) {
          if(response.data.status === 1) {
              if(response.data.data.behave === 1) {
                  self.thisNoteData.isZan = false;
                  self.thisNoteData.zan++;
                  self.thisNoteData.zanList.push({
                    'headimgurl' : response.data.data.headimgurl
                  })
              }
              else {
                self.thisNoteData.isZan = true;
                self.thisNoteData.zan--;
                self.thisNoteData.zanList.pop({
                  'headimgurl' : response.data.data.headimgurl
                });
              }
          }
        })
      }
    },
    components:{
      Gallery,
      Toast
    },
  created : function () {
//    console.log(this.$route.params.noteid);
    var self = this;
    Axios.get(Axios.default.baseURI+"getDetail?access_token="+Axios.default.access_token,{
      params : {
        noteid  : this.$route.params.noteid
      }
    }).then(function (response) {
//      console.log(response.data.data);
      self.thisNoteData = response.data.data;
    })

  }
}
</script>

<style>

</style>
