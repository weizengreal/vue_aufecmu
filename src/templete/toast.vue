<template>
  <div class="page">
    <!--BEGIN toast-->
    <div :class="{ 'hide' : viewToast != 1 }">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">{{ message }}</p>
      </div>
    </div>
    <!--end toast-->

    <!-- loading toast -->
    <div :class="{ 'hide' : viewToast != 2 }">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">{{ message }}</p>
      </div>
    </div>



    <div :class="{ 'hide' : viewToast != 5 }">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast" style="min-height: 0;top: 80%;">
        <p class="weui-toast__content" style="margin: 4px 0px 7px 0px;">{{ message }}</p>
      </div>
    </div>


  </div>

</template>

<script>
    /*
    * 组件逻辑，watch变量toast，但是可能出现连续两次都使用同一个toast对象希望调用相同组件的问题，此时watch不会执行，那么每一次结束时自动加工本地的toast
    * */
export default {
  name : "toast",
  props : ['toast','message'],
  data () {
      return {
          viewToast : -1,
      };
  },
  watch : {
    toast : function () {
        console.log(this.toast);
        switch (this.toast) {
            case 1: {
                this.viewToast = this.toast;
                self = this;
                setTimeout(function () {
                    self.viewToast = -1;
                }, 2000);
                break;
            }
            case 2: {
                this.viewToast = this.toast;
                self = this;
                setTimeout(function () {
                    self.viewToast = -1;
                }, 2000);
                break;
            }
            case 3: {
                this.viewToast = 1;
                break;
            }
            case 4: {
                this.viewToast = 1;
                break;
            }
            case 5: {
                console.log(this.toast);
                this.viewToast = this.toast;
                self = this;
                setTimeout(function () {
                    self.viewToast = -1;
                }, 2000);
                break;
            }
            default :{
            }
        }
//        if(this.toast === 1 || this.toast === 2 || this.toast === 5 ) {
//          this.viewToast = this.toast;
//          self = this;
//          setTimeout(function () {
//            self.viewToast = -1;
//          }, 2000);
//        }
//        else if(this.toast === 3 || this.toast === 4) {
//          this.viewToast = 1;
//        }
//        else {
//          this.viewToast = -1;
//        }
    }
  }
}


</script>

<style>

</style>
