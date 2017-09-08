<template>
  <div>
    <div class="detail-header">
      <h1 class="item-header">平台账号管理</h1>
    </div>
    <el-button type="primary" size="small" @click="isAdd=true" style="marginTop:10px">新增平台账号 +</el-button>
    <div class="table-bg">
      <el-table :data="list" style="width:100%" v-loading.body="loading">
        <el-table-column label="账号类型">
          <template scope="scope">
            <span>{{getType(scope.row.type)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="phone"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="modify(scope.row,scope.$index)">修改</el-button>
            <el-button type="primary" size="small" v-if="scope.row.is_lock == 0" @click="lock(scope.row.id)">锁定账号</el-button>
            <el-button type="danger" size="small" v-if="scope.row.is_lock == 1" @click="cancelLock(scope.row.id)">解除锁定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible="isAdd" :show-close="false" size="tiny">
      <h1 slot="title" class="dialog-title">新增平台账号</h1>
      <el-form :model="form" label-width="120px" class="platAdmin-form">
        <el-form-item label="账号类型：">
          <el-select v-model="form.status" size="small" style="width:100%">
            <el-option label="普通客服" :value="1"></el-option>
            <el-option label="客服主管" :value="2"></el-option>
            <el-option label="财务" :value="3"></el-option> 
            <el-option label="运营" :value="4"></el-option>
            <el-option label="管理员" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.phone" :controls="false" size="small" style="width:100%" type="number"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="form.password" :controls="false" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item style="marginTop:30px">
          <el-button @click="isAdd=false">取消</el-button>
          <el-button type="primary" @click="add">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible="isModify" :show-close="false" size="tiny">
      <h1 slot="title" class="dialog-title">修改平台账号</h1>
      <el-form :model="modifyInfor" label-width="120px" class="platAdmin-form">
        <el-form-item label="账号类型：">
          <span>{{getType(modifyInfor.type)}}</span>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input-number v-model="modifyInfor.phone" :controls="false" size="small" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="modifyInfor.password" :controls="false" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="modifyInfor.name" size="small"></el-input>
        </el-form-item>
        <el-form-item style="marginTop:30px">
          <el-button @click="isModify=false">取消</el-button>
          <el-button type="primary" @click="diaModify">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  import { sysUser, lock, unlock, modifysysUser, addsysUser } from '@/ajax/post.js'

  export default {
    data() {
      return {
        loading: true,

        list: [],
        currentPage:1,
        pagesize:10,
        intotal:0,
        isAdd: false, //添加弹窗
        isModify: false, //修改弹窗
        form: {
          status: "", //账号类型
          phone: "",
          password: "",
          name: ""
        },
        modifyInfor: {}, //修改信息
        index: 0 //记录所按的行数
      }
    },
    methods: {
      getList(){
        sysUser({
          page: this.currentPage,
          pagesize: this.pagesize,
        }).then((res) => {
          this.list = res.data.list;
          this.intotal = res.data.count;
          this.loading = false;
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

      getType(id) {
        switch (id) {
          case 1:
            return "普通客服"
          case 2:
            return "客服主管"
          case 3:
            return "财务"
          case 4:
            return "运营"
          case 5:
            return "管理员"
        }
      },
      add() {
        if (this.form.phone == ''||this.form.password == ''|| this.form.name == '' || this.form.status =='') {
          this.$message({
            message: '请输入完整信息',
            type: 'warning'
          });
        } else {
          addsysUser({
            phone: this.form.phone,
            password: this.form.password,
            name: this.form.name,
            type: this.form.status,
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
        this.modifyInfor.password = '';
        this.isModify = true
      },

      //按弹窗的修改按钮
      diaModify() {
        const {
          modifyInfor,
          index
        } = this
        this.$set(this.list, index, modifyInfor)
        modifysysUser(this.modifyInfor.id,{
          phone: this.modifyInfor.phone.toString(),
          password: this.modifyInfor.password != '' ? this.modifyInfor.password.toString() : undefined,
          name: this.modifyInfor.name,
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.modifyInfor = {}
            this.isModify = false;
            this.getList();
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      //锁定账号
      lock(id) {
        this.loading = true;
        lock(id,{
          id:id
        }).then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.$message({
              message: '账号锁定成功',
              type: 'success'
            });
            this.getList();
          };
        })
      },

      //解除锁定
      cancelLock(id) {
        this.loading = true;
        unlock(id,{
          id:id
        }).then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.$message({
              message: '账号解锁成功',
              type: 'success'
            });
            this.getList();
          };
        })
      }
    },
    mounted:function() {
      // this.list = data
      sysUser({
        page: this.currentPage,
        pagesize: this.pagesize,
      }).then((res) => {
        this.loading = false;
        this.list = res.data.list;
        this.intotal = res.data.count;
      })
    }
  }

</script>
<style lang="less">


</style>
