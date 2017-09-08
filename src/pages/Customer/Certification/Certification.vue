<template>
  <div>
    <h1 class="item-header">律师认证</h1>
    <el-input placeholder="搜索姓名/手机号" icon="search" v-model="message" :on-icon-click="search" class="search" size="small">
    </el-input>
    <el-tabs v-model="active" @tab-click="tabClick">
      <el-tab-pane label="正在认证" name="first">
      </el-tab-pane>
      <el-tab-pane label="等待认证" name="second">
      </el-tab-pane>
      <el-tab-pane label="认证结果" name="third">
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 'first', //tabs控制参数
        message: '', //搜索内容
      }
    },
    methods: {
      //搜索框
      search() {
        console.log("这里是搜索内容")
      },

      tabClick(tab) {
        const active = this.active
        switch (active) {
          case 'first':
            router.push({
              name: 'CertificationDealing'
            })
            break
          case 'second':
            router.push({
              name: 'CertificationWaitDeal'
            })
            break
          case 'third':
            router.push({
              name: 'CertificationFinishDeal'
            })
            break;
        }
      }
    },
    mounted () {
      this.tabClick()
    }
  }

</script>

<style>


</style>
