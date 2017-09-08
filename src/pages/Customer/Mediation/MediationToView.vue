<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回列表</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="用户信息" />
      <infor title="姓名" :con="info.uname" />
      <infor title="性别" :con="sex(info.gender)" />
      <infor title="手机号" :con="info.phone" />
      <infor title="地区" :con="info.address" />
      <el-button type="primary" class="detail-main-button">联系用户</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="调解信息" />
      <infor title="内容" :con="info.content" />
      <!-- <infor title="申请人" con="张三" />
      <infor title="手机号" con="18757187714" />
      <infor title="申请人" con="张三" />
      <infor title="手机号" con="18757187714" />
      <infor title="申请人" con="张三" />
      <infor title="手机号" con="18757187714" />
      <infor title="申请人" con="张三" />
      <infor title="手机号" con="18757187714" />
      <infor title="申请人" con="张三" />
      <infor title="手机号" con="18757187714" /> -->
    </div>
    <div class="detail-main">
      <infor-title title="处理记录" />
      <infor title="处理记录" :con="info.answer" />
      <infor title="处理客服" :con="info.cname" />
      <infor title="处理时间" :con="dateFormat(info.updated_at*1000)" />
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import { getMediation } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'

  export default {
    components: {
      Infor,
      InforTitle
    },
    data() {
      return {
        info:"",
      }
    },
    methods: {
      getContent(){
        var self = this;
        getMediation(this.$route.query.id,{}).then((res) => {
          this.info = res.data;
          this.mediation = res.data.answer
        })
      },

      sex(sex){
        if (sex == 0) {
          return "女"
        } else {
          return "男"
        }
      },

      dateFormat(time) {
        return dateFormat(time)
      },

      onCancel() {
        router.push({
          name: "MediationFinishDeal"
        })
      }
    },
    mounted() {
      this.getContent();
    }
  }

</script>

<style>


</style>
