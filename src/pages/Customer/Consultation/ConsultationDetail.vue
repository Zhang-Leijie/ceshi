<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="cancel">取消处理</el-button>
      <el-button size="small" @click="create">创建订单</el-button>
      <el-button size="small" @click="invalid">无效处理</el-button>
      <el-button size="small" @click="finish">处理完成</el-button>
      <el-button size="small" @click="returnList">返回列表</el-button>
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
      <infor-title title="咨询解答">
        <inputText :maxNumber="300" content="请简单描述解答内容" :answer="Consultation" v-model="Consultation" slot="title-content">
        </inputText>
      </infor-title>
      <div class="detail-save-bg">
        <el-button class="detail-save" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import InputText from '@/components/InputText.vue'
  import { getConsult , giveConsult , disableConsult , cancelConsult , finishConsult } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'

  export default {
    components: {
      Infor,
      InforTitle,
      InputText
    },
    data() {
      return {
        Consultation: "",
        info:"",
      }
    },
    methods: {
      getContent(){
        getConsult(this.$route.query.id,{}).then((res) => {
          this.info = res.data;
          this.Consultation = res.data.consult.answer;
        })
      },
      sex(sex){
        if (sex == 0) {
          return "女"
        } else {
          return "男"
        }
      },
      save(){
        giveConsult(this.$route.query.id,{
          answer: this.Consultation
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getContent();
          };
        })
      },
      dateFormat(time) {
        return dateFormat(time)
      },
      cancel() {
        disableConsult(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "ConsultationDealing"
            })
          };
        }) 
      },
      create() {
        router.push({
          name: "ConsultationCreateOrder"
        })
      },
      invalid() {
        cancelConsult(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "ConsultationDealing"
            })
          };
        }) 
      },
      finish() {
        finishConsult(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "ConsultationDealing"
            })
          };
        }) 
      },
      returnList() {
        router.push({
          name: "ConsultationDealing"
        })
      }
    },
    mounted:function() {
      // this.list = data;
      this.getContent(); 
    }
  }

</script>

<style lang="less">


</style>
