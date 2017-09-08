<template>
  <div v-if="info">
    <div class="detail-header">
      <el-button size="small" @click="refuse">不予通过</el-button>
      <el-button size="small" @click="pass">认证通过</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="律师信息" />
      <infor title="申请时间" :con="dateFormat(info.created_at*1000)" />
      <infor title="姓名" :con="info.name" />
      <infor title="性别" :con="sex(info.gender)" />
      <infor title="手机号" :con="info.phone" />
      <infor title="身份证正面照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.id_card" slot="con"></pop-img>
      </infor>
      <infor title="手持身份证照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.id_card_hand" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="职业信息" />
      <infor title="执业地区" :con="info.address" />
      <infor title="执业机构" :con="info.organization" />
      <infor title="执业证号" :con="info.certificate_number" />
      <infor title="律师执业资格证">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.certificate" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="擅长领域" />
      <div style="margin-left:50px;">
        <span class="detail-tag" v-for="item in business">{{item.name}}</span>
        <!-- <span class="detail-tag">债权债务</span>
        <span class="detail-tag">劳动人事</span> -->
      </div>
    </div>
    <div class="detail-main">
      <infor-title title="擅长服务" />
      <div style="margin-left:50px;">
        <span class="detail-tag" v-for="item in services">{{item.name}}</span>
        <!-- <span class="detail-tag">合同起草</span>
        <span class="detail-tag">代写诉状</span> -->
      </div>
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import InputText from '@/components/InputText.vue'
  import PopImg from '@/components/PopImg.vue'
  import { businessList , servicesList , getReviewLawyer , passLawyer , denyLawyer } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'
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
        info:"",
        business:[],
        services:[],
      }
    },
    methods: {
      getContent(){
        var self = this;
        getReviewLawyer(this.$route.query.id,{}).then((res) => {
          this.info = res.data;
          var list1 = res.data.business.split(',');
          var list2 = res.data.services.split(',');
          console.log(list1);
          console.log(list2);

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

      sex(sex){
        if (sex == 0) {
          return "女"
        } else {
          return "男"
        }
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
        // this.getPath()
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
        // this.getPath()
      },

      //获的返回路径
      getPath() {
        let path = ''
        switch (this.status) {
          case 1:
            path = 'CertificationDealing'
            break
          case 2:
            path = 'CertificationWaitDeal'
            break
        }
        router.push({
          name: path
        })
      },

      dateFormat(time) {
        return dateFormat(time)
      },

    },
    mounted() {
      this.status = this.$route.params.status;
      this.getContent();
    }
  }

</script>

<style lang="less">
</style>
