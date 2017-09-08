<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="cancel">返回</el-button>
      <el-button size="small" @click="clear">清除内容</el-button>
      <el-button size="small" @click="save">保存文章</el-button>
    </div>
    <div class="detail-main">
      <h1 class="detail-title-right">文章标题</h1>
      <el-input v-model="title" style="width:300px;" placeholder="请输入文章标题"></el-input>
    </div>
    <div class="detail-main">
      <h1 class="detail-title-right">文章编辑器</h1>
      <tinymce :height="400" :content="content" ref="getContent"></tinymce>
    </div>
    <div class="detail-main">
      <h1 class="detail-title-right">文章封面</h1>
      <el-upload action="/v1/common/upload" :file-list="fileList" list-type="picture" :on-success="handleScucess" :on-remove="handleRemove">
        <el-button size="small" type="primary" v-if="this.image == ''">点击上传</el-button>
        <el-button type="small" :disabled="true" v-else>点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { articleAdd } from '@/ajax/post.js'

  export default {
    data() {
      return {
        fileList: [],
        title:"",
        image:"",
        content:"",
      }
    },
    components: {
      Tinymce
    },
    methods: {

      handleScucess(res, file){
        this.image = res.data;
      },

      handleRemove(file, fileList) {
        this.image = "";
      },

      cancel() {
        router.push({
          name: "ArticleList"
        })
      },
      clear() {
        this.$refs.getContent.clearContent();  
      },
      save() {
        console.log(1)
        this.content = this.$refs.getContent.getContent();  
        if (this.content == "" || this.image == "" || this.title == "" ) {
          this.$message({
            message: "请将信息填写完整",
            type: 'warning'
          });
        } else {
          articleAdd({
            title: this.title,
            content: this.content,
            cover: this.image,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "新建成功",
                type: 'success'
              });
              router.push({
                name: "ArticleList"
              })
            };
          })
        }
      }
    }

  }

</script>
<style>
  .detail-title-right {
    color: #42bd56;
    font-size: 16px;
    text-align: left;
    margin-bottom: 10px;
  }

</style>
