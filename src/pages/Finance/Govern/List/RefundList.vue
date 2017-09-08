<template>
  <div>

    <el-date-picker v-model="date" type="daterange" placeholder="选择日期范围" clearable>
    </el-date-picker>
    <el-button type="primary" size="small" @click="dateSearch">确定</el-button>

    <el-input placeholder="搜索姓名/手机号" icon="search" v-model="message" :on-icon-click="search" class="search" size="small" style="margin-bottom:10px"></el-input>

    <div class="table-bg">
      <el-table :data="list" style="width: 100%" class="dealList1" v-loading.body="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="deposit-form">
              <el-form-item label="订单号：">
                <span class="lawyer-form-deposit">{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="订单类型:">
                <span class="lawyer-form-deposit">{{ getOrderType(props.row.type) }}</span>
              </el-form-item>
              <el-form-item label="委托类型：">
                <span class="lawyer-form-deposit">{{ props.row.origin }}</span>
              </el-form-item>
              <el-form-item label="退单状态：">
                <span class="lawyer-form-deposit">{{ getStatus(props.row.status) }}</span>
              </el-form-item>
              <el-form-item label="申请客服：">
                <span class="lawyer-form-deposit">{{ props.row.cname }}</span>
              </el-form-item>
              <el-form-item label="申请时间：">
                <span class="lawyer-form-deposit">{{ dateFormat(props.row.gmtCreate) }}</span>
              </el-form-item>
              <el-form-item label="审核主管：">
                <span class="lawyer-form-deposit">{{ props.row.auditPeople }}</span>
              </el-form-item>
              <el-form-item label="审核时间：">
                <span class="lawyer-form-deposit">{{ dateFormat(props.row.auditTime) }}</span>
              </el-form-item>
              <el-form-item label="退单原因：">
                <span class="lawyer-form-deposit">{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="流水号" prop="swiftNumber" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="退款时间" width="100" show-overflow-tooltip>
          <template scope="scope">
            <span>{{dateFormat(scope.row.auditTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现人" prop="name" width="120">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="退款金额" width="80">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="退款渠道">
          <template scope="scope">
            <span>{{channel(scope.row.channel)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="refund(scope.row.id)">确认退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total='intotal'
          :page-sizes="[5,10, 50, 100, 200, 300, 400]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog :visible="isMoney" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">请选择退款类型</h1>
      <el-button class="reBtn" @click="allRefuse">全额退款</el-button>
      <el-button class="reBtn" @click="isPart = true;isMoney = false">部分退款</el-button>
      <el-button class="reBtn" @click="isMoney = false">取消</el-button>
    </el-dialog>

    <el-dialog :visible="isPart" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">部分退款</h1>
      <div>
        <div style="margin-bottom:5px;">退款金额</div>
        <div>
          <el-input v-model="partMoney" placeholder="请输入退款金额" style="width:200px"></el-input>&nbsp&nbsp&nbsp元
        </div>
        <div style="margin-bottom:5px;">退款备注</div>
        <div>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入退款备注"
            v-model="partText">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPart = false">取消退款</el-button>
        <el-button type="primary" style="margin-left:20px" @click="sureBack">确认退款</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import data from "@/assets/json/finance.json"
  import InputText from '@/components/InputText.vue'
  import { dateFormat } from '@/util/util'
  import { listRefund , searchRefund , confirmedRefund } from '@/ajax/post.js'

  export default {
    components: {
      InputText
    },
    data() {
      return {
        refundId:"",
        message:"",

        start:"",
        end:"",

        currentPage:1,
        pagesize:10,
        intotal:0,

        loading: true,

        partMoney:"",
        partText:"",

        isPart: false,
        isMoney: false,

        list: [],
        isProof: false, //提现弹窗
        date: '',

        form: {
          nowPrice: 0,
          desc: ""
        }
      }
    },

    watch: {
      message: function (val, oldVal) {
        if (val == '') {
          this.getList();
        }
      },
    },

    methods: {
      search(){
        if (this.message == "") {
          this.$message({
            message: "请输入关键字",
            type: 'warning'
          });
        } else {
          this.searchList();
        }
      },
      

      dateSearch(){
        this.loading = true;
        if (this.date.length == 0) {
          this.$message({
            message: "请选择时间",
            type: 'warning'
          });
        } else {
          this.currentPage = 1;
          if (this.date[0] != null) {
            this.start = this.date[0].getTime()/1000;
          } else {
            this.start = ""
          };
          if (this.date[1] != null) {
            this.end = this.date[1].getTime()/1000;
          } else {
            this.end = ""
          };
          this.getList();
        }
      },

      channel(type){
        // 渠道：0微信 1支付宝 3免费
        if (type==0) {
          return '微信'
        } else if(type==1){
          return '支付宝'
        } else if(type==2){
          return '法务外包'
        }
      },

      getOrderType(type){
        // 1：合同审核 2：合同起草 3：发律师函 4：代写诉状 5:其他文书 6:律师见证 7:股权设计 8:诉讼仲裁 9:刑事会见 10:刑事辩护 11:付费咨询 12:请教问题 13:异地查档
        if (type == 0) {
          return "普通订单"
        } else if (type == 1){
          return "法律外包"
        }
      },

      getStatus(type){
        if (type == 4) {
          return "等待退款"
        } else if (type == 5){
          return "退款成功"
        }
      },

      getList(){
        listRefund({
          keyword: this.message,
          start: this.start,
          end: this.end,
          page: this.currentPage,
          pagesize: this.pagesize,
        }).then((res) => {
          this.loading = false;
          this.list = res.data.list;
          this.intotal = res.data.count;
        })
      },

      searchList(){
        searchRefund({
          keyword: this.message,
          page: this.currentPage,
          pagesize: this.pagesize,
        }).then((res) => {
          this.loading = false;
          this.list = res.data.list;
          this.intotal = res.data.count;
        })
      },

      dateFormat(time) {
        return dateFormat(time)
      },

      handleSizeChange(val) {
        this.pagesize = val;
        this.getList();
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
      },

      allRefuse() {
        this.$confirm('确定进行退款操作？请确保账户内有足够的余额进行退款！', '提示', {
          confirmButtonText: '确定退款',
          cancelButtonText: '取消退款',
          type: 'warning'
        }).then(() => {
          console.log(1);
          confirmedRefund(this.refundId,{
            money:0,
            type: 0,
            result:"",
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "操作成功",
                type: 'success'
              });
              this.getList();
              this.isMoney = false;
            };
          })
        }).catch(() => {
          console.log(2)
        })
      },

      sureBack(){
        if (this.partMoney == "" || this.partText == "") {
          this.$message({
              message: "请将信息填写完整",
              type: 'warning',
          });
        } else {
          this.$confirm('确定进行退款操作？请确保账户内有足够的余额进行退款！', '提示', {
            confirmButtonText: '确定退款',
            cancelButtonText: '取消退款',
            type: 'warning'
          }).then(() => {
            console.log(1);
            confirmedRefund(this.refundId,{
              money:(this.partMoney - 0)*100,
              type: 1,
              result: this.partText,
            }).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: 'success',
                });
                this.getList();
                this.isMoney = false;
                this.isPart = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning',
                });
              }
            })
          }).catch(() => {
            console.log(2)
          })
        }
      },

      refund(id){
        this.isMoney = true;
        this.refundId = id;
      },
    },
    mounted() {
      // this.list = data
      this.getList();
    }
  }

</script>
<style >
  .reBtn{
    width: 136px;
    border: none;
    background-color: #eee;
    color: #666;
  }
  .reBtn:hover{
    background-color: #42bd56;
    color: #fff;
  }
  .deposit-form .el-form-item {
    margin-bottom: 0;
  }

  .deposit-form .el-form-item__label {
    float: none;
    font-size: 14px;
    padding-right: 0;
    display: inline-block;
  }

  .lawyer-form-deposit {
    font-size: 14px;
  }

</style>
