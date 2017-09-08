<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
      <el-button size="small" @click="returnList">退单驳回</el-button>
      <el-button size="small" @click="charge">允许退单</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="用户信息"></infor-title>
      <infor title="姓名" :con="data.user.name" />
      <infor title="性别" :con="data.user.gender > 0?'男':'女'" />
      <infor title="手机号" :con="data.user.phone" />
      <infor title="地区" :con="data.user.address" />
      <el-button type="primary" class="detail-main-button">联系用户</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="订单信息" />
      <infor title="订单号" :con="data.order.id" />
      <infor title="创建时间" :con="dateFormat(data.order.created_at)" />
      <infor title="委托项目" :con="getProject(data.order.order_type)" />
      <infor title="订单类型" :con="data.order.type == 1?'法务外包':'普通订单'" />
      <infor title="订单状态" :con="data.order.status" />
      <infor title="优惠方式" :con="promotion_method" />
      <el-button type="primary" class="detail-main-button" @click="isChargeback = true">申请退单</el-button>
    </div>
     <div class="detail-main" v-if="data.order.order_type ==1">
      <infor-title title="委托内容"  />
      <infor title="我是" :con=identity />
      <infor title="语言" :con=language />
      <infor title="涉及金额" :con=money />
      <infor title="合同页数" :con=pages />
      <infor title="交付时间" :con=delivery_time />
      <infor title="合同描述" :con=content />
      <infor title="图片上传">
        <el-upload class="avatar-uploader" action="https://api.fa-zai.com/v1/common/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
          slot="con">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </infor>
    </div>
    <div class="detail-main" v-if="data.order.order_type ==2">
      <infor-title title="委托内容"  />
      <infor title="我是" :con=identity />
      <infor title="语言" :con=language />
      <infor title="涉及金额" :con=money />
      <infor title="交付时间" :con=delivery_time />
      <infor title="合同描述" :con=content />
    </div>
     <div class="detail-main" v-if="data.order.order_type ==3">
      <infor-title title="委托内容"  />
      <infor title="交付时间" :con=delivery_time />
      <infor title="委托内容" :con=content />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==4">
      <infor-title title="委托内容"  />
      <infor title="交付时间" :con=delivery_time />
      <infor title="案件情况" :con=content />
    </div>
      <div class="detail-main" v-if="data.order.order_type ==5">
      <infor-title title="委托内容"  />
      <infor title="交付时间" :con=delivery_time />
      <infor title="文书描述" :con=content />
    </div>
     <div class="detail-main" v-if="data.order.order_type ==6">
      <infor-title title="委托内容"  />
      <infor title="服务地点" :con=address />
      <infor title="服务时间" :con=date />
      <infor title="见证内容" :con=content />
    </div>
     <div class="detail-main" v-if="data.order.order_type ==7">
      <infor-title title="委托内容"  />
      <infor title="企业类型" :con=company_type	 />
      <infor title="需求类型" :con=requirement_type  />
      <infor title="交付时间" :con=delivery_time />
      <infor title="股权情况" :con=content />
      <infor title="期望律师地区" :con=address />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==8">
      <infor-title title="委托内容"  />
      <infor title="我是" :con=identity	 />
      <infor title="案件阶段" :con=case_stage  />
      <infor title="案件描述" :con=content />
      <infor title="期望律师地区" :con=address />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==9">
      <infor-title title="委托内容"  />
      <infor title="服务时间" :con=date	 />
      <infor title="会见要求" :con=content />
      <infor title="期望律师地区" :con=address />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==10">
      <infor-title title="委托内容"  />
      <infor title="身份" :con=identity	 />
      <infor title="案件阶段" :con=case_stage  />
      <infor title="案件描述" :con=content />
      <infor title="期望律师地区" :con=address />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==11">
      <infor-title title="委托内容"  />
      <infor title="咨询范围" :con=scope	 />
      <infor title="截止时间" :con=date  />
      <infor title="咨询内容" :con=content />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==12">
      <infor-title title="委托内容"  />
      <infor title="咨询范围" :con=scope	 />
      <infor title="付费意愿" :con=price  />
      <infor title="咨询内容" :con=content />
    </div>
    <div class="detail-main" v-if="data.order.order_type ==13">
      <infor-title title="委托内容"  />
      <infor title="查档地区" :con=address />
      <infor title="查档类型" :con=type />
      <infor title="查档内容" :con=content />
      <infor title="现有资料" :con=data />
      <infor title="特殊要求" :con=claim />
      <infor title="交付时间" :con=delivery_time />
    </div>
    <div class="detail-main">
      <infor-title title="报价信息" />
      <infor title="推送委托" :con="data.quotes_info.push_order_count" />
      <infor title="收到报价" :con="data.quotes_info.receive_quotes_count" />
      <infor title="推送报价" :con="data.quotes_info.push_quotes_count" v-if="orderType == 0" />
      <infor title="推荐报价" :con="data.quotes_info.recommend_count" v-if="orderType == 0" />
      <el-button type="primary" class="detail-main-button" @click="priceDeal">报价处理</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="付款信息" />
      <infor title="订单金额" :con="money" />
      <infor title="付款时间" :con="payTime" />
      <infor title="付款方式" :con="channel" />
    </div>
    <div class="detail-main">
      <infor-title title="律师信息" />
      <infor title="姓名" :con="lawyer_name" />
      <infor title="性别" :con="lawyer_gender" />
      <infor title="手机号" :con="lawyer_phone" />
      <infor title="执业地区" :con="lawyer_address" />
      <infor title="执业律所" :con="lawyer_organization" />
      <el-button type="primary" class="detail-main-button">联系律师</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="服务信息" />
      <infor title="已汇报服务进度" :con="progress_count" />
      <infor title="汇报时间间隔" :con="updated_at" />
      <el-button type="primary" class="detail-main-button" @click="toView">查看服务</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="评价信息" />
      <infor title="总评" con="好评" />
      <infor title="专业能力">
        <el-rate v-model="rate.ability" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
      <infor title="服务态度">
        <el-rate v-model="rate.attitude" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
      <infor title="服务速度">
        <el-rate v-model="rate.speed" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
    </div>
    <div class="detail-main">
      <infor-title title="退单内容"></infor-title>
      <infor title="申请人" con="张三"></infor>
      <infor title="申请时间" con="2017-09-09 09：09:09"></infor>
      <infor title="申请原因" con="您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师"></infor>
    </div>
    <text-dialog title="申请退单" content="退单原因" type="申请" :open.sync="isChargeback" @submit="chargeback"></text-dialog>
  </div>
