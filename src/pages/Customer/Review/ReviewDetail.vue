<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="refuse">不予通过</el-button>
      <el-button size="small" @click="pass">认证通过</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="律师信息" />
      <infor title="申请时间" :con="dateFormat(data.created_at)" />
      <infor title="姓名" :con="data.name" />
      <infor title="性别" :con=sex />
      <infor title="手机号" :con="data.phone" />
      <infor title="身份证正面照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+data.id_card" slot="con"></pop-img>
      </infor>
      <infor title="手持身份证照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+data.id_card_hand" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="职业信息" />
      <infor title="执业地区" :con="data.address" />
      <infor title="执业机构" :con="data.organization" />
      <infor title="执业证号" :con="data.certificate_number" />
      <infor title="律师执业资格证">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+data.certificate" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="擅长领域"/>
      <span class="detail-tag detail-tag-first" v-for="item in business">{{item.name}}</span>
    </div>
    <div class="detail-main">
      <infor-title title="擅长服务" />
      <span class="detail-tag detail-tag-first" v-for="item in services">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
  import { businessList , servicesList , getReviewLawyer , passLawyer , denyLawyer } from '@/ajax/post.js'
  import InforTitle from '@/components/InforTitle'
  import { dateFormat } from '@/util/util'
  import Infor from '@/components/Infor'
  import InputText from '@/components/InputText.vue'
  import PopImg from '@/components/PopImg.vue'
  export default {
    components: {
      Infor,
      InforTitle,
      InputText,
      PopImg
    },
    data() {
      return {
        mediation: "",
        status: 0,
        data:{},
        sex:'',
        id:0,
        business:[],
        services:[]
      }
    },
    methods: {
      dateFormat(date){
        return dateFormat(date)
      },
      refuse() {
        denyLawyer(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "CertificationDealing"
            })
          };
        }) 
      },

      pass() {
        passLawyer(this.$route.query.id,{
          id:this.$route.query.id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            router.push({
              name: "CertificationDealing"
            })
          };
        }) 
      },
      //获取律师详情
      getLawyer(){
        var self = this
        getReviewLawyer(this.id).then((res)=>{
          if(res.code == 200){
            this.data = res.data
            this.sex = res.data.gender >0? '男':'女'
            var list1 = res.data.business.split(',');
            var list2 = res.data.services.split(',');
          }
          businessList({}).then((res) => {
            if (res.code == 200) {
              res.data.forEach(function(list){
                list1.forEach(function(listin){
                  if (list.id == listin) {
                    self.business.push(list);
                  };
                })
              })
            };
          });
          servicesList({}).then((res) => {
            if (res.code == 200) {
              res.data.forEach(function(list){
                list2.forEach(function(listin){
                  if (list.id == listin) {
                    self.services.push(list);
                  };
                })
              })
            };
          });
        })
      },
      //获的返回路径
      getPath() {
        let path = ''
        switch (this.status) {
          case 1:
            path = 'ReviewDealing'
            break
          case 2:
            path = 'ReviewWaitDeal'
            break
        }
        router.push({
          name: path
        })
      }
    },
    mounted() {
      this.status = this.$route.params.status
      this.id = this.$route.query.id
      this.getLawyer()
    }
  }
</script>

<style lang="less">
</style>
