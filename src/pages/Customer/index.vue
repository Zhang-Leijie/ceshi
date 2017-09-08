<template>
  <div>
    <el-col :span="4" class="left-col">
      <el-menu mode="vertical" router>
        <el-menu-item-group title="用户接待">
          <el-menu-item index="1" :route="{name:'ConsultationDealing'}">一键咨询</el-menu-item>
          <el-menu-item index="2" :route="{name:'GuaranteeDealing'}">法在保障</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="订单处理">
          <el-menu-item index="3" :route="{name:'Common'}">普通订单</el-menu-item>
          <el-menu-item index="4" :route="{name:'Outsourcing'}">法务外包</el-menu-item>
          <el-menu-item index="5" :route="{name:'Mediation'}">律师调解</el-menu-item>
          <el-menu-item index="6" :route="{name:'Lawsuit'}">诉讼保全</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="律师管理">
          <el-menu-item index="7" :route="{name:'CertificationDealing'}">律师认证</el-menu-item>
          <el-menu-item index="8" :route="{name:'Review'}">律师合作审核</el-menu-item>
          <el-menu-item index="9" :route="{name:'Lawyers'}">平台律师库</el-menu-item>
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
        let height = window.innerHeight
        if (height < 720) {
          return height * 0.89 - 60 + 100
        } else {
          return height * 0.89 - 60
        }
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