</template>

<script>
  import {  dateFormat  } from '@/util/util'
  import { getCancelList, startCancel,orderDetail2 } from '@/ajax/request.js'
  import InforTitle from '@/components/InforTitle'
  import Infor from '@/components/Infor'
  import PopImg from '@/components/PopImg.vue'
  import TextDialog from '@/components/TextDialog.vue'
  import data from '@/assets/json/common2.json'
  export default {
    components: {
      Infor,
      InforTitle,
      PopImg,
      TextDialog
    },
    data() {
      return {
        status: 6, //订单状态
        promotion_method:'',
        orderType: 0, //订单类型
        imageUrl: "",
          payTime:'',
        content:'',
        identity:'',
        language:'',
        money:0,
        pages:0,
        delivery_time:'',
        photo:'',
        file:'',
        address:'',
        channel:'',
        date:'',
        company_type:'',
        requirement_type:'',
        case_stage:'',
        price:0,
        claim:'',
        scope:'',
        rate: { //评分
          ability: 1, //专业能力
          attitude: 4, //服务态度
          speed: 1 //服务速度
        },
        data:[],
        isChargeback: false, //是否申请退单
      }
    },

    computed: {
      orderStatus() {
        switch (this.status) {
          case 1:
            return "选择律师"
          case 2:
            return "支付费用"
          case 3:
            return "律师服务"
          case 4:
            return "评价律师"
          case 5:
            return "服务完成"
          case 6:
            return "委托终止"
        }
      }
    },
    methods: {
      //返回
      onCancel() {
        router.push({
          name: "Apply"
        })
      },
      dateFormat(time){
        return dateFormat(time)
      },
      //退单驳回
      returnList() {

        router.push({
          name: "Apply"
        })
      },
      //委托项目
      getProject(id){
        switch (id){
          case 1 :
            return '合同审核';
            break;
          case 2 :
            return '合同起草';
            break;
          case 3 :
            return '发律师函';
            break;
          case 4:
            return '代写诉状';
            break;
          case 5 :
            return '其它文书';
            break;
          case 6 :
            return '律师见证';
            break;
          case 7 :
            return '股权设计';
            break;
          case 8 :
            return '诉讼仲裁';
            break;
          case 9 :
            return '刑事会见';
            break;
          case 10 :
            return '刑事辩护';
            break;
          case 11 :
            return '付费咨询';
            break;
          case 12 :
            return '请教问题';
            break;
          case 13 :
            return '异地查档';
            break;
        }
      },
      //退单操作
      charge() {
        this.$confirm('您正在进行退单操作，是否确认进行次操作？', '警告', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          console.log(1)
        }).catch(() => {
          console.log(2)
        })
      },

      //上传图片成功回调
      handleAvatarSuccess(res, file) {
        console.log(file)
      },

      //报价处理
      priceDeal() {
        router.push({
          name: "OrderPushList"
        })
      },

      //申请退单
      chargeback(val) {
        console.log("chargeback")
        this.dialog.isChargeback = false
      },
      getDetail(){
        orderDetail2(this.id).then((res)=>{
          if(res.code == 200){
              this.data = res.data
              this.promotion_method = res.data.order.promotion_method == 0 ? '无' :res.data.order.promotion_method == 1 ? '免费' : '5-8折'
                 if(res.data.pay_info){
              this.payTime = dateFormat(res.data.pay_info.created_at)
              this.channel = res.data.pay_info.channel == 0 ? '微信' : res.data.pay_info.channel == 1 ? '支付宝' : '免费'
            }
            if(res.data.comment_info){
              this.comment_info = res.data.comment_info ==1? '好评' :res.data.comment_info ==2? '中评':'差评'
            }
            this.createTime = dateFormat(res.data.order.created_at)
            this.project = this.getProject(res.data.order.order_type)
            this.sex = res.data.user.gender >0 ? '男' : '女'
            this.types = res.data.order.type ==0 ? '普通订单' : '法律外包'
            this.promotion_method = res.data.order.promotion_method > 0? res.data.order.promotion_method > 1? '5-8折':'免费' :'无'
            this.status = res.data.order.status
            if(res.data.order.order_type == 1){
                this.content = res.data.order.content.content
                this.identity = res.data.order.content.identity
                this.language = res.data.order.content.language
                this.money = res.data.order.content.money
                this.pages = res.data.order.content.pages
                this.delivery_time = dateFormat(res.data.order.content.delivery_time)
            }
            if(res.data.order.order_type == 2){
                this.content = res.data.order.content.content
                this.identity = res.data.order.content.identity
                this.language = res.data.order.content.language
                this.money = res.data.order.content.money
                this.delivery_time = dateFormat(res.data.order.content.delivery_time)
            }
            if(res.data.order.order_type == 3 || res.data.order.order_type ==4 || res.data.order.order_type ==5){
               this.content = res.data.order.content.content
               this.delivery_time = dateFormat(res.data.order.content.delivery_time)
            }
            if(res.data.order.order_type == 6){
               this.address = res.data.order.content.address
               this.date = dateFormat(res.data.order.content.date)
               this.content = res.data.order.content.content
            }
            if(res.data.order.order_type == 7){
              this.company_type = res.data.order.content.company_type
              this.requirement_type = res.data.order.content.requirement_type
              this.content = res.data.order.content.content
              this.address = res.data.order.content.address
            }
            if(res.data.order.order_type == 8){
              this.identity = res.data.order.content.identity
              this.case_stage = res.data.order.content.case_stage
              this.content = res.data.order.content.content
              this.address = res.data.order.content.address
            }
            if(res.data.order.order_type == 9){
              this.date = dateFormat(res.data.order.content.date)
              this.content = res.data.order.content.content
              this.address = res.data.order.content.address
            }
            if(res.data.order.order_type == 10){
              this.identity = res.data.order.content.identity
              this.case_stage = res.data.order.content.case_stage
              this.content = res.data.order.content.content
              this.address = res.data.order.content.address
            }
            if(res.data.order.order_type == 11){
              this.date = dateFormat(res.data.order.content.date)
              this.content = res.data.order.content.content
              this.scope = res.data.order.content.scope
            }
            if(res.data.order.order_type == 12){
              this.price = res.data.order.content.price
              this.content = res.data.order.content.content
              this.scope = res.data.order.content.scope
            }
            if(res.data.order.order_type == 13){
              this.type = res.data.order.content.type
              this.content = res.data.order.content.content
              this.data = res.data.order.content.data
              this.delivery_time = dateFormat(res.data.order.content.delivery_time)
              this.claim = res.data.order.content.claim
              this.address = res.data.order.content.address
            }
          }else {
            this.$message(res.msg)
          }
        })
      },
      //查看服务
      toView() {
        router.push({
          name: 'OrderSchedule'
        })
      }
    },
    mounted(){
      this.id = this.$route.params.id
      this.getDetail()
    }
  }

</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #42bd56;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

</style>
