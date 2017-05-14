<template>
  <div class="weui-gallery" :style="{ 'display' : display }" @click="hideImg">
    <span class="weui-gallery__img" :style='{ backgroundImage : "url(\""+bgImg+"\")" }'></span>
  </div>


</template>

<script>

  //bgImg = { backgroundImage : "url('"+currentSrc+"')" };
  export default{
        name: "gallery",
        props : ["bgImg"],
        data () {
            return {
                display : "none"
            };
        },
        methods: {
          hideImg: function () {
            this.display = "none";
          },
          showImg : function () {
            this.display = "block";
          }
        },
    }
</script>

<style>

</style>
