<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">在线销售中</el-radio-button>
      <el-radio-button :label="0">未上架套餐</el-radio-button>
    </el-radio-group>
    <div class="table-bg" v-show="type==1">
      <el-table :data="list" style="width: 100%" class="dealList1">
        <el-table-column label="套餐名称" prop="name" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="时间期限" width="70" prop="time" show-overflow-tooltip>
          <template scope="scope">
            {{ (day(scope.row.expiration_date)).toFixed(0) }}天
          </template>
        </el-table-column>
        <el-table-column label="原价" width="60">
          <template scope="scope">
            <span>{{(scope.row.price/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售价格" width="100" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(scope.row.promotion/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="免费服务次数" prop="free_count" width="100"></el-table-column>
        <el-table-column label="服务折扣" width="60">
          <template scope="scope">
            <span>{{(scope.row.promotion*10/scope.row.price).toFixed(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="goDetail(1,scope.row.id)">查看</el-button>
            <el-button type="primary" size="small">上移</el-button>
            <el-button type="primary" size="small">下移</el-button>
            <el-button type="danger" size="small" @click="upDown(scope.row.id,'down')">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-bg" v-show="type==0">
      <el-button style="margin-bottom:10px" type="primary" size="small" @click="addCambo">新增套餐 +</el-button>
      <el-table :data="list" style="width: 100%" class="dealList1">
        <el-table-column label="套餐名称" prop="name" width="90" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="时间期限" width="70" prop="time" show-overflow-tooltip>
          <template scope="scope">
            {{ (day(scope.row.expiration_date)).toFixed(0) }}天
          </template>
        </el-table-column>
        <el-table-column label="原价" width="60">
          <template scope="scope">
            <span>{{(scope.row.price/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售价格" width="100" show-overflow-tooltip>
          <template scope="scope">
            <span>{{(scope.row.promotion/100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="免费服务次数" prop="free_count" width="100"></el-table-column>
        <el-table-column label="服务折扣" width="60">
          <template scope="scope">
            <span>{{(scope.row.promotion*10/scope.row.price).toFixed(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="goDetail(2,scope.row.id)">查看</el-button>
            <el-button type="primary" size="small" @click="modify(scope.row.id)">修改</el-button>
            <el-button type="primary" size="small" @click="upDown(scope.row.id,'up')">上架</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
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
</template>
<script>
  import data from "@/assets/json/camboList.json"
  import InputText from '@/components/InputText.vue'
  import { combo , downUp , comboDel , comboAdd } from '@/ajax/post.js'

  export default {
    components: {
      InputText
    },
    data() {
      return {
        currentPage:1,
        pagesize:10,
        intotal:0,

        type: 1,
        list: [],
      }
    },
    watch: {
      type: function (val, oldVal) {
        this.loading = true;
        this.currentPage = 1;
        this.getList();
      },
    },
    methods: {
      del(id){
        comboDel(id,{}).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: 'success'
            });
            this.getList();
          };
        })
      },

      upDown(id,action){
        downUp(id,action,{}).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: 'success'
            });
            this.getList();
          };
        })
      },

      day(time){
        return time/60/60/24
      },

      getList(){
        combo({
          available: this.type,
          page: this.currentPage,
          pagesize: this.pagesize,
        }).then((res) => {
          // this.loading = false;
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

      //查看
      goDetail(num,id) {
        router.push({
          name: "EpibolyCamboDetail",
          params: {
            status: num,
          },
          query:{
            id: id,
          }
        })
      },

      //新增套餐
      addCambo() {
        router.push({
          name: "EpibolyCreateCambo",
          params: {
            status: 0
          }
        })
      },

      //修改
      modify(id) {
        router.push({
          name: "EpibolyModifyCambo",
          params: {
            status: 0
          },
          query:{
            id:id,
          }
        })
      }
    },
    mounted() {
      // this.list = data
      // this.type = this.$route.params.status
      this.getList();
    }
  }

</script>
<style>


</style>
