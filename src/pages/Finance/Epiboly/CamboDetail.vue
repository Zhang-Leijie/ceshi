<template>
  <div v-if="info">
    <div class="detail-header">
      <el-button size="small" @click="cancel">返回</el-button>
      <el-button size="small" @click="soldOut" v-if="status == 1">下架</el-button>
      <el-button size="small" @click="change" v-if="status == 2">修改</el-button>
      <el-button size="small" @click="soldIn" v-if="status == 2">上架</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="套餐信息"></infor-title>
      <infor title="套餐名称" :con="info.name" />
      <infor title="套餐原价" :con="(info.price/100).toFixed(2)" />
      <infor title="销售价格" :con="(info.promotion/100).toFixed(2)" />
      <infor title="有效期" :con="(info.expiration_date/60/60/24).toFixed(0)+'天'" />
    </div>

    <div class="detail-main">
      <infor-title title="免费服务次数项目"></infor-title>
      <el-row v-for="item in content.free">
        <el-col :span="9">
          <infor :title="getName(item.order_type)" :con="getTime(item.number)" :first="10"></infor>
        </el-col>
        <el-col :span="15">
          <infor title="服务说明" :con="item.description"></infor>
        </el-col>
      </el-row>
    </div>

    <div class="detail-main">
      <infor-title title="服务折扣项目"></infor-title>
      <el-row v-for="item in content.sale">
        <el-col :span="9">
          <infor :title="getName(item.order_type)" :con="getTime(item.number)" :first="10"></infor>
        </el-col>
        <el-col :span="15">
          <infor title="服务说明" :con="item.description"></infor>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import { getCombo } from '@/ajax/post.js'

  export default {
    components: {
      Infor,
      InforTitle
    },
    data() {
      return {
        status: 0,
        info:"",
        content:"",
      }
    },
    methods: {
      getName(id){
        // 订单类型：1：合同审核 2：合同起草 3：发律师函 4：代写诉状 5:其他文书 6:律师见证 7:股权设计 8:诉讼仲裁 9:刑事会见 10:刑事辩护 11:付费咨询 12:请教问题 13:异地查档
        if (id == 1) {
          return "合同审核"
        } else if(id==2){
          return "合同起草"
        } else if(id==3){
          return "发律师函"
        } else if(id==4){
          return "代写诉状"
        } else if(id==5){
          return "其他文书"
        } else if(id==6){
          return "律师见证"
        } else if(id==7){
          return "股权设计"
        } else if(id==8){
          return "诉讼仲裁"
        } else if(id==9){
          return "刑事会见"
        } else if(id==10){
          return "刑事辩护"
        } else if(id==11){
          return "付费咨询"
        } else if(id==12){
          return "请教问题"
        } else if(id==13){
          return "异地查档"
        } 
      },

      getTime(time){
        if (time != 0) {
          return time+'次';
        } else {
          return "无限次";
        }
      },

      getCombo(){
        getCombo(this.$route.query.id,{}).then((res) => {
          if (res.code == 200) {
            this.info = res.data;
            this.content = JSON.parse(res.data.content);
          };
        })
      },

      cancel() { //返回
        router.push({
          name: "EpibolyCamboList"
        })
      },
      soldOut() { //下架

      },
      change() { //修改
        router.push({
          name: "EpibolyCreateCambo",
          params: {
            status: 1
          }
        })
      },
      soldIn() { //上架

      }
    },
    mounted() {
      // this.status = this.$route.params.status
      this.getCombo();
    }
  }

</script>
<style>


</style>
