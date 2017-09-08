<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">退单申请</el-radio-button>
      <el-radio-button :label="2">退单处理记录</el-radio-button>
    </el-radio-group>
    <div class="table-bg" v-show="type==1">
      <el-table :data="list" style="width: 100%" class="dealList1">
        <el-table-column label="订单编号" prop="order_id" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请退单时间" width="140" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.request_date))}}</span>
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
        <el-table-column label="委托类型" prop="type">
            <template scope="scope">
              <span>{{(Type(scope.row.type))}}</span>
            </template>
        </el-table-column>
        <el-table-column label="申请客服" prop="cs_name"></el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="mini" @click="dealing(scope.row.id,scope.row.order_id)">进行处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-bg" v-show="type == 2">
      <el-table :data="list" style="width: 100%" class="dealList1">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="处理主管：">
                <span>{{ props.row.supplement ==1?"李四":"张三" }}</span>
              </el-form-item>
              <el-form-item label="处理结果：">
                <span>{{ props.row.push == 1?"允许退单":"不允许退单" }}</span>
              </el-form-item>
              <el-form-item label="退单时间：">
                <span>{{(dateFormat(props.row.request_date))}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order_id" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请退单时间" width="140" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.request_date))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="60">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="委托项目" width="80">
          <template scope="scope">
            <span>{{(contractType(scope.row.order_type))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="委托类型" >
             <template scope="scope">
              <span>{{(Type(scope.row.type))}}</span>
            </template>
        </el-table-column>
        <el-table-column label="申请客服" prop="cs_name"></el-table-column>
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
  import { getCancelList, startCancel } from '@/ajax/request.js'
  import data from '@/assets/json/common1.json'
  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        type: 1,
        list: [],
        page:1,
        finish:false,
        pagesize:10,
        intotal:0
      }
    },
     watch: {
      // 如果 question 发生改变，这个函数就会运行
      type: function (val) {
        if(val == 1){
          this.finish = false
          this.pagesize = 10
          console.log(val)
           this.getList()
        }else {
          this.finish = true
          this.pagesize = 10
          console.log(val)
          this.getList()
        }
      },
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
        return id ==0 ? '普通订单':'法务外包'
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
      dealing(id,order_id) {
        startCancel(id).then((res)=>{
          console.log(id)
          if(res.code == 200){
            this.$message(res.msg)
              router.push({
                name: "OrderDetail",
                params:{
                  id:order_id
                }
            })
          }else {
            this.$message(res.msg)
          }
        })
      
      },
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
