<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">正在处理</el-radio-button>
      <el-radio-button :label="2">等待处理</el-radio-button>
    </el-radio-group>
    <div class="table-bg"  v-show="type == 1">
      <el-table :data="list" style="width: 100%" v-loading.body="loading" class="dealList">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="终止阶段：">
                <span>{{stopStatus(props.row.stop_status)}}</span>
              </el-form-item>
              <el-form-item label="终止时间：">
                <span>{{dateFormat(props.row.updated_at)}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" width="160" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(dateFormat(scope.row.time))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="70">
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="委托项目" prop="project" width="100"></el-table-column>
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
              <el-form-item label="终止阶段：">
                <span>{{stopStatus(props.row.stop_status)}}</span>
              </el-form-item>
              <el-form-item label="终止时间：">
                <span>{{dateFormat(props.row.updated_at)}}</span>
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
        <el-table-column label="委托项目" prop="project" width="100"></el-table-column>
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
  import { orderList } from '@/ajax/request.js'
  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        type: 1,
        list: [],
        pagesize: 10,
        page:1,
        loading: true,
        me : true,
        intotal:0
      }
    },
    watch: {
      // 如果 question 发生改变，这个函数就会运行
      type: function (val) {
        if(val == 1){
          this.me = true
          this.loading = true
          this.pagesize = 10
          console.log(this.me)
           this.getOrderList()
        }else {
          this.me = false
          this.pagesize = 10
          this.loading2 = true
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
      
      stopStatus(status){
        switch (status){
          case 2:
            return '选择律师'
            break;
          case 3:
            return '支付费用'
            break;
          case 4:
            return '律师服务'
            break;
          case 5:
            return '评价律师'
            break;
          case 6:
            return '服务完成'
            break;
        }
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
       startDealing(id) {
        orderResolve(id).then((res)=>{
            if(res.code == 200){
                router.push({
                  name: "CommonDetail",
                  params: {
                    status: id
                  }
                })
            }
        })
      },
      waitDealing(id){
       router.push({
                  name: "CommonDetail",
                  params: {
                    status: id
                  }
        })
      },
      onCancel(id) {
        orderStopResolve(id).then((res)=>{
          if(res.code == 200){
              this.getOrderList()
          }
        })
        console.log("取消处理")
      },
      getOrderList(){ 
        orderList({
          page:this.page,
          pagesize:this.pagesize,
          type:0,
          me : this.me,
          status:7
        }).then((res) =>{
          this.loading = false;
          this.list = res.list
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
