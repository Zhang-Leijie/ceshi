<template>
  <div class="dealing">
    <!-- <a class="table-label-button" @click="allClick">全部取消处理</a> -->
    <el-table :data="list" style="width: 100%" v-loading.body="loading">
      <el-table-column label="创建时间"  width="120">
        <template scope="scope">
          <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="130">
      </el-table-column>
      <el-table-column prop="order_id" label="订单号"></el-table-column>
      <el-table-column label="">
        <template scope="scope" width="150">
          <el-button type="primary" size="small" @click="dealing(scope.row.id)">进行处理</el-button>
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
  import { feedback } from '@/ajax/post.js'
  import { dateFormat } from '@/util/util.js'
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
        feedback({
          page: this.currentPage,
          pagesize: this.pagesize,
          status: 1,
        }).then((res) => {
          this.loading = false;
          this.list = res.data.list;
          this.intotal = res.data.count;
        })
      },

      //全部取消按钮
      allClick() {
        this.$confirm('您正在进行批量取消处理操作，请注意！', '警告', {
          confirmButtonText: '确定操作',
          cancelButtonText: '取消操作',
          type: 'warning'
        }).then(() => {
          console.log(1)
        }).catch(() => {
          console.log(2)
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
          name: 'GuaranteeDetail',
          query:{'id':id},
        })
      },
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
