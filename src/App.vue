<template>
  <div style="-webkit-overflow-scrolling: touch;">
    <router-view></router-view>
    <div style="width: 100%;height: 48px;"></div>
    <layout></layout>
  </div>
</template>
<script>

import Layout from './templete/Layout.vue'
 export default {
   name: 'app',
   components: {
     Layout
   },
 }
</script>

<style>

</style>
