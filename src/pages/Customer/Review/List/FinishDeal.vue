<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="创建时间" width="170">
        <template scope="scope">
          <span>{{(dateFormat(scope.row.created_at))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="130">
      </el-table-column>
      <el-table-column label="认证结果">
        <template scope="scope">
          <span>审核通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer" label="客服" width="80"></el-table-column>
      <el-table-column label="">
        <template scope="scope">
          <el-button type="primary" size="small" @click="toView(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="intotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {  getLawyerReviewList } from '@/ajax/request.js'
  import data from '@/assets/json/consultation1.json'
  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        list: [],
        page:1,
        pagesize:10,
        intotal:0,
        loading: true,
      }
    },
    methods: {
      dateFormat(time) {
        return dateFormat(time)
      },
      handleSizeChange(val) {
        this.page = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.pagesize = val;
        this.getList();
      },
      getList(){
        getLawyerReviewList({
          page:this.page,
          pagesize:this.pagesize,
          status:2,
          type:1
        }).then((res) =>{
          if(res.code == 200){
            this.list = res.data.list
            this.loading = false;
            this.intotal = res.data.count;
          }
        })
      },
      toView(id) {
        router.push({
          name: "ReviewToView",
          query:{
            id:id
          }

        })
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>

<style>


</style>
