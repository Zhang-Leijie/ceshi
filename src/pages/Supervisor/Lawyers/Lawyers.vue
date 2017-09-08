<template>
  <div>
    <h1 class="item-header">律师库管理</h1>
    <h1 class="lawyers-infor-title">推荐评价</h1>
    <el-button type="primary" size="small" @click="isAdd=true">新增+</el-button>
    <div class="table-bg">
      <el-tag v-for="tag in list" :closable="true" :close-transition="false" @close="handleClose(tag.id)" style="margin-bottom:15px;">
        {{tag.name}}
      </el-tag>
    </div>
    <el-dialog :visible="isAdd" :show-close="false" size="tiny">
      <h1 slot="title" class="dialog-title">新增推荐评价</h1>
      <el-input v-model="content" placeholder="此处可输入您的评价（不超过8个字）" :maxlength="8"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdd=false">取消</el-button>
        <el-button type="primary " @click="add">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { tagLawyer , tagAdd , tagDel } from '@/ajax/post.js'

  export default {
    data() {
      return {
        list: [],
        isAdd: false,
        content: ""
      }
    },
    methods: {
      getList(){
        var self = this;
        tagLawyer({}).then((res) => {
          this.list = res.data;
        })
      },

      handleClose(id) {
        // this.list.splice(this.list.indexOf(tag), 1);
        tagDel(id,{
          id:id
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: 'success'
            });
            this.getList();
          };
        })
      },

      add() {
        if (this.content == "") {
          this.$message({
            message: "请输入名称",
            type: 'warning'
          });
        } else {
          this.isAdd = false
          tagAdd({
            name:this.content
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "添加成功",
                type: 'success'
              });
              this.getList();
            };
          })
        }
        
        // this.list.push(this.content)
        
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>
  .lawyers-infor-title {
    text-align: left;
    font-size: 16px;
    margin: 10px 0;
    padding-top: 20px;
    color: #42bd56;
    border-top: 1px solid #eee;
  }

</style>
