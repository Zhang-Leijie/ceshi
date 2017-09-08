<template>
  <el-popover placement="right" trigger="click">
    <img :src="imgUrl" alt="" class="de-small-img de-small-img1" slot="reference">
    <img :src="imgUrl" alt="" class="hover-img">
  </el-popover>
</template>
<script>
  export default {
    props: ["imgUrl"],
    data() {
      return {

      }
    }
  }

</script>
<style lang="less">
  .de-small-img {
    width: 80px;
    height: 100px;
  }

  .hover-img {
    width: 30vw;
    height: 40vh;
  }

</style>
