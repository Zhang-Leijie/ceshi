<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio-button :label="1">办理套餐</el-radio-button>
      <el-radio-button :label="2">办理记录</el-radio-button>
      <el-radio-button :label="3">线下核销</el-radio-button>
      <el-radio-button :label="4">核销记录</el-radio-button>
    </el-radio-group>

    <div class="table-bg" v-show="type==1">
      <el-table :data="list" style="width: 100%">
        </el-table-column>
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="手机号" prop="phone">
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button type="primary" size="small" @click="isManage = true;chooseId = scope.row.id">
              办理
            </el-button>
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

    <div class="table-bg" v-show="type==2">
      <el-table :data="list3" style="width: 100%">
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="140">
        </el-table-column>
        <el-table-column label="手机号" width="140" prop="phone" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="办理时间">
          <template scope="scope">
            <span>{{(dateFormat(scope.row.gmt_create))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="办理人" prop="cs_name" show-overflow-tooltip></el-table-column>
        <el-table-column label="办理套餐" prop="combo_name"></el-table-column>
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

    <div class="table-bg" v-show="type==3">
      <el-input placeholder="搜索姓名/手机号" icon="search" v-model="message" :on-icon-click="search" class="search" size="small" style="margin-bottom:10px"></el-input>

      <el-table :data="list2" style="width: 100%">
        <el-table-column label="姓名" prop="name" width="140">
        </el-table-column>
        <el-table-column label="手机号" width="140" prop="phone" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="是否有卷">
          <template scope="scope">
            <span>{{(haveRoll(scope.row.is_combo))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template scope="scope" width="120">
            <!-- <el-button size="small" type="primary" @click="isSubRoll = true">减卷操作</el-button> -->
            <el-button size="small" type="primary" @click="subRoll(scope.row.id)">减卷操作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-bg" v-show="type==4">
      <el-table :data="list4" style="width: 100%">
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="140">
        </el-table-column>
        <el-table-column label="手机号" width="140" prop="phone" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="办理时间" width="160">
          <template scope="scope">
            <span>{{(dateFormat(scope.row.gmt_create))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="办理人" prop="name" width="110">
        </el-table-column>
        <el-table-column label="核销内容" prop="content">
        </el-table-column>
      </el-table>
      <div class="bottom-pagination">
        <el-pagination
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :current-page="currentPage3"
            :total='intotal3'
            :page-sizes="[5,10, 50, 100, 200, 300, 400]"
            :page-size="pagesize3"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

    

    <el-dialog :visible="isManage" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">办理套餐</h1>
      <el-row class="manage-dialog-bg">
        <el-col :span="12">
          <div style="max-width:210px">
            <h1>上架中套餐：</h1>
            <el-radio-group v-model="putaway">
              <el-radio :label="item.id" v-for="item in uplist" class="dialog-radio">
                {{item.name}}
              </el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="max-width:210px">
            <h1>未上架套餐：</h1>
            <el-radio-group v-model="putaway">
              <el-radio :label="item.id" v-for="item in downlist" class="dialog-radio">
                {{item.name}}
              </el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isManage=false;chooseId='';putaway=''">取消办理</el-button>
        <el-button type="primary" style="margin-left:20px" @click="saveManage">确认办理</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isSubRoll" size="tiny" :show-close="false">

      <div v-show="!isNext">
        <h1 slot="title" class="dialog-title">办理套餐</h1>
        <div class="manage-dialog-bg sub">
          <div v-for="item in rolllist" class="manage-dialog-item">
            <el-radio v-model="subRadio" :label="item.id" class="" @click.native="recordM(item.content)">{{item.name}}</el-radio>
          </div>
        </div>
      </div>

      <div v-show="isNext">

        <h1 slot="title" class="dialog-title">减卷核销</h1>
        <h2 style="font-size:16px">套餐：</h2>
        <div class="manage-dialog-bg sub">
          <el-row>
            <h3>剩余免费次数</h3>
            <div v-for="item in record.free">
              <el-col :span="5">
                <p>{{getName(item.order_type)}}：</p>
              </el-col>
              <el-col :span="5">
                <p>{{getTime(item.number)}}</p>
              </el-col>
              <el-col :span="14">
                <p>减掉
                  <input v-model="item.change" type="number"></input>&nbsp次
                </p>
              </el-col>
            </div>
          </el-row>
          <el-row style="margin-top:30px">
            <h3>剩余折扣次数</h3>
            <div v-for="item in record.sale">
              <el-col :span="5">
                <p>{{getName(item.order_type)}}：</p>
              </el-col>
              <el-col :span="5">
                <p>{{getTime(item.number)}}</p>
              </el-col>
              <el-col :span="14" v-if="item.number!=0">
                <p>减掉
                  <input v-model="item.change" type="number"></input>&nbsp次
                </p>
              </el-col>
            </div>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="next" type="primary" v-show="!isNext">下一步</el-button>
        <el-button @click="cancelSub" v-show="isNext">取消办理</el-button>
        <el-button type="primary" style="margin-left:20px" @click="saveSub" v-show="isNext">确认办理</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import data from "@/assets/json/camboList.json"
  import InputText from '@/components/InputText.vue'
  import { dateFormat } from '@/util/util'
  import { user , combo , comboHandle , getSearch , payment , getUserCombo , verification ,getVerification } from '@/ajax/post.js'

  export default {
    components: {
      InputText
    },
    data() {
      return {
        record:"",
        message:"",
        chooseId: "",

        currentPage:1,
        pagesize:10,
        intotal:0,

        currentPage2:1,
        pagesize2:10,
        intotal2:0,

        currentPage3:1,
        pagesize3:10,
        intotal3:0,

        type: 1,

        list: [],
        list2: [],
        list3: [],
        list4: [],
        rolllist: [],

        uplist: [],
        downlist: [],

        isManage: false, //办理弹窗参数
        putaway: "",
        notPutaway: "",

        isSubRoll: false, //减卷弹窗参数
        subRadio: "",
        isNext: false,
        num: ""
      }
    },
    methods: {
      getName(id){
        // 订单类型：1：合同审核 2：合同起草 3：发律师函 4：代写诉状 5:其他文书 6:律师见证 7:股权设计 8:诉讼仲裁 9:刑事会见 10:刑事辩护 11:付费咨询 12:请教问题 13:异地查档
        if (id == 1) {
          return "合同审核"
        } else if(id==2){
          return "合同起草"
        } else if(id==3){
          return "发律师函"
        } else if(id==4){
          return "代写诉状"
        } else if(id==5){
          return "其他文书"
        } else if(id==6){
          return "律师见证"
        } else if(id==7){
          return "股权设计"
        } else if(id==8){
          return "诉讼仲裁"
        } else if(id==9){
          return "刑事会见"
        } else if(id==10){
          return "刑事辩护"
        } else if(id==11){
          return "付费咨询"
        } else if(id==12){
          return "请教问题"
        } else if(id==13){
          return "异地查档"
        } 
      },

      getTime(time){
        if (time != 0) {
          return time+'次';
        } else {
          return "无限次";
        }
      },

      recordM(content){
        this.record = JSON.parse(content);
        this.record.free.forEach(function(list){
          list.change = 0
        });
        this.record.sale.forEach(function(list){
          list.change = 0
        });
      },

      subRoll(id){
        getUserCombo(id,{}).then((res) => {
          if (res.code == 200) {
            this.isSubRoll = true;
            this.rolllist = res.data;
          };
        })
      },

      getPayment(){
        payment({
          page: this.currentPage2,
          pagesize : this.pagesize2,
          channel: 3,
        }).then((res) => {
          if (res.code == 200) {
              this.list3 = res.data.list;
              this.intotal2 = res.data.count;
          };
        })
      },


      getVerification(){
        getVerification({
          page: this.currentPage3,
          pagesize : this.pagesize3,
        }).then((res) => {
          if (res.code == 200) {
              this.list4 = res.data.list;
              this.intotal3 = res.data.count;
          };
        })
      },

      search(){
        if (this.message == "") {
          this.$message({
            message: "请输入关键字",
            type: 'warning'
          });
        } else {
          getSearch({
            keyword:this.message,
          }).then((res) => {
            if (res.code == 200) {
                this.list2 = res.data
            };
          })
        }
      },

      getUser(){
        user({
          page: this.currentPage,
          pagesize : this.pagesize,
        }).then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.intotal = res.data.count;
          };
        })
      },

      getCombo(){
        combo({
          available: 0,
          page: 1,
          pagesize: 10000,
        }).then((res) => {
          if (res.code == 200) {
            this.downlist = res.data.list;
          };
        });

        combo({
          available: 1,
          page: 1,
          pagesize: 10000,
        }).then((res) => {
          if (res.code == 200) {
            this.uplist = res.data.list;
          };
        });
      },

      dateFormat(time) {
        return dateFormat(time)
      },

      handleSizeChange(val) {
        this.pagesize = val;
        this.getUser();
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUser();
      },

      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.getPayment();
      },

      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.getPayment();
      },

      handleSizeChange3(val) {
        this.pagesize3 = val;
        this.getVerification();
      },

      handleCurrentChange3(val) {
        this.currentPage3 = val;
        this.getVerification();
      },

      //新增套餐
      haveRoll(num) {
        switch (num) {
          case false:
            return "无卷"
          case true:
            return "有卷"
        }
      },

      saveManage() { //办理套餐
        if (this.putaway == "") {
          this.$message({
            message: "请选择套餐",
            type: 'warning'
          });
        } else {
          comboHandle(this.putaway,this.chooseId,{}).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "办理成功",
                type: 'success'
              });
              this.isManage = false;
              this.putaway = "";
            };
          });
        }
      },

      next() {
        if (this.subRadio) {
          this.isNext = true
        }
      },

      cancelSub() { //取消办理
        this.subRadio = ""
        this.isSubRoll = false
        this.isNext = false
      },

      saveSub() { //办理减卷
        this.$confirm('您正在核销客户的整个套餐，请谨慎操作', '警告', {
          confirmButtonText: '确定核销',
          cancelButtonText: '我再想想',
          type: 'warning'
        }).then(() => {
          // debugger;

          var free = []; 
          var sale = [];

          this.record.free.forEach(function(list){
            free.push({
              description:list.description,
              number: list.number - list.change,
              order_type: list.order_type,
              unlimited: list.unlimited,
            })
          })

          this.record.sale.forEach(function(list){
            sale.push({
              description:list.description,
              number: list.number - list.change,
              order_type: list.order_type,
              unlimited: list.unlimited,
            })
          })

          
          verification(this.subRadio,{
            content:{
              free,
              sale,
            },
            modified:"ggggnmb"
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.isSubRoll = false
              this.isNext = false
            };
          })

          // debugger;
        }).catch(() => {
          this.isSubRoll = false
          this.isNext = false
          console.log(2)
        })
      },

      //修改
      modify() {
        router.push({
          name: "EpibolyCreateCambo",
          params: {
            status: 0
          }
        })
      }
    },
    mounted() {
      // this.list = data
      this.getUser();
      this.getCombo();
      this.getPayment();
      this.getVerification();
    }
  }

</script>
<style lang="less">
  .manage-dialog-bg {
    border: 1px solid #eee;
    padding: 10px 30px;
    margin-top: 10px;
    height: 300px;
    overflow: auto;
    h1 {
      font-size: 16px;
      color: #999;
      text-align: center;
      margin-left: 20px;
    }
    .el-radio-group {
      // text-align: center;
    }
    .manage-dialog-item {
      margin-bottom: 10px;
      text-align: center;
    }
    h3 {
      color: #999;
    }
    p {
      margin-bottom: 3px;
    }
  }

  .sub {
    h1 {
      margin-left: 0;
    }
  }

</style>
