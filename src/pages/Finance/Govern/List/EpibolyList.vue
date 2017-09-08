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
              <el-form-item label="套餐名称：">
                <span class="lawyer-form-deposit">{{ props.row.swift_number }}</span>
              </el-form-item>
              <el-form-item label="应付金额：">
                <span class="lawyer-form-deposit">{{ (props.row.combo_price/100).toFixed(2) }}</span>
              </el-form-item>
              <el-form-item label="实付金额：">
                <span class="lawyer-form-deposit">{{ (props.row.money/100).toFixed(2) }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="流水号" prop="swift_number" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="付款时间" width="100" show-overflow-tooltip>
          <template scope="scope">
            <span>{{dateFormat(scope.row.gmt_create)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="user_name" width="100">
        </el-table-column>
        <el-table-column label="手机号" prop="user_phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="实付金额" width="80">
          <template scope="scope">
            <span>{{(scope.row.money/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付渠道">
          <template scope="scope">
            <span>{{ payWay(scope.row.channel) }}</span>
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
  import { dateFormat } from '@/util/util'
  import { payment } from '@/ajax/post.js'

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

      getList(){
        payment({
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

      getType(id) {
        switch (id) {
          case 0:
            return "免费次数"
          case 1:
            return "5-8折"
          case 2:
            return "3-5折"
          case 3:
            return "1-3折"
        }
      },

      payWay(way){
        // 渠道(0微信1支付宝3法务外包)
        if (way == 0) {
          return "微信"
        } else if (way == 1) {
          return "支付宝"
        } else if (way == 3) {
          return "法务外包"
        }
      },

    },
    mounted() {
      // this.list = data
      this.getList();
    }
  }

</script>
<style>
</style>
