<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
      <el-button size="small" @click="returnList(data.order.id)">取消处理</el-button>
      <el-button size="small" @click="dialog.isRecording=true">提交记录</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="用户信息" />
      <infor title="姓名" :con=data.user.name />
      <infor title="性别" :con=sex />
      <infor title="手机号" :con=data.user.phone />
      <infor title="地区" :con=data.user.address />
      <el-button type="primary" class="detail-main-button">联系用户</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="订单信息" />
      <infor title="订单号" :con=data.order.id />
      <infor title="创建时间" :con=createTime />
      <infor title="委托项目" :con=project />
      <infor title="订单类型" :con=types />
      <infor title="优惠方式" :con=promotion_method />
      <infor title="订单状态" :con="orderStatus" />
      <el-button type="primary" class="detail-main-button" @click="dialog.isChargeback = true">申请退单</el-button>
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
    <div class="detail-main" :style="{'padding-bottom':'50px'}">
      <infor-title title="委托补充" />
      <infor title="委托补充" :con="data.order.additional" />
      <el-button type="primary" class="detail-main-button" @click="dialog.isSupplement = true">进行补充</el-button>
    </div>
     <div class="detail-main" v-if="(data.order.status !==2) && (data.order.status !==4)">
      <infor-title title="报价信息" />
      <infor title="推送委托" :con="data.quotes_info.push_order_count" />
      <infor title="收到报价" :con="data.quotes_info.receive_quotes_count" />
      <infor title="推送报价" :con="data.quotes_info.push_quotes_count" />
      <infor title="推荐报价" :con="data.quotes_info.recommend_count" />
      <el-button type="primary" class="detail-main-button" @click="priceDeal">报价处理</el-button>
      <el-button type="primary" class="detail-main-button1" @click="dialog.isPush = true">推送处理</el-button>
    </div>
    <div class="detail-main" v-if="data.order.status == 2">
      <infor-title title="付款信息" />
      <infor title="订单金额" :con="data.pay_info.money/1000" />
      <infor title="付款时间" :con=payTime />
      <infor title="付款方式" :con=data.pay_info.channel />
    </div>
    <div class="detail-main" v-if="data.order.status == 4 || data.order.status == 2">
      <infor-title title="律师信息" />
      <infor title="姓名" :con=data.lawyer_info.name />
      <infor title="性别" :con=data.lawyer_info.gender />
      <infor title="手机号" :con=data.lawyer_info.phone />
      <infor title="执业地区" :con=data.lawyer_info.address />
      <infor title="执业律师" :con=data.lawyer_info.organization />
      <el-button type="primary" class="detail-main-button">联系律师</el-button>
    </div>
    <div class="detail-main" v-if="data.order.status == 4">
      <infor-title title="服务信息" />
      <infor title="已汇报服务进度" :con=data.service_info.progress_count />
      <infor title="汇报时间间隔" :con=data.service_info.updated_at />
      <el-button type="primary" class="detail-main-button" @click="toView">查看服务</el-button>
    </div>
    <div class="detail-main" v-if="data.order.status == 5">
      <infor-title title="评价信息" />
      <infor title="总评" :con="comment_info" />
      <infor title="专业能力">
        <el-rate v-model="data.comment_info.ability" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
      <infor title="服务态度">
        <el-rate v-model="data.comment_info.attitude" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
      <infor title="服务速度">
        <el-rate v-model="data.comment_info.speed" disabled show-text text-color="#42bd56" text-template="{value}分" slot="con" :colors="['#45bd56','#45bd56','#45bd56']">
        </el-rate>
      </infor>
    </div>
    <div class="detail-main" v-if="data.order.status == 7">
      <infor-title title="终止信息" />
      <infor title="处理客服" :con="data.stop_info.name" />
      <infor title="处理时间" :con="dateFormat(data.stop_info.created_at)" />
      <infor title="申请原因" :con="data.stop_info.content" />
      <infor title="审核主管" :con="data.stop_info.audit_people" />
      <infor title="审核时间" :con="dateFormat(data.stop_info.updated_at)" />
    </div>
    <text-dialog title="提交记录" content="请输入记录内容" type="记录" :open.sync="dialog.isRecording" @submit="recording"></text-dialog>
    <text-dialog title="申请退单" content="退单原因" type="申请" :open.sync="dialog.isChargeback" @submit="chargeback"></text-dialog>
    <text-dialog title="委托补充" content="补充内容" type="补充" :open.sync="dialog.isSupplement" @submit="supplement"></text-dialog>
    <el-dialog :visible.sync="dialog.isPush" size="small" :show-close="false">
      <h1 slot="title" class="dialog-title">委托推送（所有律师）</h1>
      <div class="detail-main">
        <el-radio-group v-model="dialogRadio">
          <el-radio :label="1">单独推送</el-radio>
          <el-radio :label="2">范围推送</el-radio>
        </el-radio-group>
      </div>
      <div v-show="dialogRadio == 1">
        <el-input placeholder="请输入律师手机号进行搜索" icon="search" v-model="dialogContent.search" :on-icon-click="handleIconClick" class="dialog-search">
        </el-input>
        <el-table :data="dialogContent.searchList">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="address" label="地区"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="identity" label="平台身份"></el-table-column>
        </el-table>
      </div>
      <div v-show="dialogRadio == 2">
        <div class="detail-main">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="地区：">
               <el-select v-model="selectProv" placeholder="请选择省份"   v-on:change="getProv($event)" size="small">
                  <el-option v-for="item in  dialogContent.addresss1" :label="item.label" :value="item.value"  ></el-option>
              </el-select>
              <el-select v-model="selectCity" placeholder="请选择城市"  v-on:change="getCity($event)" size="small">
                  <el-option :label="item.label" :value="item.value" v-for="item in cities" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务项目：">
              <checkBox v-model="form.services" :list="dialogContent.services"></checkBox>
            </el-form-item>
            <el-form-item label="服务领域：">
              <checkBox v-model="form.fields" :list="dialogContent.fields"></checkBox>
            </el-form-item>
            <el-form-item label="职业年限：">
              <checkBox v-model="years" :list="dialogContent.years"></checkBox>
            </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog.isPush = false">取消推送</el-button>
    <el-button type="primary" @click="push">推送订单</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  var Url = 'https://api.fa-zai.com/upload/'
  import { dateFormat } from '@/util/util'
  import { orderCancel,orderDetail,orderRecord,orderPhoneSearch,orderAdditional,orderStopResolve,orderPushOne,orderPushs } from '@/ajax/request.js'
  import InforTitle from '@/components/InforTitle'
  import City from '@/assets/json/city.json'
  import Infor from '@/components/Infor'
  import TextDialog from '@/components/TextDialog.vue'
  import data from '@/assets/json/common2.json'
  import checkBox from '@/components/CheckBox.vue'
  export default {
    components: {
      Infor,
      InforTitle,
      TextDialog,
      checkBox
    },
    data() {
      return {
        data:{},
        createTime:'',
        promotion_method:'',
        project:'',
        sex :'',
        content:'',
        identity:'',
        language:'',
        money:0,
        pages:0,
        delivery_time:'',
        photo:'',
        file:'',
        address:'',
        date:'',
        types:'',
        company_type:'',
        requirement_type:'',
        case_stage:'',
        price:0,
        claim:'',
        id:this.$route.params.status,
        scope:'',
        year:[],
        years:[],
        status: 0, //订单状态
        imageUrl: "",
        selectProv:'',
        selectCity:'',
        cities:[],
        year:[],
        rate: { //评分
          ability: 1, //专业能力
          attitude: 4, //服务态度
          speed: 1 //服务速度
        },
        dialog: { //控制弹窗参数
          isChargeback: false,
          isRecording: false,
          isSupplement: false,
          isPush: false
        },
        dialogRadio: 1,
        dialogContent: { //弹窗表达选择内容 
          search: "", //搜索内容
          searchList: [{
            name: "张三",
            sex: "男",
            address: "浙江杭州",
            phone: 18757150144,
            identity: "认证律师"
          }],
          addresss1: [],
          addresss2: [],
          services: [],
          fields: [],
          years: []
        },
        comment_info:'',
        form: { //弹窗表单展示内容
          address1: "",
          address2: "",
          services: [],
          years: [],
          fields: []
        }
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
        //省市联动选择
      getProv: function (prov) {  
          let tempCity=[];
          this.dialogContent.addresss2=[]; 
          let allCity= City;
          this.selectCity='';    
          for (var val of allCity){
              if (prov == val.prov){  
                    tempCity.push({label: val.label, value: val.label})  
               }  
          }  
          this.cities = tempCity;    
      },
      getCity: function (city) {  
          
      },
      //上传图片成功回调
      handleAvatarSuccess(res, file) {
        this.imageUrl = Url + res.data
        console.log(file)
      },
      onCancel() {
        router.push({
                name: "OutsourcingPlatform"
        })
      },
      returnList(id) {
        orderStopResolve(id).then((res)=>{
            if(res.code == 200){
               router.push({
                  name: "OutsourcingPlatform"
                })
            }
        })
      },
      //搜索回调
      handleIconClick(val) {
        orderPhoneSearch({
          phone:this.dialogContent.search
        }).then((res) =>{
          if(res.code == 200){
            this.dialogContent.searchList = res.data
          }
        })
        console.log(val)
      },
      //提交订单
      recording(val) {
         orderRecord(this.data.order.id,{
          content: val
        }).then((res)=>{
            if(res.code == 200){
              this.$message(res.msg)
               this.dialog.isRecording = false
            }
        })
      },
      //申请退单
      chargeback(val) {
        console.log(1)
        orderCancel({
          order_id : this.id,
          content : val
        }).then((res) =>{
          console.log(res)
        })
        this.dialog.isChargeback = false
      },
      //进行补充
      supplement(val) {
        console.log("supplement")
        orderAdditional(
         this.id,{
          additional : val
         }).then((res)=> {
          console.log(res)
        })
        this.dialog.isSupplement = false
      },
      push() {
        //单独推送
        this.year = []
        if(this.dialogRadio == 1){
          orderPushOne( this.dialogContent.searchList.id,this.data.order.id).then((res) =>{
            if(res.code == 200){
               this.dialog.isPush = false
               this.$message(res.msg)
            }
          })
        }else {
          for(var i = 0 ;i<= this.years.length;i++){
            if(this.years[i] == '2-5年'){
              this.year.push(1)
            }
            if(this.years[i] == '6-10年'){
              this.year.push(2)
            }
            if(this.years[i] == '10年以上'){
              this.year.push(3)
            }
          }
          orderPushs(this.data.order.id,{
            address: this.selectProv + this.selectCity,
            service:this.form.services.join(','),
            business:this.form.fields.join(','),
            years:this.year.join(',')
          }).then((res)=>{
            if(res.code == 200){
                    this.dialog.isPush = false
                    this.$message(res.msg)
            }
          })
        }
      },
      //报价处理
      priceDeal() {
        router.push({
          name: "OutsourcingAssingList",
          params: {
            status: this.$route.params.status
          }
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
       getDetail(){
        orderDetail(this.status).then((res)=>{
          if(res.code == 200){
            this.data = res.data
             if(res.data.pay_info){
              this.payTime = dateFormat(res.data.pay_info.created_at)
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
          }
          console.log(res)
        })
      },
      //查看服务
      toView() {
        router.push({
          name: "OutsouringSchedule",
          params: {
            status: this.$route.params.status
          }
        })
      }
    },
    mounted() {
     this.status = this.$route.params.status
      let {
        address1,
        address2,
        service,
        field,
        years
      } = data
      this.getDetail()
      this.dialogContent.addresss1 = address1
      this.dialogContent.addresss2 = address2
      this.dialogContent.services = service
      this.dialogContent.fields = field
      this.dialogContent.years = years
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

  .dialog-search {
    width: 20vw;
    margin: 10px 0;
  }

</style>
