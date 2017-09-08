<template>
  <div>
    <h1 class="item-header">订单管理</h1>
    <el-input placeholder="搜索用户姓名/手机号/订单号" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"
      style="margin-bottom:20px"></el-input>
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="退单审核" name="first"></el-tab-pane>
      <el-tab-pane label="取消处理操作" name="second"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: '',
        message: ''
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
              name: "Apply"
            })
            break
          case "second":
            router.push({
              name: "OrderCancelList"
            })
        }
      }
    }
  }

</script>
<style lang="less">


</style>
