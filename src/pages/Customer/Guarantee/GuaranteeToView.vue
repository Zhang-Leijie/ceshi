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
    <div class="detail-main" v-if="info.order">
      <infor-title title="订单信息" />
      <infor title="订单号" :con="(info.order.order_id).toString()" />
      <infor title="订单类型" :con="type(info.order.type)" />
      <infor title="委托项目" :con="orderType(info.order.order_type_id)" />
      <infor title="订单状态" :con="status(info.order.status)" />
    </div>
    <div class="detail-main" v-if="info.feedback">
      <infor title="投诉内容" :con="info.feedback.content" />
      <h1 class="right-time">{{(dateFormat(info.feedback.created_at*1000))}}</h1>
    </div>
    <div class="detail-main" v-if="info.feedback">
      <infor-title title="处理结果" />
      <infor title="处理结果" :con="info.feedback.result" />
    </div>
    <div class="detail-main" v-if="info.feedback">
      <infor title="处理时间" con="2017-09-09 09:00:00" />
      <infor title="客服" con="张三" />
    </div>
  </div>
</template>

<script>
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import { getFeedback } from '@/ajax/post.js'
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
        getFeedback(this.$route.query.id,{}).then((res) => {
          this.info = res.data;
        })
      },
      onCancel() {
          router.push({
              name:"GuaranteeFinishDeal"
          })
      },
      sex(sex){
        if (sex == 0) {
          return "女"
        } else {
          return "男"
        }
      },
      type(text){
        if (text == 0) {
          return "普通订单"
        } else {
          return "法律外包"
        }
      },
      orderType(text){
        if (text == 1) {
          return "合同审核"
        } else if (text == 2){
          return "合同起草"
        } else if (text == 3){
          return "发律师函"
        } else if (text == 4){
          return "代写诉状"
        } else if (text == 5){
          return "其他文书"
        } else if (text == 6){
          return "律师见证"
        } else if (text == 7){
          return "股权设计"
        } else if (text == 8){
          return "诉讼仲裁"
        } else if (text == 9){
          return "刑事会见"
        } else if (text == 10){
          return "刑事辩护"
        } else if (text == 11){
          return "付费咨询"
        } else if (text == 12){
          return "请教问题"
        } else if (text == 13){
          return "异地查档"
        } 
      },
      status(text){
        if (text == 2){
          return "选择律师"
        } else if (text == 3){
          return "支付费用"
        } else if (text == 4){
          return "律师服务"
        } else if (text == 5){
          return "评价律师"
        } else if (text == 6){
          return "服务完成"
        } else if (text == 7){
          return "终止委托"
        }
      },
    },
    mounted:function() {
      this.getContent(); 
    }
  }

</script>

<style>


</style>
