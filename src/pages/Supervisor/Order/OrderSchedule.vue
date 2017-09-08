<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
      <el-button size="small" @click="isRecording = true">提交记录</el-button>
    </div>
    <div class="detail-main">
      <infor-title title="律师服务进度"></infor-title>
      <infor title="委托项目" con="合同审查"></infor>
      <el-button type="primary" class="detail-main-button" @click="isRemind = true">提醒律师</el-button>
    </div>
    <div class="detail-main">
      <el-steps :space="200" direction="vertical" :active="3">
        <el-step>
          <div slot="title">
            <h1 class="step-time">2017-09-09 09:09:09</h1>
            <h1 class="step-title">律师开始服务</h1>
          </div>
        </el-step>
        <el-step>
          <div slot="title" class="step">
            <h1 class="step-time">2017-09-09 09:09:09</h1>
            <h1 class="step-title">法院立案</h1>
            <h1 class="step-content">您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。</h1>
            <pop-img imgUrl=""></pop-img>
            <pop-img imgUrl=""></pop-img>
            <pop-img imgUrl=""></pop-img>
          </div>
        </el-step>
        <el-step>
          <div slot="title" class="step">
            <h1 class="step-time">2017-09-09 09:09:09</h1>
            <h1 class="step-title">律师开始服务</h1>
            <h1 class="step-content">您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。</h1>
          </div>
        </el-step>
        <el-step>
          <div slot="title" class="step">
            <h1 class="step-time">2017-09-09 09:09:09</h1>
            <h1 class="step-title">律师结束服务</h1>
            <h1 class="step-content">您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。您的委托提交后，平台将在第一时间推送给匹配的专业律师。</h1>
          </div>
        </el-step>
      </el-steps>
    </div>
    <text-dialog title="提交记录" content="请输入记录内容" type="记录" :open.sync="isRecording" @submit="recording"></text-dialog>
    <el-dialog :visible.sync="isRemind" size="tiny" :show-close="false">
      <h1 slot="title" class="dialog-title">提醒律师汇报服务进度</h1>
      <h1 class="dialog-content">提醒律师汇报服务进度：</h1>
      <el-input v-model="input" placeholder="请输入汇报标题" :maxlength="8"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click=" isRemind = false">返回</el-button>
    <el-button type="primary" @click="remind">确定提醒</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Infor from '@/components/Infor'
  import InforTitle from '@/components/InforTitle'
  import TextDialog from '@/components/TextDialog.vue'
  import PopImg from '@/components/PopImg.vue'
  export default {
    components: {
      Infor,
      InforTitle,
      TextDialog,
      PopImg
    },
    data() {
      return {
        isRecording: false, //提交
        isRemind: false, //提醒
        input: ""
      }
    },
    methods: {
      onCancel() {
        router.push({
          name: "OrderDetail"
        })
      },
      //提交
      recording(val) {
        console.log("recording")
        this.isRecording = false
      },

      //提醒
      remind() {

      }
    }
  }

</script>
<style lang="less" scoped>
  .step {
    margin-left: 30px;
    margin-top: -20px;
  }

  .step-time {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }

  .step-title {
    color: #42bd56;
    font-size: 16px;
    line-height: 20px;
  }

  .step-content {
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }

  .dialog-content {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-bottom: 14px;
  }

</style>
