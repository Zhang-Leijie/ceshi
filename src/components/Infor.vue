<template>
  <el-row :gutter="20">
    <el-col :span="first" class="detail-infor-title">{{`${title}：`}}</el-col>
    <el-col :span="24-first" class="detail-infor-con">{{con}}
      <slot name="con"></slot>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        require: true
      },
      con: {
        type: String || Number,
        default: ""
      },
      first: {
        type: Number,
        default: 4
      }
    }
  }

</script>

<style>
  .detail-infor-title {
    text-align: right;
    font-size: 14px;
    margin: 10px 0;
  }

  .detail-infor-con {
    text-align: left;
    font-size: 14px;
    margin: 10px 0;
  }

</style>
