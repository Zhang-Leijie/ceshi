<template>
  <div>
    <el-button type="primary" size="small" @click="isAdd=true">新增平台账号 +</el-button>
    <el-input placeholder="搜索姓名/手机号" style="width:200px;height:28px;" icon="search" v-model="message" :on-icon-click="search" class="search" size="small"></el-input>

    <div v-if="this.isSearch == false">
      <div class="table-bg">
        <el-table :data="list" style="width:100%" class="dealList1" v-loading.body="loading">
          <el-table-column label="头像" width="70">
            <template scope="scope">
              <pop-img :src="scope.row.avatar" class="list-img"></pop-img>
            </template>
          </el-table-column>
          <el-table-column label="账号" prop="phone" width="100"></el-table-column>
          <el-table-column label="姓名" prop="name" width="100"></el-table-column>
          <el-table-column label="法在号" prop="id" width="80"></el-table-column>
          <el-table-column label="创建时间" width="130" show-overflow-tooltip>
            <template scope="scope">
              <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区" prop="address" width="80"></el-table-column>
          <el-table-column label="">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="modify(scope.row,scope.$index)">修改</el-button>
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
          <el-table-column label="头像" width="70">
            <template scope="scope">
              <pop-img :src="scope.row.avatar" class="list-img"></pop-img>
            </template>
          </el-table-column>
          <el-table-column label="账号" prop="phone" width="100"></el-table-column>
          <el-table-column label="姓名" prop="name" width="100"></el-table-column>
          <el-table-column label="法在号" prop="id" width="80"></el-table-column>
          <el-table-column label="创建时间" width="130" show-overflow-tooltip>
            <template scope="scope">
              <span>{{(dateFormat(scope.row.created_at*1000))}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区" prop="address" width="80"></el-table-column>
          <el-table-column label="">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="modify(scope.row,scope.$index)">修改</el-button>
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

    <el-dialog :visible="isAdd" :show-close="false" size="tiny">
      <h1 slot="title" class="dialog-title">新增用户</h1>
      <el-form :model="form" label-width="100px" class="platAdmin-form">
        <el-form-item label="手机号：">
          <el-input v-model="form.phone" :controls="false" size="small" style="width:100%" type="number"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item style="marginTop:30px">
          <el-button @click="isAdd=false">取消新增</el-button>
          <el-button type="primary" @click="add">确认新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible="isModify" :show-close="false" size="tiny">
      <h1 slot="title" class="dialog-title">修改用户</h1>
      <el-form :model="modifyInfor" label-width="100px" class="platAdmin-form">
        <el-form-item label="手机号">
          <el-input-number v-model="modifyInfor.phone" :controls="false" size="small" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="modifyInfor.name" size="small"></el-input>
        </el-form-item>
        <el-form-item style="marginTop:30px">
          <el-button @click="isModify=false">取消修改</el-button>
          <el-button type="primary" @click="diaModify">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
  import data from '@/assets/json/consultation2.json'
  import PopImg from '@/components/PopImg.vue'
  import {
    dateFormat
  } from '@/util/util'
  import { user , addUser , modifyUser , blacklist , searchUser } from '@/ajax/post.js'

  export default {
    components: {
      PopImg
    },
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

        form: {
          phone: "",
          name: ""
        },

        isAdd: false,
        isModify: false, //修改弹窗
        modifyInfor: {}, //修改信息
        index: 0 ,//记录所按的行数

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
        searchUser({
          page: this.currentPage2,
          pagesize: this.pagesize2,
          keyword:this.message,
        }).then((res) => {
          if (res.code == 200) {
            this.list2 = res.data.list;
            this.intotal2 = res.data.count;
            this.loading2 = false;
          };
          
        })
      },

      dateFormat(time) {
        return dateFormat(time)
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
        user({
          page: this.currentPage,
          pagesize: this.pagesize,
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

      //新增
      add() {
        if (this.form.phone == "" || this.form.name == "") {
          this.$message({
            message: '请输入完整信息',
            type: 'warning'
          });
        } else if (this.form.phone.length != 11){
          this.$message({
            message: '请输入正确手机号',
            type: 'warning'
          });
        } else {
          addUser({
            phone: this.form.phone,
            name: this.form.name,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.isAdd = false
              this.getList();
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        }
      },

      //按列表修改按钮的回调
      modify(obj, index) {
        this.index = index
        Object.assign(this.modifyInfor, obj)
        // this.modifyInfor.password = 123456
        this.isModify = true
      },

      //按弹窗的修改按钮
      diaModify() {
        const {
          modifyInfor,
          index
        } = this
        // this.$set(this.list, index, modifyInfor)
        if (this.modifyInfor.phone == "" || this.modifyInfor.name == "") {
          this.$message({
            message: '请输入完整信息',
            type: 'warning'
          });
        } else if (this.modifyInfor.phone.toString().length != 11){
          this.$message({
            message: '请输入正确手机号',
            type: 'warning'
          });
        } else {
          modifyUser(this.modifyInfor.id,{
            phone: this.modifyInfor.phone,
            name: this.modifyInfor.name,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getList();
              this.modifyInfor = {}
              this.isModify = false
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        }
        
      },
    },
    mounted:function() {
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
