<template>
    <transition name="up">
        <div class="wrapper">
            <div class="header">
                <div class="title">
                    取消
                </div>
                <div @click="publish">
                    发布
                </div>
            </div>
            <div class="publish-wrapper">
                <textarea v-model="content" class="content" placeholder="分享自己的观点..."></textarea>
                <div>{{picList.length}}/{{allowPicNum}}</div>
                <div class="pic-wrapper">
                    <div v-for="(item, index) in picList" class="pic-item">
                        <div @click="delImg(index)" v-show="item !== ''" class="cancel"></div>
                        <img v-show="item !== ''" class="img" :src="item" alt="">
                        <div v-show="item === ''" class="loading"></div>
                    </div>
                    <img v-show="picList.length < 9" @click="addImg()" class="add-img" src="../../static/images_v2/add_imgs.png" alt="">
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
                let fileList = Array.from(evt.target.files),
                    restNum = this.allowPicNum - this.picList.length;
                if (fileList.length > restNum) {
                    console.log('最多允许9张图片');
                    fileList.splice(restNum, fileList.length - restNum);
                }
                
                fileList.forEach((item, index) => {
                    let picIndex = this.picList.length;
                    this.picList.push('');
                    upload(item).then((res) => { 
                        this.picList.splice(picIndex, 1, `//file.woai662.com/${res.data.key}`);
                    })
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
                console.log(index)
                this.picList.splice(index, 1);
            },
            publish: function() {
                console.log(this.content);
                let picList = {};
                this.picList.forEach((item, index) => {
                    picList[index] = item;
                })
                console.log(picList);
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
