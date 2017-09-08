<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">提现申请</el-radio-button>
      <el-radio-button :label="2">已处理</el-radio-button>
      <!-- <el-radio-button :label="3">提现失败</el-radio-button> -->
    </el-radio-group>
    <el-date-picker v-model="date" type="daterange" placeholder="选择日期范围" class="list-date" clearable>
    </el-date-picker>
    <el-button type="primary" size="small" @click="dateSearch">确定</el-button>
    <div class="table-bg" v-show="type==1">
      <el-table :data="list" style="width: 100%" class="dealList1" v-loading.body="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="deposit-form">
              <el-form-item label="订单号：">
                <span class="lawyer-form-deposit">{{ props.row.order_id }}</span>
              </el-form-item>
              <el-form-item label="订单类型:">
                <span class="lawyer-form-deposit">{{ getType(props.row.type) }}</span>
              </el-form-item>
              <el-form-item label="委托类型：">
                <span class="lawyer-form-deposit">{{ getOrderType(props.row.order_type) }}</span>
              </el-form-item>
              <el-form-item label="订单状态：">
                <span class="lawyer-form-deposit">{{ getOrderStatus(props.row.order_status) }}</span>
              </el-form-item>
              <el-form-item label="账户类型：">
                <span class="lawyer-form-deposit">{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="收款银行：">
                <span class="lawyer-form-deposit">{{ props.row.bank_name }}</span>
              </el-form-item>
              <el-form-item label="收银账号：">
                <span class="lawyer-form-deposit">{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="账号名称：">
                <span class="lawyer-form-deposit">{{ props.row.account_name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="流水号" prop="swift_number" width="140" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="提交时间" width="90" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现人" prop="name" width="60">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="提现金额" width="80">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理结果" width="60">
          <template scope="scope">
            <span>{{getStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="acceptPop(scope.row.id)">提现处理</el-button>
            <el-button type="primary" size="small" @click="refusePop(scope.row.id)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <div class="table-bg" v-show="type==2">
      <el-table :data="list" style="width: 100%" class="dealList1" v-loading.body="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="deposit-form">
              <el-form-item label="订单号：">
                <span class="lawyer-form-deposit">{{ props.row.order_id }}</span>
              </el-form-item>
              <el-form-item label="订单类型:">
                <span class="lawyer-form-deposit">{{ getType(props.row.type) }}</span>
              </el-form-item>
              <el-form-item label="委托类型：">
                <span class="lawyer-form-deposit">{{ getOrderType(props.row.order_type) }}</span>
              </el-form-item>
              <el-form-item label="订单状态：">
                <span class="lawyer-form-deposit">{{ getOrderStatus(props.row.order_status) }}</span>
              </el-form-item>
              <el-form-item label="账户类型：">
                <span class="lawyer-form-deposit">{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="收款银行：">
                <span class="lawyer-form-deposit">{{ props.row.bank_name }}</span>
              </el-form-item>
              <el-form-item label="收银账号：">
                <span class="lawyer-form-deposit">{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="账号名称：">
                <span class="lawyer-form-deposit">{{ props.row.account_name }}</span>
              </el-form-item>
              <el-form-item label="处理时间：">
                <span class="lawyer-form-deposit">{{dateFormat(props.row.updated_at*1000)}}</span>
              </el-form-item>
              <el-form-item label="处理结果：">
                <span class="lawyer-form-deposit">{{getStatus(props.row.status)}}</span>
              </el-form-item>
              <!-- <el-form-item label="提现凭证：">
                <span class="lawyer-form-deposit">{{props.row.proof}}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="流水号" prop="swift_number" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="提交时间" width="140" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现人" prop="name" width="60">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="提现金额" width="80">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际转出">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理结果">
          <template scope="scope">
            <span>{{getStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <!-- <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div> -->
    <el-dialog :visible="isProof" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">提现处理</h1>
      <el-form :modal="form" label-width="13o0px">
        <el-form-item label="实际转出：">
          <el-input v-model="form.nowPrice" :controls="false" type="number"></el-input>
        </el-form-item>
        <el-form-item label="转账凭证：">
          <inputText v-model="form.desc" content="请输入转账单号或其他相关数据" :maxNumber="100"></inputText>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="isProof = false">取消</el-button>
            <el-button type="primary" style="margin-left:20px" @click="save">确认</el-button>
        </span>
    </el-dialog>

    <el-dialog :visible="isProof2" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">驳回</h1>
      <el-form :modal="form" label-width="130px">
        <el-form-item label="驳回理由：">
          <inputText v-model="refuse" content="请输入驳回理由" :maxNumber="100"></inputText>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isProof2 = false">取消</el-button>
          <el-button type="primary" style="margin-left:20px" @click="sureRefuse">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import data from "@/assets/json/finance.json"
  import InputText from '@/components/InputText.vue'
  import { withdrawals , withdrawalsRefuse , withdrawalsWithdraw } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'


  export default {
    components: {
      InputText
    },
    watch: {
      type: function (val, oldVal) {
        this.loading = true;
        this.getList();
      },
    },
    data() {
      return {
        loading: true,
        refuse:"",
        refuseId:0,
        saveId:0,


        currentPage:1,
        pagesize:10,
        intotal:0,

        type: 1,
        start:"",
        end:"",

        list: [],
        isProof: false, // 提现弹窗
        isProof2: false, // 驳回弹窗
        date: [],

        form: {
          nowPrice: "",
          desc: ""
        }

      }
    },
    methods: {
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

      acceptPop(id){
        this.isProof = true;
        this.saveId = id;
      },

      save() {
        if (this.form.desc == "" || this.form.nowPrice == "") {
          this.$message({
            message: "请将信息输入完整",
            type: 'success'
          });
        } else {
          withdrawalsWithdraw(this.saveId,{
            content:this.form.desc,
            money: (this.form.nowPrice*100).toFixed(0),
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "处理完成",
                type: 'success'
              });
              this.this.form.desc = "";
              this.form.nowPrice == "";
              this.isProof = false;
              this.getList();
            };
          })
        }
      },

      sureRefuse(){
        if (this.refuse == "") {
          this.$message({
            message: "请输入驳回理由",
            type: 'success'
          });
        } else {
          withdrawalsRefuse(this.refuseId,{
            content:this.refuse,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "处理完成",
                type: 'success'
              });
              this.refuse = "";
              this.isProof2 = false;
              this.getList();
            };
          })
        }
      },

      refusePop(id){
        this.isProof2 = true;
        this.refuseId = id;
      },

      getList(){
        withdrawals({
          keyword:"",
          status: this.type,
          start: this.start,
          end: this.end,
          // status: 0,
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

      getStatus(id) {
        if (id == 2) {
          return "提现成功"
        } else if(id == 1){
          return "已申请"
        } else if(id == 3){
          return "提现失败"
        }
      },

      getType(type){
        if (type == 0) {
          return "普通订单";
        } else if (type == 1){
          return "法律外包";
        }
      },

      getOrderType(type){
        // 1：合同审核 2：合同起草 3：发律师函 4：代写诉状 5:其他文书 6:律师见证 7:股权设计 8:诉讼仲裁 9:刑事会见 10:刑事辩护 11:付费咨询 12:请教问题 13:异地查档
        if (type == 1) {
          return "合同审核"
        } else if (type == 2){
          return "合同起草"
        } else if (type == 3){
          return "发律师函"
        } else if (type == 4){
          return "代写诉状"
        } else if (type == 5){
          return "其他文书"
        } else if (type == 6){
          return "律师见证"
        } else if (type == 7){
          return "股权设计"
        } else if (type == 8){
          return "诉讼仲裁"
        } else if (type == 9){
          return "刑事会见"
        } else if (type == 10){
          return "刑事辩护"
        } else if (type == 11){
          return "付费咨询"
        } else if (type == 12){
          return "请教问题"
        } else if (type == 13){
          return "异地查档"
        } 
      },

      getOrderStatus(status){
        // 订单状态:0 待发布 1 待付款 2 待付款 3 待服务 4 待服务 5 待评价 6 已完成 7 已终止
        if (status == 1) {
          return "待付款"
        } else if (status == 2){
          return "待付款"
        } else if (status == 3){
          return "待服务"
        } else if (status == 4){
          return "待服务"
        } else if (status == 5){
          return "待评价"
        } else if (status == 6){
          return "已完成"
        } else if (status == 7){
          return "已终止"
        } else if (status == 0){
          return "待发布"
        }
      },

      
    },
    mounted() {
      // this.list = data，
      this.getList();
    }
  }

</script>
<style>
  .list-date {
    margin-left: 50px;
    margin-right: 10px;
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
