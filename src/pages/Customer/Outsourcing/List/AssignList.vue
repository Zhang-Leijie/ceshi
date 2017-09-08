<template>
  <div>
    <div class="detail-header">
      <el-button size="small" @click="onCancel">返回</el-button>
      <el-button size="small" @click="isRecording=true">提交记录</el-button>
    </div>
    <el-table :data="list" style="width:100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="法律意见：">
              <span>您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师，您的委托提交后，平台将在第一时间推送给匹配的专业律师</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="律师姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="手机号" prop="phone" width="130"></el-table-column>
      <el-table-column label="职业地区" prop="address" width="100"></el-table-column>
      <el-table-column label="职业年限" prop="years" width="100"></el-table-column>
      <el-table-column label="报价" width="120">
        <template scope="scope">
          <span style="color:#e62222">{{scope.row.price}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="" v-if="status== 1">
        <template scope="scope">
          <el-button type="primary" size="small" @click="assign(scope.row)">指定该律师</el-button>
        </template>
      </el-table-column>
      <el-table-column label="" v-if="status != 1">
        <template scope="scope">
          <span>指定该律师</span>
        </template>
      </el-table-column>
    </el-table>
    <text-dialog title="提交记录" content="请输入记录内容" type="记录" :open.sync="isRecording" @submit="recording"></text-dialog>
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
      <el-dialog :visible.sync="isAssign" size="tiny" :show-close="false">
        <h1 slot="title" class="dialog-title">指定律师并修改报价</h1>
        <el-form ref="form" :model="from" label-width="150px">
          <el-form-item label="指定的律师：">{{name}}</el-form-item>
          <el-form-item label="律师原报价：">{{price}}元</el-form-item>
          <el-form-item label="修改为：">
            <el-input-number v-model="form.num1" :min="1" :controls="false" size="small"></el-input-number>元
          </el-form-item>
          <el-form-item label="原价为：">
            <el-input-number v-model="form.num2" :min="1" :controls="false" size="small"></el-input-number>元
          </el-form-item>
        </el-form>
        <h1 class="assignlist-dialog-content">{{discounted}}</h1>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isAssign = false">取消推送</el-button>
    <el-button type="primary" @click="onSubmit">推送订单</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import data from '@/assets/json/common2.json'
  import TextDialog from '@/components/TextDialog.vue'
  export default {
    components: {
      TextDialog
    },
    data() {
      return {
        list: [], //列表数据
        status: 0, //订单所处的状态
        isRecording: false, //判断提交弹窗
        isAssign: false, //判断指定律师弹窗
        form: {
          num1: 0,
          num2: 0
        },
        name: "",
        price: 0
      }
    },
    computed: {
      discounted() {
        let {
          num1,
          num2
        } = this.form
        let num = num1 / num2
        if (num > 0 && num < 1) {
          return `本折扣享受折扣为：${num.toFixed(2) * 10}折`
        } else {
          return ''
        }
      }
    },
    methods: {
      onCancel() {
        router.push({
          name: "OutsourcingDetail"
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      //提交订单
      recording(val) {
        console.log("recording")
        this.isRecording = false
      },

      //指定该律师
      assign(obj) {
        let {
          name,
          price
        } = obj
        this.name = name
        this.price = price
        this.isAssign = true
      },

      //确认按钮
      onSubmit() {
        console.log("确认")
        this.isAssign = false
      },
    },
    mounted() {
      this.status = this.$route.params.status
      this.list = data.lawyers
      this.status = 1
    }
  }

</script>
<style lang="less" scoped>
  .el-form-item {
    margin-bottom: 0
  }

  .assignlist-dialog-content {
    margin-top: 10px;
    color: #e62222;
    font-size: 14px;
    text-align: center;
  }

</style>
