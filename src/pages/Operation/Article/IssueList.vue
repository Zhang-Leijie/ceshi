<template>
  <div>
    <div class="detail-header">
      <el-row>
        <el-col :span="12">
          <span class="issueList-title">APP用户端发布：</span>
          <el-button type="primary" size="small" @click="dialogOpen('APP用户端普法文章',1,1)">普法文章</el-button>
          <el-button type="primary" size="small" @click="dialogOpen('APP用户端普法置顶',1,2)">普法置顶</el-button>
          <el-button type="primary" size="small" @click="dialogOpen('APP用户端首页banner',1,3)">首页banner</el-button>
        </el-col>
        <el-col :span="12">
          <div>
            <span class="issueList-title">APP律师端发布：</span>
            <el-button type="primary" size="small" @click="dialogOpen('APP律师端普法文章',2,1)">普法文章</el-button>
            <el-button type="primary" size="small" @click="dialogOpen('APP律师端普法置顶',2,2)">普法置顶</el-button>
            <el-button type="primary" size="small" @click="dialogOpen('APP律师端首页banner',2,3)">首页banner</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-bg">
      <span class="issueList-title">已发布内容：</span>
      <el-select v-model="content" placeholder="发布位置筛选" size="small">
        <el-option v-for="(item,index) in contents" :label="item.name" :value="index" @click.native="changeList(item.role,item.position)">
        </el-option>
      </el-select>
      <el-table :data="list" style="width:100%;margin-top:20px" v-loading.body="loading">
        <el-table-column label="发布位置" width="110">
          <template scope="scope">
            <span>{{getRole(scope.row.role)}} {{getPosition(scope.row.position)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" show-overflow-tooltip width="100">
          <template scope="scope">
            <span>{{(dateFormat(scope.row.gmt_create))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布类型" width="100">
          <template scope="scope">
            <span>{{getType(scope.row.post_type)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" width="80">
          <template scope="scope">
            <pop-img :imgUrl="scope.row.cover" class="list-img"></pop-img>
          </template>
        </el-table-column>
        <el-table-column label="发布内容" prop="title"></el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button type="primary" size="small" @click="change(scope.row.id)">修改</el-button>
            <el-button type="danger" size="small" @click="delPost(scope.row.id)">取消发布</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :visible="isDialog" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">发布管理</h1>
      <h1 class="issue-dialog-title">{{dialogTitle2}}</h1>
      <el-row>
        <el-col :span="8" class="issue-dialog-title2">选择发布类型： </el-col>
        <el-col :span="16">
          <el-radio class="radio" v-model="dialogRadio" :label="1">文章库发布</el-radio>
          <el-radio class="radio" v-model="dialogRadio" :label="2">链接发布</el-radio>
        </el-col>
      </el-row>
      <div v-show="dialogRadio == 2">
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接标题：</h1>
          </el-col>
          <el-col :span="16">
            <el-input v-model="dialog.title" placeholder="请输入链接标题" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接地址：</h1>
          </el-col>
          <el-col :span="16">
            <el-input v-model="dialog.address" placeholder="http://" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接封面：</h1>
          </el-col>
          <el-col :span="16">
            <el-upload class="issue-dialog-picture" action="/v1/common/upload" :file-list="fileList" list-type="picture" :on-success="handleScucess" :on-remove="handleRemove">
              <el-button size="small" type="primary" v-if="this.image == ''">点击上传</el-button>
              <el-button type="small" :disabled="true" v-else>点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- </el-input> -->
          </el-col>
        </el-row>

      </div>

      <div v-show="dialogRadio == 1">
        <el-radio-group v-model="dialogRadio2" class="issue-dialog-bg">
          <el-radio v-for="item in list2" :label="item.id" style="width:100%" class="dialog-radio" @click.native="chooseArt(item.title,item.cover,item.content)">{{item.title}}</el-radio>
        </el-radio-group>
        <div>
          <el-pagination small layout="prev, pager, next" :total="intotal" @size-change="handleSizeChange1" @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false" style="margin-top:20px">取消</el-button>
        <el-button type="primary" style="margin-left:20px" @click="saveRadio">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isDialog2" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">修改管理</h1>
      <h1 class="issue-dialog-title">{{dialogTitle2}}</h1>
      <el-row>
        <el-col :span="8" class="issue-dialog-title2">选择发布位置： </el-col>
        <el-col :span="16">
          <el-radio class="radio" v-model="modifyPos" :label="1" style="margin-left:0px;" @click.native="modPos(1,1)">APP用户端普法文章</el-radio>
          <el-radio class="radio" v-model="modifyPos" :label="2" style="margin-left:0px;" @click.native="modPos(1,2)">APP用户端普法置顶</el-radio>
          <el-radio class="radio" v-model="modifyPos" :label="3" style="margin-left:0px;" @click.native="modPos(1,3)">APP用户端首页banner</el-radio>
          <el-radio class="radio" v-model="modifyPos" :label="4" style="margin-left:0px;" @click.native="modPos(2,1)">APP律师端普法文章</el-radio>
          <el-radio class="radio" v-model="modifyPos" :label="5" style="margin-left:0px;" @click.native="modPos(2,2)">APP律师端普法置顶</el-radio>
          <el-radio class="radio" v-model="modifyPos" :label="6" style="margin-left:0px;" @click.native="modPos(2,3)">APP律师端首页banner</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="issue-dialog-title2">选择发布类型： </el-col>
        <el-col :span="16">
          <el-radio class="radio" v-model="dialogRadio" :label="1">文章库发布</el-radio>
          <el-radio class="radio" v-model="dialogRadio" :label="2">链接发布</el-radio>
        </el-col>
      </el-row>
      <div v-show="dialogRadio == 2">
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接标题：</h1>
          </el-col>
          <el-col :span="16">
            <el-input v-model="dialog.title" placeholder="请输入链接标题" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接地址：</h1>
          </el-col>
          <el-col :span="16">
            <el-input v-model="dialog.address" placeholder="http://" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="issue-dialog-col">
          <el-col :span="8">
            <h1 class="issue-dialog-title2">链接封面：</h1>
          </el-col>
          <el-col :span="16">
            <el-upload class="issue-dialog-picture" action="/v1/common/upload" :file-list="fileList" list-type="picture" :on-success="handleScucess" :on-remove="handleRemove">
              <el-button size="small" type="primary" v-if="this.image == ''">点击上传</el-button>
              <el-button type="small" :disabled="true" v-else>点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- </el-input> -->
          </el-col>
        </el-row>

      </div>

      <div v-show="dialogRadio == 1">
        <el-radio-group v-model="dialogRadio2" class="issue-dialog-bg">
          <el-radio v-for="item in list2" :label="item.id" style="width:100%" class="dialog-radio" @click.native="chooseArt(item.title,item.cover,item.content)">{{item.title}}</el-radio>
        </el-radio-group>
        <div>
          <el-pagination small layout="prev, pager, next" :total="intotal" @size-change="handleSizeChange1" @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog2 = false" style="margin-top:20px">取消</el-button>
        <el-button type="primary" style="margin-left:20px" @click="modRadio">确认</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
  import data from '@/assets/json/camboList.json'
  import PopImg from '@/components/PopImg.vue'
  import { dateFormat } from '@/util/util'
  import { article , articlePush , postArticle , postDel , pusharticleMod } from '@/ajax/post.js'

  export default {
    components: {
      PopImg
    },
    data() {
      return {
        modifyId:"",
        modifyPos:"",

        role:"",
        position:"",

        modrole:"",
        modposition:"",

        searchRole:0,
        searchPosi:0,

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

        image:"",

        contents: [
          {
            name:"所有发布",
            position:0,
            role:0,
          }, 
          {
            name:"APP用户端普法文章",
            position:1,
            role:1,
          }, 
          {
            name:"APP用户端普法置顶",
            position:2,
            role:1,
          }, 
          {
            name:"APP用户端普法banner",
            position:3,
            role:1,
          }, 
          {
            name:"APP律师端普法文章",
            position:1,
            role:2,
          }, 
          {
            name:"APP律师端普法置顶",
            position:2,
            role:2
          }, 
          {
            name:"APP律师端普法banner",
            position:3,
            role:2,
          }
        ],
        content: "",

        isDialog: false, //弹窗参数
        isDialog2: false, //修改信息弹窗参数

        dialogTitle2: "APP用户端普法文章（发布位置）", //弹窗副标题
        dialogRadio: 1,
        dialog: {
          title: "",
          address: ""
        },
        dialog2:{
          title:"",
          cover:"",
          content:"",
        },
        fileList: [],
        dialogRadio2: 0, //链接单选
      }
    },
    methods: {
      chooseArt(title,cover,content){
        this.dialog2 = {
          title:title,
          cover:cover,
          content:content,
        }
      },

      delPost(id){
        postDel(id,{}).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: 'success',
            });
            this.getPostList();
          };
        })
      },

      changeList(role,posi){
        this.searchRole = role;
        this.searchPosi = posi;
        this.currentPage2 = 1;
        this.getPostList();
      },

      handleScucess(res, file){
        this.image = res.data;
      },

      handleRemove(file, fileList) {
        this.image = "";
      },

      getList(){
        article({
          page: this.currentPage,
          pagesize: this.pagesize,
        }).then((res) => {
          this.loading = false;
          this.list2 = res.data.list;
          this.intotal = res.data.count;
        })
      },

      getPostList(){
        postArticle({
          role: this.searchRole,
          position: this.searchPosi, 
          page: this.currentPage2,
          pagesize: this.pagesize2,
        }).then((res) => {
          this.loading2 = false;
          this.list = res.data.list;
          this.intotal2 = res.data.count;
        })
      },

      dateFormat(time) {
        return dateFormat(time)
      },

      handleSizeChange1(val) {
        this.pagesize = val;
        this.getList();
      },
      handleCurrentChange1(val) {
        this.currentPage = val;
        this.getList();
      },



      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.getPostList();
      },

      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.getPostList();
      },

      getRole(role) {
        if (role == 1) {
          return "用户";
        } else {
          return "律师";
        }
      },

      getPosition(posi){
        if (posi == 1) {
          return "普法";
        } else if (posi == 2){
          return "普法置顶";
        } else {
          return "首页banner";
        }
      },

      getType(type) {
        if (type == 1) {
          return "链接";
        } else {
          return "文章库";
        }
      },

      dialogOpen(con,role,position) { //顶部6键
        this.dialogTitle2 = `${con}（发布位置）`;
        this.isDialog = true;
        this.role = role;
        this.position = position;

      },

      modPos(role,position){
        this.modrole = role;
        this.modposition = position;
      },


      change(id) { //修改
        this.isDialog2 = true;
        this.modifyId = id;
      },


      saveRadio() { //保存
        if (this.dialogRadio == 2) {
          if (this.image == "" || this.dialog.title == "" || this.dialog.address == "") {
            this.$message({
              message: "请将信息输入完整",
              type: 'warning'
            });
          } else {
            articlePush({
              title: this.dialog.title,
              content: this.dialog.address,
              cover: this.image,
              role: this.role,
              position: this.position,
              post_type: 1,
            }).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "发布成功",
                  type: 'success'
                });
                this.image = "";
                this.dialog.title = "";
                this.dialog.address = "";
                this.getPostList();
              };
            })
          }
        } else {
          articlePush({
            title: this.dialog2.title,
            content: this.dialog2.content,
            cover: this.dialog2.cover,
            role: this.role,
            position: this.position,
            post_type: 2,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "发布成功",
                type: 'success'
              });
              this.dialog2.title = "";
              this.dialog2.cover = "";
              this.dialog2.content = "";
              this.getPostList();
            };
          })
        }
        this.isDialog = false
      },

      modRadio(){
        if (this.dialogRadio == 2) {
          if (this.image == "" || this.dialog.title == "" || this.dialog.address == "") {
            this.$message({
              message: "请将信息输入完整",
              type: 'warning'
            });
          } else {
            pusharticleMod(this.modifyId,{
              title: this.dialog.title,
              content: this.dialog.address,
              cover: this.image,
              role: this.modrole,
              position: this.modposition,
              post_type: 1,
            }).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "发布成功",
                  type: 'success'
                });
                this.image = "";
                this.dialog.title = "";
                this.dialog.address = "";
                this.getPostList();
              };
            })
          }
        } else {
          pusharticleMod(this.modifyId,{
            title: this.dialog2.title,
            content: this.dialog2.content,
            cover: this.dialog2.cover,
            role: this.modrole,
            position: this.modposition,
            post_type: 2,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "发布成功",
                type: 'success'
              });
              this.dialog2.title = "";
              this.dialog2.cover = "";
              this.dialog2.content = "";
              this.getPostList();
            };
          })
        }
        this.isDialog2 = false
      }
    },
    mounted() {
      // this.list = data
      this.getList();
      this.getPostList();
    }
  }

</script>
<style lang="less">
  .list-img .de-small-img1 {
    margin-top: 10px;
    margin-left: 5px;
    width: 50px;
    height: 50px;
  }

  .issue-dialog-bg {
    border: 1px solid #eee;
    margin-top: 10px;
  }

  .issueList-title {
    color: #42bd56;
    font-size: 14px;
  }

  .issue-dialog-title {
    font-size: 16px;
    color: #999;
    margin-bottom: 10px;
  }

  .issue-dialog-title2 {
    font-size: 14px;
    color: #999;
    text-align: right;
  }

  .issue-dialog-col {
    margin: 10px 0;
    height: 30px;
    line-height: 30px;
  }

  .issue-dialog-picture {
    .el-upload-list--picture .el-upload-list__item {
      width: 15vw;
    }
  }

</style>
