<template>
  <div>
    <h1 class="item-header">普通订单</h1>
    <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="选择律师" name="first"></el-tab-pane>
      <el-tab-pane label="支付费用" name="second"></el-tab-pane>
      <el-tab-pane label="律师服务" name="third"></el-tab-pane>
      <el-tab-pane label="评价律师" name="fourth"></el-tab-pane>
      <el-tab-pane label="服务完成" name="fifth"></el-tab-pane>
      <el-tab-pane label="委托终止" name="sixth"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
   import {  orderSearch } from '@/ajax/request.js'
  export default {
    data() {
      return {
        message: '',
        active: ' ',
        data:[]
      }
    },
    methods: {
      search() {
        orderSearch({
          keyword:this.message,
          type:0
        }).then((res)=>{
          if(res.code == 200){
            this.data = res.data
          }
        })
        console.log("这里是搜索内容")
      },
      tabClick(tab) {
        const name = this.active
        switch (name) {
          case "first":
            router.push({
              name: "CommonSelect"
            })
            break
          case "second":
            router.push({
              name: "CommonPrice"
            })
            break
          case "third":
            router.push({
              name: "CommonService"
            })
            break
          case "fourth":
            router.push({
              name: "CommonEvaluation"
            })
            break
          case "fifth":
            router.push({
              name: "CommonComplete"
            })
            break
          default:
            router.push({
              name: "CommonEnd"
            })
            break
        }
      }
    }
  }

</script>
<style lang="less">
</style>
