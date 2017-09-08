<template>
  <div>
    <div class="indexList-bg" v-if="all">
      <el-row class="el-row-header">
        <el-col :span="6" class="first">&nbsp</el-col>
        <el-col :span="9">等待处理</el-col>
        <el-col :span="9">我在处理</el-col>
      </el-row>
      <el-row class="el-row-content">
        <el-col :span="6" class="first">平台受理</el-col>
        <el-col :span="9">{{data.global.select}}</el-col>
        <el-col :span="9">{{data.me.select}}</el-col>
      </el-row>
      <el-row class="el-row-content">
        <el-col :span="6" class="first">优惠支付</el-col>
        <el-col :span="9">{{data.global.pay}}</el-col>
        <el-col :span="9">{{data.me.pay}}</el-col>
      </el-row>
      <el-row class="el-row-content">
        <el-col :span="6" class="first">律师服务</el-col>
        <el-col :span="9">{{data.global.service}}</el-col>
        <el-col :span="9">{{data.me.service}}</el-col>
      </el-row>
      <el-row class="el-row-content">
        <el-col :span="6" class="first">评价律师</el-col>
        <el-col :span="9">{{data.global.comment}}</el-col>
        <el-col :span="9">{{data.me.comment}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { orderSummary } from '@/ajax/request.js'
  export default {
    data(){
      return {
        all:false,
      }
    },
    created(){
        this.getOrders();
    },
    methods:{
        getOrders(){
          orderSummary({
            type: 1,
          }).then((res) => {
              this.data = res.data;
              this.all = true;
              console.log(res.data);
          })
        }
      }
  }
</script>
<style lang="less">
</style>
