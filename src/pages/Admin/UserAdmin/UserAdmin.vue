<template>
  <div>
    <h1 class="item-header">用户账号管理</h1>
    <!-- <el-input placeholder="请输入手机号进行搜索" style="width:200px;margin-bottom:10px" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input> -->
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="用户账号" name="first"></el-tab-pane>
      <el-tab-pane label="用户黑名单" name="second"></el-tab-pane>
      <!-- <el-tab-pane label="删除账号" name="third"></el-tab-pane> -->
    </el-tabs>

    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: '',
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
              name: "UserList"
            })
            break
          case "second":
            router.push({
              name: "BlackList"
            })
            break
          case "third":
            router.push({
              name: "DeleteList"
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
            name: "UserList"
          })
          break
        case "second":
          router.push({
            name: "BlackList"
          })
          break
        case "third":
          router.push({
            name: "DeleteList"
          })
          break
      }
    }
  }

</script>
<style>


</style>
