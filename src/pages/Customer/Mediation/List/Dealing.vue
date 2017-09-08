<template>
  <div class="dealing">
    <el-table :data="list" style="width: 100%" v-loading.body="loading">
      <el-table-column label="创建时间" width="120">
        <template scope="scope">
          <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uname" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column label="" widh="200">
        <template scope="scope">
          <el-button type="primary" size="small" @click="dealing(scope.row.id)">进行处理</el-button>
          <el-button type="danger" size="small" @click="cancelDeal(scope.row.id)">取消处理</el-button>
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
  import { Mediation , mediationCancel } from '@/ajax/post.js'
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
        Mediation({
          page: this.currentPage,
          pagesize: this.pagesize,
          status: 3,
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

      dealing(id) {
        router.push({
          name: 'MediationDetail',
          params: {
            status: 1,
          },
          query:{
            id:id,
          }
        })
      },
      cancelDeal(id) {
        mediationCancel(id,{
          id:id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getList();
          };
        }) 
        // console.log('取消处理')
      }
    },
    mounted() {
      // this.list = data;
      this.getList();
    }
  }

</script>

<style>
  .dealing {
    position: relative;
  }

</style>
