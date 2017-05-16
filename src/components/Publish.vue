<template>
    <transition name="up">
        <div class="wrapper">
            <div class="header">
                <div class="title">
                    取消
                </div>
                <div>
                    发布
                </div>
            </div>
            <div class="publish-wrapper">
                <textarea class="content" placeholder="分享自己的观点..."></textarea>
                <div class="pic-wrapper">
                    <div v-for="item in picList" class="pic-item">
                        <img class="" :src="item" alt="">
                        <!--<icon type="clear" data-index="{{item.index}}" size="15" bindtap="deletePic"></icon>
                        <icon hidden="{{sitem.status === 0}}" type="{{item.status === 1 ? 'waiting' : item.status === 2 ? 'warn' : 'success'}}" size="50" class="pic-status"></icon>-->
                        <!--<image src="{{item.tempFilePath}}"></image>-->
                    </div>
                    <img @click="addImg()" class="add-img" src="../../static/images/add_imgs.png" alt="">
                </div>
                <!--<input id="picUploader" type="file" style="display: none" accept="image/*" multiple="multiple" @change="uploadImg">-->
                <input id="picUploader" type="file" style="display: none" multiple="multiple" @change="uploadImg">
            </div>
        </div>
    </transition>
</template>
 
<script>
    // import wx from 'weixin-js-sdk';
    import upload from '../utils/uploader';
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
        methods: {
            uploadImg: function(evt) {
                let fileList = Array.from(evt.target.files)
                fileList.forEach((item, index) => {
                    this.picList.push('../../static/images/loading.gif');
                    upload(item).then((res) => {
                        this.picList.splice(index, 1, `//file.woai662.com/${res.data.key}`);
                    })
                })
            },
            addImg: function () {   
            //    var restNum = this.allowPicNum - this.picList.length;
                // console.log(document.querySelector('#picUploader'))
                document.querySelector('#picUploader').click();
            //     upload();
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    display: flex;

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
        width: 100%;
        height: 200px;
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
  transition: all 1s ease;
}
.up-enter {
  transform: translateY(200%);
}
</style>
