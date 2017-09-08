<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <h1 class="detail-title-right">{{title}}</h1>
    </el-col>
    <el-col :span="20">
      <slot name="title-content"></slot>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    props: ["title"],
  }

</script>
<style>
  .detail-title-right {
    color: #42bd56;
    font-size: 16px;
    text-align: right;
  }

  .detail-title-left {
    color: #42bd56;
    font-size: 16px;
    text-align: left;
  }

</style>
