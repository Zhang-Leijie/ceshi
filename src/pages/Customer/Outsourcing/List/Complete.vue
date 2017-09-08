<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">正在处理</el-radio-button>
      <el-radio-button :label="2">等待处理</el-radio-button>
    </el-radio-group>
    <div class="table-bg" v-show="type == 1">
      <el-table :data="list" style="width: 100%" class="dealList">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="订单金额：">
                <span>{{ `${props.row.money/1000}元`}}</span>
              </el-form-item>
              <el-form-item label="服务进度：">
                <span>{{ `${props.row.progress_count}个` }}</span>
              </el-form-item>
              <el-form-item label="完成时间：">
                <span>{{dateFormat(props.row.created_at)}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" width="160" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.created_at))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="70">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="委托项目" width="100">
          <template scope="scope">
            <span>{{(contractType(scope.row.order_type_id))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="mini" @click="startDealing(scope.row.id)">进行处理</el-button>
            <el-button type="danger" size="mini" @click="onCancel(scope.row.id)">取消处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-bg" v-show="type == 2">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="订单金额：">
                <span>{{ `${props.row.money/1000}元`}}</span>
              </el-form-item>
              <el-form-item label="服务进度：">
                <span>{{ `${props.row.progress_count}个` }}</span>
              </el-form-item>
              <el-form-item label="完成时间：">
                <span>{{dateFormat(props.row.created_at)}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" width="180" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.time))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="70">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="委托项目" width="100">
          <template scope="scope">
            <span>{{(contractType(scope.row.order_type_id))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="mini" @click="waitDealing(scope.row.id)">开始处理</el-button>
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
  import { orderList,orderResolve,orderStopResolve} from '@/ajax/request.js'
  import data from '@/assets/json/common1.json'
  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        type: 1,
        page:1,
        intotal:0,
        pagesize:10,
        me: false,
        list: []
      }
    },
     watch: {
      // 如果 question 发生改变，这个函数就会运行
      type: function (val) {
        if(val == 1){
          this.me = true
          this.pagesize = 10
          console.log(this.me)
           this.getOrderList()
        }else {
          this.me = false
          this.pagesize = 10
          this.getOrderList()
          console.log(this.me)
        }
      },
    },
    methods: {
      dateFormat(time) {
        return dateFormat(time)
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.getOrderList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
         this.page = val
        this.getOrderList()
        console.log(`当前页: ${val}`);
      },
       payTime(time){
        var now = new Date().getTime()
        var count = now/1000 - time
        var last = parseInt(count/60)      
        return last
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
      getOrderList(){
        orderList({
          page:this.page,
          pagesize:this.pagesize,
          type:1,
          me:this.me,
          status:6
        }).then((res)=>{
          this.list = res.data.list
          this.intotal = res.data.count;
        })
      },
         startDealing(id) {
        orderResolve(id).then((res)=>{
            if(res.code == 200){
                router.push({
                  name: "OutsourcingDetail",
                  params: {
                    status: id
                  }
                })
            }
        })
      },
      waitDealing(id){
       router.push({
                  name: "OutsourcingDetail",
                  params: {
                    status: id
                  }
        })
      },
      onCancel(id) {
         orderStopResolve(id).then((res)=>{
          if(res.code == 200){
            this.$message(res.msg)
             router.push({
                name: "OutsourcingPlatform"
             })
          }else {
            this.$message(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getOrderList()
    }
  }

</script>

<style lang="less">


</style>
