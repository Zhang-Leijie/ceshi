<template>
  <div>
    <el-col :span="4" class="left-col">
      <el-menu mode="vertical" router>
        <el-menu-item-group title="账号管理">
          <el-menu-item index="1" :route="{name:'PlatAdmin'}">平台账号管理</el-menu-item>
          <el-menu-item index="2" :route="{name:'UserAdmin'}">用户账号管理</el-menu-item>
          <el-menu-item index="3" :route="{name:'LawyerAdmin'}">律师账号管理</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
    <el-col :span="20" class="right-col" :style="`min-height:${getHeight}px`">
      <router-view/>
    </el-col>
  </div>
</template>
<script>
  export default {
    computed: {
      getHeight() {
        return window.innerHeight * 0.89 - 60
      }
    }
  }

</script>
<style lang="less">


</style>
