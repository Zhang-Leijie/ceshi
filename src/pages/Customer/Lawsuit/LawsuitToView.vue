<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
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
      <infor-title title="保全信息" />
      <infor title="内容" :con="info.content" />
      <!-- <infor title="法院" con="杭州市江干区人民法院" />
      <infor title="身份" con="原告方" />
      <infor title="金额" con="2000千万" /> -->
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
  import { getPreservation , preservationSave , preservationFinish , preservationCancel } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'

  export default {
    components: {
      Infor,
      InforTitle
    },
    data() {
      return {
        mediation: "",
        status: 0,
        info:"",
      }
    },
    methods: {
      getContent(){
        var self = this;
        getPreservation(this.$route.query.id,{}).then((res) => {
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

      onCancel() {
        router.push({
          name: "LawsuitFinishDeal"
        })
      },
      dateFormat(time) {
        return dateFormat(time)
      },
    },
    mounted() {
      this.getContent();
    }
  }

</script>

<style>


</style>
