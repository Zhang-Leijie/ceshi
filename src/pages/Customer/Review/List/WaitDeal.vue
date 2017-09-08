<template>
  <div>
    <el-table :data="list" style="width: 100%" v-loading.body="loading">
      <el-table-column label="创建时间" width="120">
        <template scope="scope">
          <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column label="" width="200">
        <template scope="scope">
          <el-button type="primary" size="small" @click="startDeal(scope.row.id)">开始处理</el-button>
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
</template>

<script>
  import data from '@/assets/json/consultation1.json'
  import { reviewLawyer , lawyerTakeover } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util'

  export default {
    data() {
      return {
        loading: true,

        currentPage:1,
        pagesize:10,
        intotal:0,

        list: []
      }
    },
    methods: {
      getList(){
        reviewLawyer({
          page: this.currentPage,
          pagesize: this.pagesize,
          status: 0,
          type:1,
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

      startDeal(id) {
        this.loading = true;
        lawyerTakeover(id,{
          id:id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "开始处理",
              type: 'success'
            });
            this.loading = false;
            this.getList();
          };
        })
        // router.push({
        //   name: 'CertificationDetail',
        //   params: {
        //     status: 2
        //   }
        // })
      }
    },
    mounted() {
      // this.list = data;
      this.getList();
    }
  }

</script>

<style>

  </style>
