<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回列表</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="律师信息" />
      <infor title="申请时间" :con="dateFormat(info.created_at*1000)" />
      <infor title="姓名" :con="info.name" />
      <infor title="性别" :con="sex()" />
      <infor title="手机号" :con="info.phone" />
      <infor title="身份证正面照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.id_card" slot="con"></pop-img>
      </infor>
      <infor title="手持身份证照">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.id_card_hand" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="职业信息"/>
      <infor title="执业地区" :con="info.address" />
      <infor title="执业机构" :con="info.organization" />
      <infor title="执业证号" :con="info.certificate_number" />
      <infor title="律师执业资格证">
        <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+info.certificate_number" slot="con"></pop-img>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="擅长领域" />
      <span class="detail-tag detail-tag-first" v-for="item in business" >{{item.name}}</span>
    </div>
    <div class="detail-main">
      <infor-title title="擅长服务" />
      <span class="detail-tag detail-tag-first" v-for="item in services">{{item.name}}</span>
    </div>
    <div class="detail-main">
      <infor title="认证时间" :con="dateFormat(info.created_at)"></infor>
      <infor title="认证结果" con="审核通过"></infor>
      <infor title="客服" :con="info.cs_name"></infor>
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import PopImg from '@/components/PopImg.vue'
    import { businessList , servicesList , getReviewLawyer , passLawyer , denyLawyer } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'
  export default {
    components: {
      Infor,
      InforTitle,
      PopImg
    },
     data() {
      return {
        info:"",
        business:[],
        id:0,
        services:[],
      }
    },
    methods: {
      sex(sex){
        if (sex == 0) {
          return "女"
        } else {
          return "男"
        }
      },
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
       dateFormat(time) {
        return dateFormat(time)
      },
      onCancel() {
        router.push({
          name: "ReviewFinishDeal"
        })
      }
    },
    mounted(){
      this.getContent();
      this.id = this.$route.query.id
    }

  }

</script>

<style>


</style>
