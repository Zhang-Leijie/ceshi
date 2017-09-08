<template>
  <div v-if="info">
    <div class="detail-header">
      <el-button size="small" @click="returnList">返回</el-button>
      <el-button size="small" @click="cancel">取消处理</el-button>
      <el-button size="small" @click="finish">处理完成</el-button>
    </div>
    <div class="detail-main" v-if="info">
      <infor-title title="用户信息" />
      <infor title="姓名" :con="info.uname" />
      <infor title="性别" :con="sex(info.gender)" />
      <infor title="手机号" :con="info.phone" />
      <infor title="地区" :con="info.address" />
      <el-button type="primary" class="detail-main-button">联系用户</el-button>
    </div>
    <div class="detail-main" v-if="info">
      <infor-title title="保全信息" />
      <infor title="内容" :con="info.content" />
      <!-- <infor title="法院" con="杭州市江干区人民法院" />
      <infor title="身份" con="原告方" />
      <infor title="金额" con="2000千万" /> -->
    </div>
    <div class="detail-main" v-if="info">
      <infor-title title="处理记录">
      </infor-title>  
      <infor title="处理记录">
         <input-text :maxNumber="300" content="请输入" :answer="mediation" v-model="mediation" slot="con">
        </input-text>
      </infor>
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
  import { getPreservation , preservationSave , preservationFinish , preservationCancel } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'


  export default {
    components: {
      Infor,
      InforTitle,
      InputText
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

      save(){
        preservationSave(this.$route.query.id,{
          answer: this.mediation,
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

      cancel() {
        preservationCancel(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "LawsuitDealing"
            })
            // this.getList();
          };
        }) 
        // this.getPath()
      },
      returnList() {
        this.getPath()
      },
      finish() {
        preservationFinish(this.$route.query.id,{
          answer:this.mediation,
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "LawsuitDealing"
            })
          };
        }) 
        // this.getPath()
      },

      //获的返回路径
      getPath() {
        let path = ''
        switch (this.status) {
          case 1:
            path = 'LawsuitDealing'
            break
          case 2:
            path = 'LawsuitWaitDeal'
            break
        }
        router.push({
          name: path
        })
      }
    },
    mounted() {
      this.status = this.$route.params.status;
      this.getContent();
    }
  }

</script>

<style lang="less">


</style>
