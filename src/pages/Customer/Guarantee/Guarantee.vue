<template>
  <div>
    <h1 class="item-header">法在保障</h1>
    <el-input placeholder="搜索姓名/手机号" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="正在处理" name="first">
      </el-tab-pane>
      <el-tab-pane label="等待处理" name="second">
      </el-tab-pane>
      <el-tab-pane label="处理完成" name="third">
      </el-tab-pane>
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
      tabClick() {
        const active = this.active
        switch (active) {
          case 'first':
            router.push({
              name: 'GuaranteeDealing'
            })
            break
          case 'second':
            router.push({
              name: 'GuaranteeWaitDeal'
            })
            break
          case 'third':
            router.push({
              name: 'GuaranteeFinishDeal'
            })
            break
        }
      }
    },
    mounted () {
      this.tabClick()
    }
  }

</script>
<style lang="less">
</style>
