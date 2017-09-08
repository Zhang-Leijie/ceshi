<template>
  <div>
    <h1 class="item-header">文章管理</h1>
    <!-- <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search"size="small"></el-input> -->
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="文章库" name="first"></el-tab-pane>
      <el-tab-pane label="发布管理" name="second"></el-tab-pane>
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
              name: "ArticleList"
            })
            break
          case "second":
            router.push({
              name: "IssueList"
            })
            break
        }
      }
    }
  }

</script>
<style>


</style>
