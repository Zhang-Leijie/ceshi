<template>
  <div>
    <el-button type="primary" size="small" @click="addArticle">新增文章 +</el-button>
    <el-input placeholder="搜索关键字" style="width:200px" icon="search" v-model="keyword" :on-icon-click="search" class="search"size="small"></el-input>
    <div v-if="isSearch == false">
      <div class="table-bg">
        <el-table :data="list" style="width:100%" v-loading.body="loading">
          <el-table-column label="封面" width="100">
            <template scope="scope">
              <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+scope.row.cover" class="list-img" v-if="scope.row.cover!=''"></pop-img>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title" width="150"></el-table-column>
          <el-table-column label="创建时间" show-overflow-tooltip>
            <template scope="scope">
              <span>{{(dateFormat(scope.row.gmt_create))}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template scope="scope">
              <!-- <el-button type="primary" size="small">查看</el-button> -->
              <el-button type="primary" size="small" @click="change(scope.row.id)">查看/修改</el-button>
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
    <div v-if="isSearch == true">
      <div class="table-bg">
        <el-table :data="list2" style="width:100%" v-loading.body="loading2">
          <el-table-column label="封面" width="100">
            <template scope="scope">
              <pop-img :imgUrl="'https://api.fa-zai.com/upload/'+scope.row.cover" class="list-img" v-if="scope.row.cover!=''"></pop-img>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title" width="150"></el-table-column>
          <el-table-column label="创建时间" show-overflow-tooltip>
            <template scope="scope">
              <span>{{(dateFormat(scope.row.gmt_create))}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template scope="scope">
              <!-- <el-button type="primary" size="small">查看</el-button> -->
              <el-button type="primary" size="small" @click="change(scope.row.id)">查看/修改</el-button>
              <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
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
  import data from '@/assets/json/camboList.json'
  import PopImg from '@/components/PopImg.vue'
  import { dateFormat } from '@/util/util'
  import { article , articleDel , searchArticle } from '@/ajax/post.js'

  export default {
    components: {
      PopImg
    },
    data() {
      return {
        isSearch:false,

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

        keyword:"",
      }
    },
    watch: {
      keyword: function (val, oldVal) {
        if (val == '') {
          this.isSearch = false;
        }
      },
    },
    methods: {
      search(){
        this.isSearch = true;
        searchArticle({
          page: this.currentPage2,
          pagesize: this.pagesize2,
          keyword:this.keyword,
        }).then((res) => {
          if (res.code == 200) {
            this.list2 = res.data.list;
            this.intotal2 = res.data.count;
            this.loading2 = false;
          }; 
        })
        // console.log(1111)
      },

      getList(){
        article({
          page: this.currentPage,
          pagesize: this.pagesize,
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
        this.getList();
      },

      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.getList();
      },

      //新增文章
      addArticle() {
        router.push({
          name: "CreateArticle"
        })
      },

      //修改文章
      change(id) {
        router.push({
          name: "ModifyArticle",
          query: {id:id},
        })
      },

      del(id){
        articleDel(id,{}).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: 'success'
            });
            this.getList();
          };
        })
      }
    },
    mounted() {
      // this.list = data
      this.getList();
    }
  }

</script>
<style>
  .list-img .de-small-img1 {
    margin-top: 10px;
    margin-left: 5px;
    width: 50px;
    height: 50px;
  }

</style>
