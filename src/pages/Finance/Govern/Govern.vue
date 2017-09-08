<template>
  <div>
    <h1 class="item-header">财务管理</h1>
    <!-- <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input> -->
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="提现处理" name="first"></el-tab-pane>
      <el-tab-pane label="退款记录" name="second"></el-tab-pane>
      <el-tab-pane label="订单交易记录" name="third"></el-tab-pane>
      <el-tab-pane label="法务外包销售记录" name="fourth"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: "",
        active: ' '
      }
    },
    methods: {
      search() {
        console.log("这里是搜索内容")
      },

      tabClick(tab) {
        const name = this.active
        switch (name) {
          case "first":
            router.push({
              name: "GovernDepositList"
            })
            break
          case "second":
            router.push({
              name: "GovernRefundList"
            })
            break
          case "third":
            router.push({
              name: "GovernOrderList"
            })
            break
          case "fourth":
            router.push({
              name: "GovernEpibolyList"
            })
        }
      }
    }
  }

</script>
<style>
</style>
