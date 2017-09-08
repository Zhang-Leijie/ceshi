<template>
  <div>
    <span class="deleteList-danger">警告：请谨慎进行删除操作。（请通过手机号搜索账号，然后在进行删除）</span>
    <el-table :data="list" style="width:100%" class="dealList1">
      <el-table-column label="律师姓名" prop="name" width="60"></el-table-column>
      <el-table-column label="手机号" prop="phone" width="100"></el-table-column>
      <el-table-column label="执业地区" prop="address" width="120"></el-table-column>
      <el-table-column label="执业律所" prop="office" width="100"></el-table-column>
      <el-table-column label="平台身份" width="90" show-overflow-tooltip>
        <template scope="scope">
          <span>{{getType(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import data from '@/assets/json/consultation2.json'
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      //平台身份
      getType(id) {
        switch (id) {
          case 1:
            return "用户"
          case 2:
            return "认证律师"
          case 0:
            return "合作律师"
        }
      },

      //删除律师信息
      deleteItem() {
        this.$confirm('您正在进行删除操作，请谨慎操作', '提示', {
          confirmButtonText: '确认删除',
          cancelButtonText: '我再想想',
          type: 'warning'
        }).then(() => {
          console.log(1)
        }).catch(() => {
          console.log(2)
        })
      }
    },
    mounted() {
      this.list = data
    }
  }

</script>
<style>


</style>
