<template>
    <div>This is 404 page!</div>
</template>

<script>
export default{
    data() {
        return {};
    },
    components: {

    },
    watch : {
      '$route' (to, from) {
        console.log(to);
        console.log(from);
      }
    }
}
</script>

<style >

</style>
