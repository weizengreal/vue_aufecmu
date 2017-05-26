<template>
    <transition name="up">
        <div class="wrapper">
            <div class="header">
                <div class="title" @click="cancel">
                    取消
                </div>
                <div class="publish" @click="publish">
                    发布
                </div>
            </div>
            <div class="publish-wrapper">
                <textarea v-model="content" class="content" placeholder="分享自己的观点..."></textarea>
                <!--<div>{{picList.length}}/{{allowPicNum}}</div>-->
                <div class="pic-wrapper">
                    <div v-for="(item, index) in picList" class="pic-item">
                        <div @click="delImg(index)" v-show="item !== ''" class="cancel"></div>
                        <img v-show="item !== ''" class="img" :src="item" alt="">
                        <div v-show="item === ''" class="loading"></div>
                    </div>
                    <img v-show="picList.length < 9" @click="addImg()" class="add-img" src="../../static/images_v2/add_imgs.png" alt="">
                </div>
                <input id="picUploader" type="file" style="display: none" accept="image/*" multiple="multiple" @change="uploadImg">
            </div>
        </div>
    </transition>
</template>

<script>
    import upload from '../utils/uploader';
    import Axios from "axios";
    import  { Toast } from 'vux';
    export default {
        name: 'publish',
        data() {
            return {
                picList: [],
                content: '',
                allowPicNum: 9,
                uploadFlag: false,
            }
        },
        components : {
            Toast
        },
        methods: {
            uploadImg: function(evt) {
                let fileList = Array.from(evt.target.files),
                    restNum = this.allowPicNum - this.picList.length,
                    promiseArr = [];
                this.uploadFlag = true;
                if (fileList.length > restNum) {
                    console.log('最多允许9张图片');
                    fileList.splice(restNum, fileList.length - restNum);
                }

                fileList.forEach((item, index) => {
                    let picIndex = this.picList.length;
                    this.picList.push('');
                    promiseArr.push(upload(item).then((res) => {
                        console.log(res);
                        this.picList.splice(picIndex, 1, `http://file.woai662.com/${res.data.key}`);
                    }));
                })
                Promise.all(promiseArr).then(() => {
                    this.uploadFlag = false;
                })
                document.querySelector('#picUploader').value = '';
            },
            addImg: function () {
                if (this.picList.length >= this.allowPicNum) {
                    return false
                }
                document.querySelector('#picUploader').click();
            },
            delImg: function(index) {
                console.log(index);
                this.picList.splice(index, 1);
            },
            publish: function() {
                if (this.uploadFlag) {
                    this.$vux.toast.show({
                        'text' : '正在上传图片',
                        'type' : 'text'
                    });
                    return false;
                }
                if(this.content === "") {
                    this.$vux.toast.show({
                        'text' : '内容不能为空',
                        'type' : 'text'
                    });
                    return false;
                }
                let picList = {};
                this.picList.forEach((item, index) => {
//                    console.log(item);
                    picList[index] = item;
                });
                const sourceData = new URLSearchParams(),self = this;
                sourceData.append('type', this.$route.params.type);
                sourceData.append('content', this.content);
                sourceData.append('imgInfo', JSON.stringify(picList));
                Axios.post(Axios.default.baseURI+"createNote?access_token="+Axios.default.access_token,sourceData).then(function (response) {
                    if(response.data.status === 1) {
                        // 应将vuex中对应的数据字段初始化为空
                        self.$store.state.findData[self.$route.params.type] = {
                            page : 1,
                            data : [],
                            loadState : 1
                        };
                        self.$router.go(-1);
                    }
                    else {
                        this.$vux.toast.show({
                            'text' : '发帖失败',
                            'type' : 'text'
                        });
                    }
                });
            },
            cancel : function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    display: flex;

    border-bottom: 1px solid #dcdcdc;

    padding: 0 1.5rem;

    line-height: 5rem;

    font-size: 1.6rem;

    .title {
        flex: 1;
    }



}

.publish-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 0 1rem;

    .content {
        font-size: 1.6rem;
        border: none;
        background: transparent;
        resize: none;
        width: 94%;
        height: 120px;
        margin-left: 3%;
        padding:1.5rem 0;
    }
}

.add-img {
    height: 7.5rem;
    width: 7.5rem;
}

.wrapper {
    transform: translateY(0);
}
.up-enter-active {
  transition: all .2s ease;
}
.up-enter {
  transform: translateY(200%);
}

.pic-item {
    position: relative;
    display: inline-block;
    margin-right: .5rem;
    height: 7.5rem;
    width: 7.5rem;

    .img {
        width: 100%;
        height: 100%;
    }

    .cancel {
        position: absolute;
        top: .5rem;
        right: .5rem;
        width: 1rem;
        height: 1rem;
        background: url('../../static/images_v2/img_del.png');
        background-size: 100% 100%;
    }

    .loading {
        position: absolute;
        width: 2rem;
        height: 2rem;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        background: url('../../static/images_v2/loading.gif');
        background-size: 100% 100%;
    }
}
</style>
