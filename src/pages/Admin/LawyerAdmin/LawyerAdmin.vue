<template>
  <div>
    <h1 class="item-header">律师账号管理</h1>
    <!-- <el-input placeholder="搜索姓名/手机号" style="width:200px" icon="search" v-model="message" :on-icon-click="search" class="search" -->
      <!-- size="small"></el-input> -->
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="律师账号" name="first"></el-tab-pane>
      <el-tab-pane label="律师黑名单" name="second"></el-tab-pane>
      <!-- <el-tab-pane label="删除账号" name="third"></el-tab-pane> -->
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: "",
        active: 'first'
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
              name: "LawyerList"
            })
            break
          case "second":
            router.push({
              name: "LawyerBlackList"
            })
            break
          case "third":
            router.push({
              name: "LawyerDeleteList"
            })
            break
        }
      }
    },
    mounted:function() {
      const name = this.active
      switch (name) {
        case "first":
          router.push({
            name: "LawyerList"
          })
          break
        case "second":
          router.push({
            name: "LawyerBlackList"
          })
          break
        case "third":
          router.push({
            name: "LawyerDeleteList"
          })
          break
      }
    }
  }

</script>
<style>
</style>
