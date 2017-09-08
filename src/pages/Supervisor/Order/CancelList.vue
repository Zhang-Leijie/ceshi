<template>
  <div>
    <div>
      <el-table :data="list" style="width: 100%" class="dealList1">
        <el-table-column label="订单编号" prop="order_id" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请退单时间" width="140" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.request_date*1000))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="60">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="委托项目"  width="80">
          <template scope="scope">
            <span>{{(contractType(scope.row.order_type))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="委托类型"  width="80">
            <template scope="scope">
            <span>{{(Type(scope.row.type))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请客服" prop="name" width="80"></el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="mini" @click="dealing(scope.row.order_id)">强制取消处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="intotal">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getCancelList,orderStopResolve2} from '@/ajax/request.js'
  import data from '@/assets/json/common1.json'
  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        list: [],
        intotal:0,
        page:1,
        pagesize:10,
        keyword:'',
        finish:true
      }
    },
    methods: {
      dateFormat(time) {
        return dateFormat(time)
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.getList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
        console.log(`当前页: ${val}`);
      },
      contractType(id){
        switch (id){
          case 1: 
            return '合同审核'
            break;
          case 2:
            return '合同起草'
            break;
          case 3 :
            return '发律师函'
            break;
          case 4 :
            return '代写诉状'
            break;
          case 5 :
            return '其他文书'
            break;
          case 6 :
            return '律师见证'
            break;
          case 7 :
            return '股权设计'
            break;
          case 8 :
            return '诉讼仲裁'
            break;
          case 9 :
            return '刑事会见'
            break;
          case 10 :
            return '刑事辩护'
            break;
          case 11 :
            return '付费咨询'
            break;
          case 12 :
            return '请教问题'
            break;
          case 13 :
            return '异地查档'
            break;
        }
      },
      Type(id){
        return id == 0 ? '普通订单':'法务外包'
      },
      //获取退单列表
      getList(){
        getCancelList({
          keyword:this.keyword,
          finish:this.finish,
          page:this.page,
          pagesize:this.pagesize
        }).then((res)=>{
          if(res.code == 200){
            this.list = res.data.list
            this.intotal = res.data.count
          }
        })
      },
      //强制取消处理
      dealing(id) {
        orderStopResolve2(id).then((res)=>{
          if(res.code == 200){
            this.$message(res.msg)
            this.getList()
          }else {
            this.$message(res.msg)
            this.getList()
          }
        })
      }
    },
    mounted() {
      this.getList()
    }

  }

</script>
<style lang="less">
  .dealList1 .cell,
  .el-table th>div {
    padding-left: 10px;
    padding-right: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

</style>
