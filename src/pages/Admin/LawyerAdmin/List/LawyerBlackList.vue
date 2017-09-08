<template>
  <div>
    <el-input placeholder="搜索姓名/手机号" style="width:200px;height:28px;margin-bottom:15px;" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>
    
    <div v-if="this.isSearch == false">
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
            <el-button type="danger" size="mini" @click="black(scope.row.id)">取消黑名单</el-button>
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

    <div v-if="this.isSearch == true">
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
            <el-button type="danger" size="mini" @click="black(scope.row.id)">取消黑名单</el-button>
          </template>
        </el-table-column>
      </el-table>

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
  import { lawyer , blacklist , searchLawyer } from '@/ajax/post.js'

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

        list: [],
        list2: [],

        message:'',
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
          black: 1,
          keyword:this.message,
        }).then((res) => {
          if (res.code == 200) {
            this.list2 = res.data.list;
            this.intotal2 = res.data.count;
            this.loading2 = false;
          };
          
        })
      },

      black(id){
        this.loading = true;
        this.loading2 = true;
        blacklist(id,0).then((res) => {
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
          black: 1,
        }).then((res) => {
          this.loading = false;
          this.list = res.data.list;
          this.intotal = res.data.count;
        })
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

    },
    mounted:function() {
      this.getList();
    }
  }

</script>
<style>


</style>
