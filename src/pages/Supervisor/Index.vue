<template>
  <div>
    <el-col :span="4" class="left-col">
      <el-menu mode="vertical" router>
        <el-menu-item-group title="基础管理">
          <el-menu-item index="1" :route="{name:'Order'}">订单管理</el-menu-item>
          <el-menu-item index="2" :route="{name:'SupLawyers'}">律师库管理</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
    <el-col :span="20" class="right-col" :style="`min-height:${getHeight}px`">
      <router-view/>
    </el-col>
    <div class="chat-bg">
      <Chat v-show="isChat" :chat.sync="isChat"></Chat>
      <el-button type="primary" class="chat-button" @click="isChat = !isChat"><i></i>聊天接待<i></i></el-button>
    </div>
  </div>
</template>
<script>
  import Chat from '@/pages/Chat/Index.vue'
  export default {
    components: {
      Chat
    },
    data() {
      return {
        isChat: false
      }
    },
    computed: {
      getHeight() {
        return window.innerHeight * 0.89 - 60
      }
    }
  }

</script>
<style lang="less">
  .chat-bg {
    position: absolute;
    right: -150px;
    bottom: 0;
    text-align: right;
    i {
      display: inline-block;
      width: 17px;
      height: 14px;
      &:first-child {
        background: url('../../assets/image/person.png');
        background-size: 100% 100%;
        margin-right: 8px;
      }
      &:last-child {
        background: url('../../assets/image/above.png');
        background-size: 100% 100%;
        margin-left: 8px;
      }
    }
  }

</style>
