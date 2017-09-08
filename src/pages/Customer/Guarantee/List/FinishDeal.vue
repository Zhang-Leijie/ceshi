<template>
  <div>
    <el-table :data="list" style="width: 100%" v-loading.body="loading">
      <el-table-column label="创建时间" width="120">
        <template scope="scope">
          <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="130">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="130">
      </el-table-column>
      <el-table-column prop="order_id" label="订单号" width="100"></el-table-column>
      <el-table-column prop="customer" label="处理客服" width="100"></el-table-column>
      <el-table-column label="">
        <template scope="scope">
          <el-button type="primary" size="small" @click="toView(scope.row.id)">查看详情</el-button>
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
  import { dateFormat } from '@/util/util'
  import { feedback , feedTakeover } from '@/ajax/post.js'

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
          status: 2,
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

      toView(id) {
        router.push({
          name: "GuaranteeToView",
          query:{'id':id},
        })
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
