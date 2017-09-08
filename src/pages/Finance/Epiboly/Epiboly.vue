<template>
  <div>
    <h1 class="item-header">法务外包</h1>
    <!-- <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input> -->
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="套餐设置" name="first"></el-tab-pane>
      <el-tab-pane label="套餐办理与核销" name="second"></el-tab-pane>
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
              name: "EpibolyCamboList",
              params: {
                status: 1
              }
            })
            break
          case "second":
            router.push({
              name: "EpibolyManageList"
            })
            break
        }
      }
    }
  }

</script>
<style>
</style>
