<template>
  <div>
    <el-col :span="4" class="left-col">
      <el-menu mode="vertical" router>
        <el-menu-item-group title="基础功能">
          <el-menu-item index="1" :route="{name:'Article'}">文章管理</el-menu-item>
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
<style>


</style>
