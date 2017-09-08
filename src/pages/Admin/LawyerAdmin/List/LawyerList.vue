<template>
  <div>
    <el-button type="primary" size="small" @click="create">新增律师 +</el-button>
    <el-input placeholder="搜索姓名/手机号" style="width:200px;height:28px;" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>
    <div v-if="this.isSearch == false">
      <div class="table-bg">
        <el-table :data="list" style="width:100%" class="dealList1" v-loading.body="loading">
          <el-table-column label="律师姓名" prop="name" width="60"></el-table-column>
          <el-table-column label="手机号" prop="phone" width="100"></el-table-column>
          <el-table-column label="执业地区" prop="address" width="120"></el-table-column>
          <el-table-column label="执业律所" prop="organization" width="100"></el-table-column>
          <el-table-column label="平台身份" width="90" show-overflow-tooltip>
            <template scope="scope">
              <span>{{getType(scope.row.type)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="modify(scope.row.id)">查看/修改</el-button>
              <el-button type="primary" size="mini" @click="copLawyer(scope.row.id,3)" v-if="scope.row.type != 3">转为合作</el-button>
              <el-button type="primary" size="mini" @click="copLawyer(scope.row.id,2)" v-if="scope.row.type == 3">取消合作</el-button>
              <el-button type="danger" size="mini" @click="black(scope.row.id)">加入黑名单</el-button>
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
    <div v-if="this.isSearch == true">
      <div class="table-bg">
        <el-table :data="list2" style="width:100%" class="dealList1" v-loading.body="loading2">
          <el-table-column label="律师姓名" prop="name" width="60"></el-table-column>
          <el-table-column label="手机号" prop="phone" width="100"></el-table-column>
          <el-table-column label="执业地区" prop="address" width="120"></el-table-column>
          <el-table-column label="执业律所" prop="organization" width="100"></el-table-column>
          <el-table-column label="平台身份" width="90" show-overflow-tooltip>
            <template scope="scope">
              <span>{{getType(scope.row.type)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="modify(scope.row.id)">查看/修改</el-button>
              <el-button type="primary" size="mini" @click="copLawyer(scope.row.id,3)" v-if="scope.row.type != 3">转为合作</el-button>
              <el-button type="primary" size="mini" @click="copLawyer(scope.row.id,2)" v-if="scope.row.type == 3">取消合作</el-button>
              <el-button type="danger" size="mini" @click="black(scope.row.id)">加入黑名单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="bottom-pagination">
        <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :total='intotal2'
            :page-sizes="[5,10, 50, 100, 200, 300, 400]"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import data from '@/assets/json/consultation2.json'
  import { lawyer , blacklist , copLawyer , searchLawyer } from '@/ajax/post.js'

  import {
    dateFormat
  } from '@/util/util'
  export default {
    data() {
      return {
        isSearch: false,
        loading: true,
        loading2: true,

        currentPage:1,
        pagesize:10,
        intotal:0,

        currentPage2:1,
        pagesize2:10,
        intotal2:0,

        message:'',

        list: [],
        list2: []

      }
    },
    watch: {
      message: function (val, oldVal) {
        if (val == '') {
          this.isSearch = false;
        }
      },
    },
    methods: {
      search(){
        this.isSearch = true;
        searchLawyer({
          page: this.currentPage2,
          pagesize: this.pagesize2,
          black: 0,
          keyword:this.message,
        }).then((res) => {
          if (res.code == 200) {
            this.list2 = res.data.list;
            this.intotal2 = res.data.count;
            this.loading2 = false;
          }; 
        })
      },
      modify(id){
        router.push({
          name: "LawyerModify",
          query:{id:id}
        })
      },
      copLawyer(id,type){
        copLawyer(id,type,{}).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getList();
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      black(id){
        this.loading = true;
        this.loading2 = true;
        blacklist(id,1).then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.loading2 = false;
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getList();
          } else {
            this.loading = false;
            this.loading2 = false;
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      getList(){
        lawyer({
          page: this.currentPage,
          pagesize: this.pagesize,
          black: 0,
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

      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.search();
      },

      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.search();
      },

      //平台身份
      getType(id) {
        switch (id) {
          case 1:
            return "用户"
          case 2:
            return "律师"
          case 3:
            return "合作律师"
        }
      },

      create() {
        router.push({
          name: "LawyerCreate"
        })
      }
    },
    mounted:function() {
      this.getList();
    }
  }

</script>
<style>


</style>
