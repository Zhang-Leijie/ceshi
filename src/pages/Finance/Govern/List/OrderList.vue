<template>
  <div>
    <el-date-picker v-model="date" type="daterange" placeholder="选择日期范围" clearable>
    </el-date-picker>

    <el-button type="primary" size="small" @click="dateSearch">确定</el-button>
    
    <div class="table-bg">
      <el-table :data="list" style="width: 100%" class="dealList1" v-loading.body="loading">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="deposit-form">
              <el-form-item label="订单号：">
                <span class="lawyer-form-deposit">{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="订单类型:">
                <span class="lawyer-form-deposit">{{ getType(props.row.type) }}</span>
              </el-form-item>
              <el-form-item label="委托类型：">
                <span class="lawyer-form-deposit">{{ getOrderType(props.row.order_type) }}</span>
              </el-form-item>
              <el-form-item label="优惠类型：">
                <span class="lawyer-form-deposit">{{ getOffType(props.row.promotion_method) }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="流水号" prop="swift_number" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="付款时间" width="100" show-overflow-tooltip>
          <template scope="scope">
            <span>{{dateFormat(scope.row.created_at*1000)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="订单金额" prop="planPrice" width="80">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付渠道" prop="method">
          <template scope="scope">
            <span>{{payWay(scope.row.channel)}}</span>
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
  </div>
</template>
<script>
  import data from "@/assets/json/finance.json"
  import InputText from '@/components/InputText.vue'
  import { orderHistory } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'

  export default {
    components: {
      InputText
    },
    data() {
      return {
        loading: true,

        type: 1,
        start:"",
        end:"",

        currentPage:1,
        pagesize:10,
        intotal:0,

        list: [],
        isProof: false, //提现弹窗
        date: '',

        form: {
          nowPrice: 0,
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

      payWay(way){
        // 渠道(0微信1支付宝3法务外包)
        if (way == 0) {
          return "微信"
        } else if (way == 1) {
          return "支付宝"
        } else if (way == 2) {
          return "法务外包"
        }
      },

      getList(){
        orderHistory({
          keyword:"",
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

      getOffType(type) {
        // promotion_method：0:无 1:免费 2:5-8折
        if (type == 0) {
          return "无"
        } else if (type == 1){
          return "免费"
        } else if (type == 2){
          return "5-8折"
        }
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>
<style>
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
