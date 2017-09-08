<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回列表</el-button>
    </div>
    <div class="detail-main" v-if="info.user">
      <infor-title title="用户信息" />
      <infor title="姓名" :con="info.user.name" />
      <infor title="性别" :con="sex(info.user.gender)" />
      <infor title="手机号" :con="info.user.phone" />
      <infor title="地区" :con="info.user.address" />
      <el-button type="primary" class="detail-main-button">联系用户</el-button>
    </div>
    <div class="detail-main" v-if="info.consult">
      <infor-title title="资讯内容" />
      <infor title="咨询内容" :con="info.consult.content" />
      <h1 class="right-time">{{dateFormat(info.consult.create_id*1000)}}</h1>
    </div>
    <div class="detail-main" v-if="info.consult">
      <infor-title title="解答" />
      <infor title="我的解答" :con="info.consult.answer" />
    </div>
    <div class="detail-main" v-if="info.consult">
      <infor title="处理时间" con="2017-09-09 09:00:00" />
      <infor title="处理结果" con="处理完成" />
      <infor title="客服" con="张三" />
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import { getConsult , giveConsult , disableConsult , cancelConsult , finishConsult } from '@/ajax/post.js'
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
      dateFormat(time) {
        return dateFormat(time)
      },
      getContent(){
        getConsult(this.$route.query.id,{}).then((res) => {
          this.info = res.data;
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
          name: "ConsultationFinishDeal"
        })
      }
    },
    mounted:function() {
      // this.list = data;
      this.getContent(); 
    }
  }

</script>

<style>


</style>
